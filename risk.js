
var app = angular.module('myapp', []);


app.controller('formController', ['$scope', function($scope) {
	
	$scope.status = function() {
		console.log($scope);	
	}
	
}]);