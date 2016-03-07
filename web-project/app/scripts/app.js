/**
 * @author wangxiao
 * 
 * 每位工程师都有保持代码优雅的义务
 * Each engineer has a duty to keep the code elegant
 */

angular.module('StarbuckApp', 
['ngMaterial', 'ngRoute'])
.config(['$routeProvider',
function ($routeProvider) {
$routeProvider
    .when('/work', {
        templateUrl: 'views/work.html',
        controller: 'workCtrl'
    })
    .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'loginCtrl'
    })
    .otherwise({
        redirectTo: '/login'
    });
}]);
