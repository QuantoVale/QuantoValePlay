angular.module('starter', ['ionic', 'openfb', 'starter.controllers','ngResource','ng-mfb'])


.run(function($rootScope, $state, $ionicPlatform, $window, OpenFB) {
    $ionicPlatform.ready(function() {
        OpenFB.init('1027162853990155', 'http://localhost:8100/oauthcallback.html');

        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }

        $rootScope.$on('$stateChangeStart', function(event, toState) {
            if (toState.name !== "app.home" && toState.name !== "app.logout" && !$window.sessionStorage['fbtoken']) {
                $state.go('app.home');
                event.preventDefault();
            }
        });

        $rootScope.$on('OAuthException', function() {
            $state.go('app.home');
        });

    });
})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('app', {
            abstract: true,
            templateUrl: 'templates/menu.html',
            controller: 'AppCtrl'
        })
        .state('app.home', {
            url: '/',
            views: {
                'menuContent': {
                    templateUrl: 'templates/home.html',
                    controller: 'HomeCtrl'
                }
            }
        })
        .state('start', {
            abstract: true,
            templateUrl: 'templates/menu.html',
          controller: 'AppCtrl'
        })

        .state('start.start', {
            url: '/start',
            views: {
                'start': {
                    templateUrl: 'templates/start.html',
                    controller: 'HomeCtrl'
                }
            }
        })
        .state('theme', {
            abstract: true,
            templateUrl: 'templates/menu.html',
          controller: 'AppCtrl'
        })
        .state('theme.theme', {
            url: '/theme',
            views: {
                'theme': {
                    templateUrl: 'templates/theme.html',
                    controller: 'Answer'
                }
            }
        })
        .state('leaderboard', {
            abstract: true,
            templateUrl: 'templates/menu.html',
            controller: 'AppCtrl'
        })
        .state('leaderboard.leaderboard', {
            url: '/leaderboard',
            views: {
                'leaderboard': {
                    templateUrl: 'templates/leaderboard.html',
                    controller: 'HomeCtrl'
                }
            }
        })
        .state('add', {
            abstract: true,
            templateUrl: 'templates/add.html',
            controller: 'PlayersController'
        })
        .state('add.add', {
            url: '/add',
            views: {
                'add': {
                    templateUrl: 'templates/add.html',
                    controller: 'PlayersController'
                }
            }
        })



        .state('endgame', {
            abstract: true,
            templateUrl: 'templates/menu.html',
            controller: 'AppCtrl'
        })
        .state('endgame.endgame', {
            url: '/endgame',
            views: {
                'endgame': {
                    templateUrl: 'templates/endgame.html',
                    controller: 'Answer'
                }
            }
        })
        .state('question', {
            abstract: true,
            templateUrl: 'templates/menu.html',
            controller: 'AppCtrl'
        })
        .state('question.question', {
            url: '/question',
            views: {
                'question': {
                    templateUrl: 'templates/question.html',
                    controller: 'Answer'

                }
            }
        });
    $urlRouterProvider.otherwise('/');
})
