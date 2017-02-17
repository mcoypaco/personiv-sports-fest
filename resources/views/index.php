<!doctype html>
<html>
    <head>
        <meta charset="utf-8">

        <title></title>
        <link rel="stylesheet" href="css/app.css">
        <link rel="stylesheet" href="node_modules/angular-material/angular-material.min.css">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <link rel="stylesheet" href="node_modules/lf-ng-md-file-input/dist/lf-ng-md-file-input.css">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.7.2/socket.io.js"></script>
        <script type="text/javascript">
          var socket = io('http://localhost:3000');
        </script>
        <link rel="stylesheet" href="node_modules/angular-material-data-table/dist/md-data-table.min.css" type="text/css">
    </head>
    <body ng-app="Sportsfest" ng-cloak>

        <div ui-view layout="row" layout-fill></div>

    <!-- Application Dependencies -->

    <script src="node_modules/angular/angular.js"></script>
    <script src="node_modules/angular-animate/angular-animate.min.js"></script>
    <script src="node_modules/angular-aria/angular-aria.min.js"></script>
    <script src="node_modules/angular-messages/angular-messages.min.js"></script>
    <script src="node_modules/angular-material/angular-material.min.js"></script>
    <script src="node_modules/angular-ui-router/release/angular-ui-router.js"></script>
    <script src="node_modules/satellizer/dist/satellizer.js"></script>
    <script src="node_modules/angular-material-icons/angular-material-icons.min.js"></script>
    <script src="node_modules/angular-ui-router-title/angular-ui-router-title.js"></script>
    <script src="/node_modules/lf-ng-md-file-input/dist/lf-ng-md-file-input.js"></script>
    <script src="node_modules/angular-material-data-table/dist/md-data-table.min.js"></script>

    <!-- Application Scripts -->

    <script src="js/components.js"></script>

</html>
