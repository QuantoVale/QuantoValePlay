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
        .state('app.badgers', {
            url: '/badgers',
            views: {
                'menuContent': {
                    templateUrl: 'templates/badgers.html',
                    controller: 'HomeCtrl'
                }
            }
        })
        .state('app.start', {
            url: '/start',
            views: {
                'menuContent': {
                    templateUrl: 'templates/start.html',
                    controller: 'HomeCtrl'
                }
            }
        })
        .state('app.theme', {
            url: '/theme',
            views: {
                'menuContent': {
                    templateUrl: 'templates/theme.html',
                    controller: 'Answer'
                }
            }
        })
        .state('app.leaderboard', {
            url: '/leaderboard',
            views: {
                'menuContent': {
                    templateUrl: 'templates/leaderboard.html',
                    controller: 'RankingController'
                }
            }
        })
        .state('app.endgame', {
            url: '/endgame',
            views: {
                'menuContent': {
                    templateUrl: 'templates/endgame.html',
                    controller: 'Answer'
                }
            }
        })
        .state('app.question', {
            url: '/question',
            views: {
                'menuContent': {
                    templateUrl: 'templates/question.html',
                    controller: 'Answer'
                }
            }
        });
    $urlRouterProvider.otherwise('/');
})
