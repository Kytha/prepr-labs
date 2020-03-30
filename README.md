## Full Stack Developer Work Challenge

Author: Kyle Thatcher

Email: thatchek@mcmaster.ca

Github: https://github.com/kytha/prepr-labs

Demo: https://youtu.be/nLyn6MQfuSg

## Approach 

The first aspect of the challenge I tackled was the back end. This was because despite having experience with PHP I haven't previously worked with the Laravel framework. I thought this was an excellent oppurtunity to learn a new skill plus I reasoned this would be the hardest challenge in the project for me.

## Back End

### SPA configuration

I knew from the start I wanted to make this a single page application. It would simplify the front end where I could leverage the full power of React. To do this I got rid of the default Bootstrap and Vue scaffolding which comes with Laravel. I replaced it with a React scaffolding and redirected site traffic to a single HTML template that would launch the React app.   
    
### RESTful API

For accessing data on the back end I decided to go with a RESTful API. I choose this method because they are not only an intuitive way to handle data transfer but they also provide a nice separation of concerns. This allows me to robustly test the API through external programs like Postman.

I won't show the snippet for the AuthController because it would make this section quite lengthy but feel free to check out how I handled the auth endpoints in the source code. However, here is the snippet for the LabController;

```php
public function index()
{
    return response()->json(['data' => Lab::all()], 200);
}

public function show(Lab $lab)
{
    return $lab;
}

public function store(Request $request)
{
    $lab = Lab::create($request->all());

    return response()->json($lab, 201);
}

public function update(Request $request, Lab $lab)
{
    $lab->update($request->all());

    return response()->json($lab, 200);
}

public function delete(Lab $lab)
{
    $lab->delete();

    return response()->json(null, 204);
}
```
### Authentication & Permissions

For authentication, I utilized the passport package, and subsequently OAuth 2.0. I decided to roll my own permissions system because I had difficulty finding a solution that was quick and simple. 

Implementing passport was a breeze, just needed to set up the passport routes and configure Laravel to use it as the default authentication guard. 

For the permission system, I set up a many-to-many relationship between the User model and a new Roles model. I also added a helper function to the User model to get all the user's permissions like so;

```php
public function roles() {
    return $this->belongsToMany("App\Role");
}
```
Lastly, I defined a new middleware which would intercept requests guarded by admin and check if the user was indeed an admin like so;
```php
public function handle($request, Closure $next)
{
    $userRoles = Auth::user()->roles->pluck('name');
    if (!$userRoles->contains("admin")) {
        return response()->json([
            'message' => 'You do not have the required permissions'
        ], 401);
    };
    return $next($request);
}
```
The last step was to set up the routes. Here is the code snippet for how the routes ended up looking. I used nested routes to define paths which required authentication and admin status;

```php
Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('login', 'AuthController@login');
    Route::post('signup', 'AuthController@signup');
  
    Route::group([
      'middleware' => 'auth:api'
    ], function() {
        Route::get('logout', 'AuthController@logout');
        Route::get('user', 'AuthController@user');
    });
});

Route::group([
    'middleware' => 'auth:api'
], function() {
    Route::get('labs', 'LabController@index');
    Route::get('labs/{lab}', 'LabController@show');
    Route::group([
        'middleware' => 'admin'
    ], function () {
        Route::post('labs', 'LabController@store');
        Route::put('labs/{lab}', 'LabController@update');
        Route::delete('labs/{lab}', 'LabController@delete');
    });
});
```

## Front end

As I hinted at earlier, I decided to use React for the frontend. I have the most experience with React compared to other MVC frameworks, and React has a wide range of projects and packages I can leverage for rapid development. 

The goal of the interface is to allow a user to easily find all available labs. When a user clicks on a specific lab it should show it's location on a Google API map and provide some extra information, such as the address and an image of the location if one exists.

### Wire Framing

