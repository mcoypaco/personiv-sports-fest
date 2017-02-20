/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 21);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

sportsFest.controller('AuthController', ["$scope", "$auth", "Auth", "$rootScope", "$state", "$window", function ($scope, $auth, Auth, $rootScope, $state, $window) {

    var vm = this;
    vm.loginError = false;
    vm.loginErrorText;

    vm.login = function () {
        var credentials = {
            email: vm.email,
            password: vm.password
        };

        $auth.login(credentials).then(function (data) {
            return Auth.getAuthenticatedUser().then(function (response) {
                localStorage.setItem('user', JSON.stringify(response.data.user));
                $rootScope.currentUser = response.data.user;
                console.log($rootScope.currentUser);
                $window.location.reload();
                $state.go('home.home');
            });
        }, function (error) {
            // console.log(error)
            vm.password = "";
            vm.loginError = true;
            console.log(error.data.error);
            vm.loginErrorText = error.data.error;
        });
    };
}]);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

sportsFest.factory("Auth", ["$q", "$http", function ($q, $http) {
  return {
    getAuthenticatedUser: function getAuthenticatedUser() {
      return $http({
        method: 'GET',
        url: 'api/authenticate/user'
      });
    }
    // get : function() {
    // 	return $http({
    //         method: 'GET',
    //         url: 'api/players'
    //     });
    // },

    // store : function(data) {
    // 	return $http({
    //          method: 'POST',
    //          url: 'api/players',
    //          data: data,
    //          headers: { 'Content-Type' : 'application/json' }
    //      });
    // },

    // show : function(id) {
    // 	return $http.get('/api/players/' + id);
    // },

    // update : function() {

    // },

    // destroy : function(id) {
    // 	return $http.delete('/api/players/' + id);
    // }
  };
}]);

