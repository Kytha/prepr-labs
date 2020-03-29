<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>Prepr Labs</title>
        <link rel="stylesheet" href="css/app.css" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <!-- Fonts -->
    </head>
    <body>
        <div id="react-app">
        </div>
        <script type="text/javascript" src="js/app.js"></script>
    </body>
</html>
