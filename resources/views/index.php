<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Index Page</title>
        <link rel="stylesheet" href="css/app.css">
        <link rel="stylesheet" href="node_modules/angular-material/angular-material.min.css">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    </head>
    <body ng-app="Sportsfest" ng-cloak>
        
        <div ui-view layout="row" layout-fill></div>

        <!-- <div class="container">
            <div ui-view></div>
        </div> -->


    <!-- Application Dependencies -->
    <script src="node_modules/angular/angular.js"></script>
    <script src="node_modules/angular-animate/angular-animate.min.js"></script>
    <script src="node_modules/angular-aria/angular-aria.min.js"></script>
    <script src="node_modules/angular-messages/angular-messages.min.js"></script>
    <script src="node_modules/angular-material/angular-material.min.js"></script>
    <script src="node_modules/angular-ui-router/release/angular-ui-router.js"></script>
    <script src="node_modules/satellizer/dist/satellizer.js"></script>
    <script src="node_modules/angular-material-icons/angular-material-icons.min.js"></script>

    <!-- Application Scripts -->
    <script src="js/app.js"></script>
<!--     <script src="js/controllers/authController.js"></script>
    <script src="js/controllers/userController.js"></script> -->

    <!-- Controllers -->
    <!-- <script src="js/controllers/mainCtrl.js"></script> -->
    <script src="js/controllers/IndexController.js"></script>
    <script src="js/controllers/HomeController.js"></script>
    <script src="js/controllers/LeftController.js"></script>
    <script src="js/controllers/PlayerController.js"></script>
    <!-- Services -->
    <script src="js/services/MenuItems.js"></script>
</html>