/***/ }),
/* 2 */
/***/ (function(module, exports) {

sportsFest.controller('AuthorizeController', ["Authorize", "$auth", function (Authorize, $auth) {

	var vm = this;

	if ($auth.isAuthenticated()) {
		Authorize.isAdmin().then(function (admin) {
			vm.isAdmin = admin;
		});

		Authorize.isPoc().then(function (poc) {
			vm.isPoc = poc;
		});
	}
}]);

/***/ }),
/* 3 */
/***/ (function(module, exports) {

sportsFest.factory('Authorize', ["Role", function (Role) {

  var user = JSON.parse(localStorage.getItem('user'));

  return {
    isAdmin: function isAdmin() {
      return Role.getAdminId().then(function (adminId) {
        var id = parseInt(adminId.data);
        return user.role_id == id;
      });
    },
    isPoc: function isPoc() {
      return Role.getPocId().then(function (pocId) {
        var id = parseInt(pocId.data);
        return user.role_id == id;
      });
    }

  };
}]);

/***/ }),
/* 4 */
/***/ (function(module, exports) {

sportsFest.controller('DraftController', ["$scope", "Player", "Team", "Sport", "Draft", "$mdDialog", function ($scope, Player, Team, Sport, Draft, $mdDialog) {

    var vm = this;
    vm.teams;
    vm.players;
    vm.sports;
    vm.loaded = false;
    vm.limitOptions = [10, 25, 50, 100];
    vm.sportsId;
    vm.query = {
        order: 'last_name',
        limit: 10,
        page: 1
    };

    vm.getTeams = function () {
        Team.get().then(function (success) {
            vm.teams = success.data;
            vm.loaded = true;
        }, function (error) {
            console.log(error.data);
        });
    };

    vm.getSports = function () {
        Sport.get().then(function (success) {
            vm.sports = success.data;
            vm.getTeams();
        }, function (error) {
            console.log(error.data);
        });
    };
    vm.getSports();

    vm.sportId;
    vm.getSportPlayers = function (sportId) {
        vm.sportsId = sportId;
        vm.loaded = false;
        vm.sportId = sportId;
        Sport.getPlayers(sportId).then(function (success) {
            vm.loaded = true;
            vm.players = success.data;
        }, function (error) {
            console.log(error);
        });
    };

    vm.getPosition = function (positions) {
        return positions.filter(function (item) {
            return item.sport_id === vm.sportId;
        })[0];
    };

    vm.updatePlayer = function (id, player) {
        Player.update(id, player).then(function (success) {
            console.log(success.data);
        }, function (error) {
            console.log(error.data);
        });
        if (player.team_id != null) {
            Draft.store(player);
        }
    };

    vm.removePlayer = function (player) {
        player.team_id = null;
        vm.updatePlayer(player.id, player);
        Draft.destroy(player.id);
    };

    vm.showConfirm = function (ev, player) {
        var confirm = $mdDialog.confirm().title('Would you like to Remove this player?').textContent(player.first_name + ' ' + player.last_name).ariaLabel('Position').targetEvent(ev).ok('REMOVE').cancel('Cancel');

        $mdDialog.show(confirm).then(function () {
            console.log("clicked delete");
            vm.removePlayer(player);
        }, function () {
            console.log("clicked cancel");
        });
    };

    socket.on('draft.player:App\\Events\\DraftPlayer', function (data) {
        vm.getTeams();
        draftUpdate(data.player);
        console.log(data.player);
        $scope.$apply();
    });

    function getIndex(playerId) {
        return vm.players.map(function (playerData) {
            return playerData.id;
        }).indexOf(playerId);
    }

    function draftUpdate(player) {
        if (player.team_id == null) {
            vm.getSportPlayers(vm.sportsId);
        } else {
            vm.players.splice(getIndex(player.id), 1);
        }
    }
}]);

/***/ }),
/* 5 */
/***/ (function(module, exports) {

sportsFest.factory("Draft", ["$q", "$http", function ($q, $http) {
  return {

    store: function store(data) {
      return $http({
        method: 'POST',
        url: 'api/drafts',
        data: data,
        headers: { 'Content-Type': 'application/json' }
      });
    },

    destroy: function destroy(id) {
      return $http.delete('/api/drafts/' + id);
    }

  };
}]);

/***/ }),
/* 6 */
/***/ (function(module, exports) {

sportsFest.controller('HomeController', ["$scope", "$http", "Sport", "Team", "$auth", function ($scope, $http, Sport, Team, $auth) {
	var vm = this;

	var user = JSON.parse(localStorage.getItem('user'));

	vm.loaded = false;

	if ($auth.isAuthenticated()) {
		var draftUpdate = function draftUpdate(player) {
			if (player.team_id == null) {
				vm.team.players.splice(getIndex(player.id), 1);
				console.log("null siya");
			} else {
				console.log("ga sulod kay indi null");
				vm.team.players.unshift(player);
			}
		};

		var getIndex = function getIndex(playerId) {
			return vm.team.players.map(function (playerData) {
				return playerData.id;
			}).indexOf(playerId);
		};

		Sport.get().then(function (data) {
			vm.sports = data.data;
			vm.loaded = true;
		});

		Team.getTeam(user.id).then(function (team) {
			Team.show(team.data.id).then(function (pocteam) {
				vm.team = pocteam.data[0];
				console.log(vm.team);
			});

			Sport.positions(team.data.id).then(function (positions) {
				vm.positions = positions.data;
			});
		});

		socket.on('draft.player:App\\Events\\DraftPlayer', function (data) {
			if (data.player.team_id == vm.team.id || data.player.team_id == null) {
				draftUpdate(data.player);
				$scope.$apply();
			}
		});
	}
}]);

/***/ }),
/* 7 */
/***/ (function(module, exports) {

sportsFest.controller('IndexController', ["$scope", "$mdToast", "$mdDialog", "$log", "$mdSidenav", "$mdBottomSheet", "$q", "MenuItemsService", "$mdMenu", "$auth", "$state", "$window", "Role", "Authorize", function ($scope, $mdToast, $mdDialog, $log, $mdSidenav, $mdBottomSheet, $q, MenuItemsService, $mdMenu, $auth, $state, $window, Role, Authorize) {

  var vm = this;
  vm.user;

  vm.getRole = function (id) {
    Role.show(id).then(function (role) {
      vm.role = role.data;
      console.log(role.data);
    });
  };

  vm.logout = function () {
    $mdSidenav('right').toggle();
    localStorage.removeItem('user');
    $auth.logout();
    $state.go("home.home");
    $window.location.reload();
  };

  vm.isAuthenticated = function () {
    return $auth.isAuthenticated();
  };

  $scope.setHome = function () {
    $scope.currentNavItem = 'home';
  };

  vm.toggleRightSidebar = toggleRightSidebar;
  vm.toggleItemsList = toggleItemsList;
  vm.selectItem = selectItem;
  vm.showSimpleToast = showSimpleToast;

  function toggleRightSidebar() {
    $mdSidenav('right').toggle();
  }

  function toggleItemsList() {
    var pending = $mdBottomSheet.hide() || $q.when(true);
    pending.then(function () {
      $mdSidenav('left').toggle();
    });
  }

  function selectItem(item) {
    // vm.title = item.name;
    vm.toggleItemsList();
    vm.showSimpleToast(item.name);
  }

  function showSimpleToast(title) {
    $mdToast.show($mdToast.simple().content(title).hideDelay(1500).position('bottom right'));
  }

  //data
  vm.menuItems = [];
  MenuItemsService.loadAllItems().then(function (menuItems) {
    vm.menuItems = [].concat(menuItems);
  });

  //functions for menu-link and menu-toggle
  vm.isOpen = isOpen;
  vm.toggleOpen = toggleOpen;
  vm.autoFocusContent = false;
  vm.menu = MenuItemsService;

  vm.status = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
  function isOpen(section) {
    return MenuItemsService.isSectionSelected(section);
  }
  function toggleOpen(section) {
    MenuItemsService.toggleSelectSection(section);
  }
}]);

/***/ }),
/* 8 */
/***/ (function(module, exports) {

// angular.module('app.services', [])
sportsFest.service('MenuItemsService', ['$q', function ($q) {
    var menuItems = [{
        name: 'Home',
        icon: 'dashboard',
        sref: '.home',
        show: true
    }, {
        name: 'Draft',
        icon: 'swap_vert',
        sref: '.draft',
        show: false
    }, {
        name: 'Players',
        icon: 'person',
        sref: '.players',
        show: false
    }];

    var sections = [];
    sections.push({
        name: 'Settings',
        type: 'toggle',
        pages: [{
            name: 'Sports',
            state: 'home.sports',
            type: 'link',
            icon: 'blur_circular'
        }, {
            name: 'Users',
            state: 'home.users',
            type: 'link',
            icon: 'people'
        }, {
            name: 'Teams',
            state: 'home.teams',
            type: 'link',
            icon: 'person_add'
        }]
    });

    var self;

    return self = {
        sections: sections,

        toggleSelectSection: function toggleSelectSection(section) {
            self.openedSection = self.openedSection === section ? null : section;
        },

        isSectionSelected: function isSectionSelected(section) {
            return self.openedSection === section;
        },

        loadAllItems: function loadAllItems() {
            return $q.when(menuItems);
        },

        loadAllSettings: function loadAllSettings() {
            return $q.when(sections);
        }
    };
}]);

/***/ }),
/* 9 */
/***/ (function(module, exports) {

sportsFest.controller('PlayerController', ["$scope", "Player", "Sport", "Position", function ($scope, Player, Sport, Position) {

    var vm = this;
    vm.sports;

    vm.filteredPlayers;
    vm.selectedSport;
    vm.i = 0;
    vm.filteredPlayersId = [];
    vm.loaded = false;
    vm.players;

    vm.getAllPlayers = function () {
        Player.get().then(function (success) {
            vm.players = success.data;
            vm.loaded = true;
        });
    };

    vm.getAllPlayers();

    vm.submit = function (data) {
        Player.store(data).success(function (successData) {
            //if success,
            console.log(successData);
        }).error(function (err) {
            console.error(err);
        });
    };

    vm.getSports = function () {
        Sport.get().then(function (success) {
            vm.sports = success.data;
            console.log(success.data);
        }, function (error) {
            console.log(error.data);
        });
    };
    vm.getSports();

    vm.getSport = function (id) {
        return vm.sports.filter(function (item) {
            return item.id.toString() === id;
        });
    };

    vm.sportPlayers = function (id) {
        vm.loaded = false;
        if (id == "all") {
            vm.loaded = true;
            vm.getAllPlayers();
        } else {
            Sport.players(id).then(function (players) {
                vm.players = players.data;
                vm.sportPlayerList = players.data;
                vm.loaded = true;
            });
        }
    };

    vm.positionPlayers = function (id) {
        vm.loaded = false;
        if (id == "all") {
            vm.loaded = true;
            vm.players = vm.sportPlayerList;
        } else {
            Position.players(id).then(function (players) {
                vm.players = players.data;
                vm.loaded = true;
            });
        }
    };

    vm.sortFilteredPlayers = function (id) {
        var results = [];
        for (i = 0; i < vm.filteredPlayers.length; i++) {
            vm.filteredPlayers[i].positions.filter(function (item) {
                if (item.id.toString() === id) {
                    results.push(vm.filteredPlayers[i]);
                }
            });
        }
        vm.filteredPlayers = results;
    };

    vm.getPosition = function (arr, id) {
        return arr.filter(function (item) {
            return item.sport_id === id;
        });
    };

    vm.export = function (type) {
        Player.export(type).then(function (success) {
            Player.exportFile(success, type);
        }, function (error) {
            console.log(error.data);
        });
    };

    socket.on('add.players:App\\Events\\AddPlayers', function (broadcast) {
        $scope.$apply(function () {
            vm.players.unshift(broadcast.data);
        });
    });
}]);

/***/ }),
/* 10 */
/***/ (function(module, exports) {

sportsFest.factory("Player", ["$q", "$http", function ($q, $http) {
  return {
    get: function get() {
      return $http({
        method: 'GET',
        url: 'api/players'
      });
    },

    noTeamGet: function noTeamGet() {
      return $http({
        method: 'GET',
        url: 'api/players/noteam'
      });
    },

    getPosition: function getPosition(id, sportId) {
      var deferred = $q.defer();
      this.show(id).then(function (player) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = player.data.positions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var item = _step.value;

            if (item.sport_id === sportId) {
              deferred.resolve(item);
              break;
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      });
      return deferred.promise;
    },

    store: function store(data) {
      return $http({
        method: 'POST',
        url: 'api/players',
        data: data,
        headers: { 'Content-Type': 'application/json' }
      });
    },

    show: function show(id) {
      return $http.get('/api/players/' + id);
    },

    update: function update(id, data) {
      return $http({
        method: 'POST',
        url: 'api/players/' + id,
        data: data,
        headers: { 'Content-Type': 'application/json' }
      });
    },

    destroy: function destroy(id) {
      return $http.delete('/api/players/' + id);
    },

    export: function _export(type) {
      return $http({
        method: 'GET',
        url: '/api/players/export/' + type,
        headers: { 'Content-Type': 'application/csv; charset=UTF-8' }
      });
    },

    exportFile: function exportFile(success, type) {
      var anchor = angular.element('<a/>');
      anchor.css({ display: 'none' }); // Make sure it's not visible
      angular.element(document.body).append(anchor); // Attach to document

      anchor.attr({
        href: 'data:attachment/' + type + ';charset=utf-8,' + encodeURI(success.data),
        target: '_blank',
        download: 'document.' + type
      })[0].click();

      anchor.remove(); // Clean it up afterwards
    }
  };
}]);

/***/ }),
/* 11 */
/***/ (function(module, exports) {

sportsFest.factory("Position", ["$q", "$http", function ($q, $http) {
    return {
        get: function get() {
            return $http({
                method: 'GET',
                url: 'api/positions'
            });
        },

        store: function store(data) {
            return $http({
                method: 'POST',
                url: 'api/positions',
                data: data,
                headers: { 'Content-Type': 'application/json' }
            });
        },

        show: function show(id) {
            return $http.get('/api/positions/' + id);
        },

        update: function update(id, newData) {
            return $http({
                method: 'PUT',
                url: 'api/positions/' + id,
                data: newData,
                headers: { 'Content-Type': 'application/json' }
            });
        },

        destroy: function destroy(id) {
            return $http({
                method: 'DELETE',
                url: 'api/positions/' + id
            });
        },

        players: function players(id) {
            return $http.get('api/positions/' + id + '/players');
        }
    };
}]);

/***/ }),
/* 12 */
/***/ (function(module, exports) {

sportsFest.controller('SportController', ["$scope", "$mdDialog", "Sport", "Position", function ($scope, $mdDialog, Sport, Position) {

    var vm = this;
    vm.sports;
    vm.newPosition = {};
    vm.editable = false;
    vm.loaded = false;

    vm.submit = function (data) {
        Sport.store(data).success(function (successData) {
            console.log(successData);
            vm.getSports();
            vm.upload(successData.id);
        }).error(function (err) {
            console.log(err);
        });
    };

    vm.upload = function (id) {
        var formData = new FormData();
        formData.append("file", $scope.files[0].lfFile);
        //multiple upload
        // angular.forEach($scope.files, function(obj) {
        //     if(!obj.isRemote) {
        //         formData.append('files[]', obj.lfFile);
        //     }
        // });
        Sport.upload(formData, id).then(function (result) {
            console.log(result);
        }, function (err) {
            console.log(err);
        });
    };

    vm.getSports = function () {
        Sport.get().then(function (success) {
            vm.sports = success.data;
            console.log(success.data);
            vm.loaded = true;
        }, function (error) {
            console.log(error);
        });
    };
    vm.getSports();

    vm.delete = function (id) {
        Sport.destroy(id).success(function (success) {
            console.log(success);
        }).error(function (error) {
            console.log(error);
        });
    };

    vm.update = function (id, newData) {
        console.log(newData);
        Sport.update(id, newData).success(function (success) {
            console.log(success);
            vm.getSports();
        }).error(function (error) {
            console.log(error);
        });
    };

    vm.addPosition = function (id) {
        console.log(id);
        vm.newPosition.id = id;
        Position.store(vm.newPosition).success(function (success) {
            console.log(success);
            vm.getSports();
        }).error(function (error) {
            console.log(error);
        });
    };

    vm.deletePosition = function (id) {
        Position.destroy(id).success(function (success) {
            console.log(success);
            vm.getSports();
        }).error(function (error) {
            console.log(error);
        });
    };

    vm.addModalPosition = function (ev, id) {
        var confirm = $mdDialog.prompt().title('New Position').placeholder('Position name').ariaLabel('Position name')
        // .initialValue('name')
        .targetEvent(ev).ok('Save').cancel('Cancel');

        $mdDialog.show(confirm).then(function (result) {
            vm.newPosition.name = result;
            vm.addPosition(id);
        });
    };

    vm.showConfirm = function (ev, item, type) {
        var confirm = $mdDialog.confirm().title('Would you like to delete ?').textContent(item.name).ariaLabel('Item').targetEvent(ev).ok('DELETE').cancel('Cancel');

        $mdDialog.show(confirm).then(function () {
            if (type == "position") {
                vm.deletePosition(item.id);
            } else {
                vm.delete(item.id);
            }
        }, function () {
            console.log("clicked cancel");
        });
    };

    socket.on('add.players:App\\Events\\AddPlayers', function (data) {
        $scope.$apply(function () {
            vm.sports.unshift(data.sport);
        });
    });

    vm.updateModal = function (ev, item) {
        $mdDialog.show({
            locals: { item: item },
            controller: UpdateModalController,
            templateUrl: 'update.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: false
        }).then(function (data) {
            vm.update(item.id, data);
        });
    };

    function UpdateModalController($scope, item, $mdDialog) {
        $scope.data = { name: item.name, description: item.description };
        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.update = function (data) {
            $mdDialog.hide(data);
        };
    }
}]);

/***/ }),
/* 13 */
/***/ (function(module, exports) {

sportsFest.factory("Sport", ["$q", "$http", function ($q, $http) {
  var url = 'api/sports';
  return {
    get: function get() {
      return $http({
        method: 'GET',
        url: url
      });
    },

    store: function store(data) {
      return $http({
        method: 'POST',
        url: url,
        data: data,
        headers: { 'Content-Type': 'application/json' }
      });
    },

    show: function show(id) {
      return $http({
        mehod: 'GET',
        url: url + '/' + id
      });
    },

    update: function update(id, newData) {
      return $http({
        method: 'PUT',
        url: url + '/' + id,
        data: newData,
        headers: { 'Content-Type': 'application/json' }
      });
    },

    destroy: function destroy(id) {
      return $http({
        method: 'DELETE',
        url: url + '/' + id
      });
    },

    upload: function upload(formData, id) {
      return $http.post(url + '/upload/' + id, formData, {
        transformRequest: angular.identity,
        headers: { 'Content-Type': undefined }
      });
    },
    players: function players(id) {
      return $http.get('api/sports/' + id + '/players');
    },
    positions: function positions(id) {
      return $http.get('api/sports/' + id + '/positions');
    },
    getPlayers: function getPlayers(id) {
      return $http.get(url + '/players/noteam/' + id);
    }
  };
}]);

/***/ }),
/* 14 */
/***/ (function(module, exports) {


sportsFest.controller('TeamController', ["$http", "User", "Team", "$state", "$stateParams", "$scope", function ($http, User, Team, $state, $stateParams, $scope) {

  var vm = this;
  vm.editable = false;
  vm.loaded = false;

  //add team to database
  vm.addTeam = function (data) {
    Team.store(data).then(function (response) {}).catch(function (err) {
      console.log(err);
    });
  };

  //retrieve teams from api/teams
  vm.getTeams = function () {
    Team.get().then(function (team) {
      vm.teams = team.data;
      vm.loaded = true;
    }, function (error) {
      console.log(error);
    });
  };
  vm.getTeams();

  socket.on('changed.team:App\\Events\\ChangedTeam', function (broadcast) {
    vm.teams = broadcast.data;
    vm.getPocs();
    $scope.$apply();
    console.log(vm.teams);
  });

  //get team from api/teams/{id}
  vm.getTeam = function () {
    Team.show($stateParams.id).then(function (team) {
      vm.data = team.data[0];
      vm.getTeamPoc(team.data[0].user_id);
      console.log(vm.data);
    }).catch(function (err) {
      console.log(err);
    });
  };

  //go to team route
  vm.showTeam = function (id) {
    $state.go("home.teams_view", { id: id });
  };

  //get the POCs
  vm.getPocs = function () {
    User.poc().then(function (poc) {
      vm.poc = poc.data;
    });
  };
  vm.getPocs();

  vm.getSports = function () {
    $http({
      method: 'GET',
      url: 'api/sports'
    }).then(function (sports) {
      vm.sports = sports.data;
    });
  };
  vm.getSports();

  //retrieve poc from apo/users/{id}
  vm.getTeamPoc = function (id) {
    User.show(id).then(function (poc) {
      vm.data.poc = poc.data;
    }).catch(function (err) {
      console.log(err);
    });
  };
}]);

/***/ }),
/* 15 */
/***/ (function(module, exports) {

sportsFest.factory('Team', ['$q', '$http', function ($q, $http) {

  var url = 'api/teams';

  return {
    get: function get() {
      return $http({
        method: 'GET',
        url: url
      });
    },
    show: function show(id) {
      return $http({
        mehod: 'GET',
        url: url + '/' + id
      });
    },
    store: function store(data) {
      return $http({
        method: 'POST',
        url: url,
        data: data,
        headers: { 'Content-Type': 'application/json' }
      });
    },
    update: function update(id, data) {
      return $http({
        method: 'PUT',
        url: url + '/' + id,
        data: data,
        headers: { 'Content-Type': 'application/json' }
      });
    },
    destroy: function destroy(id) {},

    getTeam: function getTeam(id) {
      return $http.get('api/users/' + id + '/team');
    }
  };
}]);

/***/ }),
/* 16 */
/***/ (function(module, exports) {

sportsFest.factory("Role", ["$q", "$http", function ($q, $http) {

  return {
    get: function get() {
      return $http({
        method: 'GET',
        url: 'api/roles'
      });
    },

    store: function store(data) {
      return $http({
        method: 'POST',
        url: 'api/roles',
        data: data,
        headers: { 'Content-Type': 'application/json' }
      });
    },

    show: function show(id) {
      return $http.get('/api/roles/' + id);
    },

    update: function update(id, newData) {
      return $http({
        method: 'PUT',
        url: 'api/roles/' + id,
        data: newData,
        headers: { 'Content-Type': 'application/json' }
      });
    },

    destroy: function destroy(id) {
      return $http({
        method: 'DELETE',
        url: 'api/roles/' + id
      });
    },

    getAdminId: function getAdminId() {
      return $http({
        method: 'GET',
        url: 'api/roles/admin'
      });
    },

    getPocId: function getPocId() {
      return $http.get('api/roles/poc');
    }
  };
}]);

/***/ }),
/* 17 */
/***/ (function(module, exports) {

sportsFest.controller('UserController', ["$scope", "User", "Role", "$mdDialog", function ($scope, User, Role, $mdDialog) {

    var vm = this;
    vm.users;
    vm.roles;
    vm.loaded = false;

    vm.register = function (data) {
        // console.log(data)
        User.store(data).success(function (successData) {
            //if success, 
            console.log(successData);
        }).error(function (err) {
            console.error(err);
        });
    };

    vm.getUsers = function () {
        User.get().then(function (success) {
            vm.users = success.data;
            vm.loaded = true;
        }, function (error) {
            console.log(error.data);
        });
    };
    vm.getUsers();

    vm.getRoles = function () {
        Role.get().then(function (success) {
            vm.roles = success.data;
            console.log(success.data);
        }, function (error) {
            console.log(error.data);
        });
    };
    vm.getRoles();

    vm.update = function (id, data) {
        User.update(id, data).then(function (success) {
            vm.getUsers();
            console.log(success.data);
        }, function (error) {
            console.log(error);
        });
    };

    //grant access
    //remove, edit users
    vm.editModal = function (ev, user) {
        $mdDialog.show({
            locals: { item: user },
            controller: UpdateModalController,
            templateUrl: 'edit.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: false
        }).then(function (data) {
            delete data['roles'];
            console.log(data);
            vm.update(user.id, data);
        });
    };

    function UpdateModalController($scope, item, $mdDialog) {
        $scope.data = {
            email: item.email,
            first_name: item.first_name,
            last_name: item.last_name,
            cellphone_number: item.cellphone_number,
            role_id: item.role_id,
            roles: vm.roles
        };
        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.update = function (data) {
            $mdDialog.hide(data);
        };
    }
}]);

/***/ }),
/* 18 */
/***/ (function(module, exports) {

sportsFest.factory("User", ["$q", "$http", function ($q, $http) {
  var url = 'api/users';

  return {
    get: function get() {
      return $http({
        method: 'GET',
        url: url
      });
    },
    show: function show(id) {
      return $http({
        mehod: 'GET',
        url: url + '/' + id
      });
    },
    store: function store(data) {
      return $http({
        method: 'POST',
        url: url,
        data: data,
        headers: { 'Content-Type': 'application/json' }
      });
    },
    update: function update(id, data) {
      return $http({
        method: 'PUT',
        url: url + '/' + id,
        data: data,
        headers: { 'Content-Type': 'application/json' }
      });
    },
    destroy: function destroy(id) {},

    poc: function poc() {
      return $http({
        method: 'GET',
        url: url + '/poc'
      });
    }
  };
}]);

/***/ }),
/* 19 */
/***/ (function(module, exports) {

sportsFest.directive('menuLink', function () {
  return {
    scope: {
      section: '='
    },
    templateUrl: 'partials/menu-link.tmpl.html',
    link: function link($scope, $element) {
      var controller = $element.parent().controller();

      $scope.focusSection = function () {
        controller.autoFocusContent = true;
      };
    }
  };
});

/***/ }),
/* 20 */
/***/ (function(module, exports) {

sportsFest.directive('menuToggle', ['$timeout', function ($timeout) {
  return {
    scope: {
      section: '='
    },
    templateUrl: 'partials/menu-toggle.tmpl.html',
    link: function link(scope, element) {
      var controller = element.parent().controller();

      scope.isOpen = function () {
        return controller.isOpen(scope.section);
      };
      scope.toggle = function () {
        controller.toggleOpen(scope.section);
      };

      var parentNode = element[0].parentNode.parentNode.parentNode;
      if (parentNode.classList.contains('parent-list-item')) {
        var heading = parentNode.querySelector('h2');
        element[0].firstChild.setAttribute('aria-describedby', heading.id);
      }
    }
  };
}]);

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(0);
__webpack_require__(1);
__webpack_require__(3);
__webpack_require__(2);
__webpack_require__(4);
__webpack_require__(5);
__webpack_require__(6);
__webpack_require__(7);
__webpack_require__(8);
__webpack_require__(9);
__webpack_require__(10);
__webpack_require__(11);
__webpack_require__(12);
__webpack_require__(13);
__webpack_require__(15);
__webpack_require__(14);
__webpack_require__(16);
__webpack_require__(17);
__webpack_require__(18);
__webpack_require__(19);
module.exports = __webpack_require__(20);


/***/ })
/******/ ]);