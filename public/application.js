var mainApplicationModuleName = 'learn-mean';

var mainApplicationModule = angular.module(mainApplicationModuleName,
    ['ngRoute', 'users', 'example']);

mainApplicationModule.config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);

// Facebook's redirect bug
if(window.location.hash === '#_=_') window.location.hash = '#!';
// Google's redirect bug
//console.log(window.location.hash);
//if(window.location.hash === '#') window.location.hash = '#!';

angular.element(document).ready(function() {
    angular.bootstrap(document, [mainApplicationModuleName]);
});