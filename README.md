## Full Stack Developer Work Challenge

Author: Kyle Thatcher

Email: thatchek@mcmaster.ca

Github: https://github.com/kytha/prepr-labs

## Approach 

The first dimesion of the challenge I tackled was the back end. This was because despite having experience with PHP I haven't previosuly worked with the Laravel framework. I thought this was an excellent oppertunity to learn a new skill plus I reasoned this would be the hardest challenge in the project for me.

## Back End

### SPA configuration

I knew from the start I wanted to make this a single page application. It would really simplyfy the front end where I could leverage the full power of React. To do this I got rid of the default Bootstrap and Vue scaffholding which comes with laravel. I replaced it with the React scaffholding and redirected site traffic to a single HTML template which would launch the React app.   
    
### RESTful API

For accessing data on the back end I decided to go with a RESTful API. I choose this method because they are not only an intiutive way to handle data transfer but they also provide a nice seperation of concerns. This allows me to robustly test the API from external programs like Postman.

I won't the snippet for the authController because it would make this section quite lengthy but feel free to check out how I handled the auth endpoints in the source code. However, here is the snipper for the LabController;

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

For authentication I utilized the passport package, and subsequently oauth. I decided to roll my own permissions system because I had difficutly finding a solution which was quick and simple. 

Implementing passport was a breeze, just needed to set up the passport routes and configure laravel to use it as the default authentication guard. 

For the permission system I set up a many-to-many relationship between the User model and a new Roles model. I also added a helper function to the User model to get all the user's permissions like so;

```php
public function roles() {
    return $this->belongsToMany("App\Role");
}
```
Lastly, I defined a new middleware which would intercept requests gaurded by admin and check if the user was indeed an admin like so;
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
The last step was to setup the routes. Here is the code snippet for how the routes ended up looking. I used nested routes to define paths which required authentication and admin status;

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

### Wiring Framing

First task was for me to create some wireframes so I could get a feel for how I wanted to display information to the user. This was probably the most crucial step in terms of the percieved quality and ease-of-use for the end user. I decided to split the main dashboard into two sections. One with the google map which will respond the user actions appropriately; the other would be a list of all the labs which the user can browse or search through. Here was what the mock looked like;

### Material-UI

My UI framework of choose was Material-UI. It is very powerful and comes with quite elegant and modular components. It was quite easy for me to create
