/**
 *  @author: Koketso Gift Matlhatsi
 *  @technical-support:
 *  email: Koketso42@gmail.com
 *  phone: +27715302436
 *
 *  @page-info:
 *
 *      This is were we place our app configurations, import all the app plugins in this page and include the necessary settings/configuration for this app.
 */

window.globals = {

    baseAddress: 'http://swapi.co/api/',
    webMethods: {
        people: "people",
        planets: "planets",
        films: "films",
        species: "species",
        vehicles: "vehicles",
        starships: "starships"
    },

    pageNumber: 1
};

var app = angular.module('wars', ['ionic', 'wars.controllers', 'ngCordova']);

app.run(function($ionicPlatform, $ionicPopup, $ionicHistory, $rootScope) {
    $ionicPlatform.ready(function() {

        if (window.cordova && window.cordova.plugins.Keyboard) {

            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {

            StatusBar.styleDefault();
        }
    });

    $ionicPlatform.registerBackButtonAction(function (event) {

        if ($ionicHistory.currentStateName() === 'app.people'){
            $ionicPopup.confirm({
                title: 'System Confirmation',
                template: 'Are you sure you want to exit?',
            }).then(function(res) {
                if(res) {
                    ionic.Platform.exitApp();
                }
            });
        } else {
          //$ionicHistory.goBack();

            navigator.app.backHistory();
            $ionicHistory.nextViewOptions({
                disableBack: true
            });

            $ionicHistory.clearCache();
            $ionicHistory.clearHistory();
        }
    }, 100);

    //disable ionic transition
    $rootScope.$watch(function(){
        return $("ion-side-menu-content").css("transform");
    }, function(css) {
        if(css == "matrix(1, 0, 0, 1, -275, 0)") {
            $("ion-side-menu-content").css("transform", "translate3d(0px 0px 0px)");
            $("ion-side-menu-content").css("-webkit-transform", "translate3d(0px 0px 0px)");
            $("ion-side-menu-content").css("-ms-transform", "translate3d(0px 0px 0px)");
        }
    });
});

app.config(function($stateProvider, $urlRouterProvider) {

    var rootingProvider = $stateProvider;

    rootingProvider.state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu/html/menu.html',
        controller: 'MenuController'
    });

    /*
    rootingProvider.state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu/html/menu.html',
        controller: 'AppCtrl'
    });
    */

    rootingProvider.state('app.people', {
        url: '/people',
        views: {
          'menuContent': {
              templateUrl: 'templates/people/html/people.html',
              controller: 'PeopleController'
          }
        }
    });

    rootingProvider.state('app.person', {
        url: '/person/:context',
        views: {
            'menuContent': {
                templateUrl: 'templates/people/html/person.html',
                controller: 'PersonController',
                data: {
                    'context': null
                }
            }
        }
    });

    rootingProvider.state('app.map', {
        url: '/map',
        views: {
          'menuContent': {
              templateUrl: 'templates/map/html/map.html',
              controller: 'MapController'
          }
        }
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/people');
});
