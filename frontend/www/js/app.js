angular.module('starter', ['ionic', 'satellizer', 'openfb', 'starter.controllers'])



.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
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
                    controller: 'HomeCtrl'
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
                    controller: 'HomeCtrl'
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

.config(function($authProvider) {
    // OAuth popup should expand to full screen with no location bar/toolbar.
    var commonConfig = {
        popupOptions: {
            location: 'no',
            toolbar: 'no',
            width: 780,
            height: 600
        }
    };


    $authProvider.facebook(angular.extend({}, commonConfig, {
        clientId: '1027162853990155',
        responseType: 'token',
        url: '/auth/facebook',
        authorizationEndpoint: 'https://www.facebook.com/v2.3/dialog/oauth',
        redirectUri: (window.location.origin || window.location.protocol + '//' + window.location.host) + '/',
        requiredUrlParams: ['display', 'scope'],
        scope: ['email'],
        scopeDelimiter: ',',
        display: 'popup',
        type: '2.0',
        popupOptions: {
            width: 580,
            height: 400
        }
    }));


    $authProvider.google(angular.extend({}, commonConfig, {
        clientId: '949086308295-cg79vahcigculbnf5ttr580cavhmv8a0.apps.googleusercontent.com',
        responseType: 'token',
        url: 'http://localhost:8100/auth/google'
    }));
});