The first task was for me to create some wireframes so I could get a feel for how I wanted to display information to the user. This was probably the most crucial step in terms of the perceived quality and ease-of-use for the end-user. I decided to split the main dashboard into two sections. One with the google map which will respond to the user's actions appropriately; the other would be a list of all the labs which the user can browse or search through. Here was what the mock-ups looked like (mobile-first obviously);

<img src="https://raw.githubusercontent.com/Kytha/prepr-labs/master/documents/iPhone_X-XS-11_Pro_home.png"/>
<img src="https://raw.githubusercontent.com/Kytha/prepr-labs/master/documents/Web_1366_home.png"/>
<img src="https://raw.githubusercontent.com/Kytha/prepr-labs/master/documents/Web_1366_login.png"/>

### Material-UI

My UI framework of choice was Material-UI. It is very powerful and comes with quite elegant and modular components. It was quite easy for me to create responsive UI which function on all browsers. 

### State Management

For interacting with the back end I equipped my app with Redux with Thunk middleware. This allowed me to fire off asynchronous API requests while maintaining a predictable, and dependable app store. This store would drive all components so that there was one single source of truth. Each scene (home, portal, and admin) has a respective duck file that handles all state management and API requests.

### The Map

Setting up the interactive map was slightly more challenging than expected. I choose to go with a library called [google-maps-react](https://github.com/google-map-react/google-map-react). This seemed like the best option due the fact it had good documentation and even came with a HOC that handled communications between google's API and the map component. 

However, this ended up being a curse rather than a blessing, since I needed to drive the map not only from the store data but also the complementary interactive list. I found myself having to roll out my own modified components to get the level of control I needed over google's API. If I were to improve this project, I'd invest time in swapping out the map component for a new one. Still, it got the job done.  

### Implementing a Search

A cool feature I implemented was a search input for aggregating the interactive list. To do this in a way that would scale, I not only stored the lab data payload from the server as a flat list but also as a map object which mapped labs into buckets based on the first letter of their title. Her is a snippet of the reducer which achieved this;

```javascript
export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case REQUEST_LABS:
            return {
                ...state,
                isLoading: true
            };
        case RECEIVE_LABS:
            let populate_me = {};
            action.payload.data.forEach(lab => {
                const letter = lab.title.charAt(0).toLowerCase();
                if (populate_me[letter]) {
                    populate_me[letter].push(lab);
                } else {
                    populate_me[letter] = [lab];
                }
            });
            return {
                ...state,
                labs_by_first_letter: populate_me,
                labs_list: action.payload.data,
                isLoading: false
            };
        case REQUEST_LAB_ERROR:
            return {
                ...state,
                error: action.payload,
                isLoading: false
            };
        default:
            return state;
    }
}
```
Then, if a user decides to search, we can apply the query like so,

``` javascript
const applySearch = arr => {
    if (query === "") return arr;
    const first_letter = query.charAt(0).toLowerCase();
    if (!labs_by_first_letter[first_letter]) return [];
    else
        return labs_by_first_letter[first_letter].filter(lab => {
            const i = lab.title.toLowerCase();
            const q = query.toLowerCase();
            return i.startsWith(q);
        });
};
```

### Implementing Analytics

I thought it would be a cool feature to add an analytics tab to the app. This analytics tab currently features a chart that displays the distribution of labs by city. To do this I utilized the [ApexCharts](https://apexcharts.com/) library. I think this feature shows significant potential with the application, as more powerful aggregation and data visualization tools could be utilized to give the user extreme clarity. Check out the demo to see the chart in action!

## Closing Remarks

I really enjoyed this project as it presented me with an opportunity to learn new skills and a new framework that I otherwise may not have taken the time to understand. It was challenging at some parts but rewarding at so many others. Some things to improve on/features to add if given more time would be;

- Add the ability to remove labs as an admin 
- Add the ability to manage users and permissions as an admin
- Explore different options for a react Google Maps package which offers more control
- Code splitting for optimized load times
- Unit testing and code linting 

Thank you so much for this opportunity! I had a lot of fun!

