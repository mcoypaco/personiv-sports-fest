<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Index Page</title>
        <!-- <link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.css"> -->
        <link rel="stylesheet" href="css/app.css">
        <link rel="stylesheet" href="node_modules/angular-material/angular-material.min.css">
    </head>
    <body ng-app="Sportsfest" ng-cloak>
               
        <div class="navBardemoBasicUsage" ng-controller="IndexController">
          <md-content>
          <md-sidenav class="md-sidenav-left md-whiteframe-z2"
                md-component-id="left">
            <md-toolbar layout="row">
             <div class="md-toolbar-tools">
                <h2>
                  <span>Side Panel</span>
                </h2>
                <span flex></span>
                <md-button class="md-icon-button" aria-label="Close Side Panel" ng-click="closeSideNavPanel()">
                  <md-tooltip>Close Side Panel</md-tooltip>
                  <md-icon class="md-default-theme" class="material-icons">&#xE5CD;</md-icon>
                </md-button>
               </div>
            </md-toolbar> 
            <md-content layout-padding="">
              Side navigation Panel
            </md-content> 
        </md-sidenav>
            <!-- <md-sidenav class="md-sidenav-left" md-component-id="left" md-is-locked-open="$mdMedia('gt-md')" md-whiteframe="4">
            
              <md-toolbar class="md-theme-indigo">
                <h1 class="md-toolbar-tools">Sidenav Left</h1>
              </md-toolbar>
              <md-content layout-padding="" ng-controller="LeftCtrl">
                <md-button ng-click="close()" class="md-primary" hide-gt-md="">
                  Close Sidenav Left
                </md-button>
                <p hide="" show-gt-md="">
                  This sidenav is locked open on your device. To go back to the default behavior,
                  narrow your display.
                </p>
              </md-content>

            </md-sidenav> -->
            <md-nav-bar md-selected-nav-item="currentNavItem" nav-bar-aria-label="navigation links">
                <md-button class="md-icon-button" aria-label="Side Panel" ng-click="openSideNavPanel()">
                    <!-- <md-tooltip>Side Panel</md-tooltip> -->
                    <ng-md-icon icon="menu"></ng-md-icon> 
                </md-button>
                <!-- <md-nav-item md-nav-sref="home" name="logo"> -->
                    <a ui-sref="home" ng-click="setHome()"><img ng-src="img/2Color-Favicon_512x512-1-raw.png" class="logo"></a>
                <!-- </md-nav-item> -->
                <md-nav-item md-nav-sref="home" name="home">
                    Home
                </md-nav-item>
                <md-nav-item md-nav-sref="players" name="players">
                    Players
                </md-nav-item>
                <md-nav-item md-nav-sref="sports" name="sports">
                    Sports
                </md-nav-item>

                <span flex=""></span>

                <div layout="column" flex-xs="100" flex-sm="100" flex="33" layout-align="center center">
                    <md-menu md-position-mode="target-right target">
                        <md-button aria-label="Open demo menu" ng-click="$mdMenu.open($event)">
                            <!-- <ng-md-icon icon="arrow_drop_down_circle"></ng-md-icon> -->
                            <img ng-src="img/picture.png" class="img-circle">
                        </md-button>
                        <md-menu-content width="4">
                            <md-menu-item>
                                <md-button ng-click="announceClick()">
                                    <div layout="row" flex="">
                                        <p flex="">Logout</p>
                                        <ng-md-icon icon="logout"></ng-md-icon>
                                    </div>
                                </md-button>
                            </md-menu-item>
                        </md-menu-content>
                    </md-menu>
                </div>
             
            </md-nav-bar>
            <div class="ext-content">
                <div class="container">
                    <div ui-view></div>
                </div> 
              <!-- External content for `<span>{{currentNavItem}}</span>`. -->
            </div>

          </md-content>
        </div>
        <!-- <div class="container">
            <div ui-view></div>
        </div>  -->
        <!--
        
        -->
    </body>

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
    <!-- <script src="js/services/commentService.js"></script> -->
</html>