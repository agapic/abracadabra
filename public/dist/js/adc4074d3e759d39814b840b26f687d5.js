var app=angular.module("abra",["ngRoute"]);app.config(["$routeProvider",function(a){a.when("/",{controller:"IndexController",templateUrl:"views/index.html"}).otherwise({templateUrl:"views/404.html",resolve:{err:function(){return{status:404}}}})}]),app.controller("IndexController",["$scope",function(a){a.message="This is sort of an index. Lol."}]);