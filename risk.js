
var app = angular.module('myapp', []);


app.controller('formController', ['$scope', function($scope) {
	

	$scope.riskTolerenceScore = 0;
	$scope.experience = [];

	$scope.$watch('risk', function() {
		calculateRisk();
	}, true);


	function calculateRisk() {

		var total = 0;
		var count = 0;
		var previous = "";
		var subTotal = 0;
		console.log($scope.risk);
		for (var key in $scope.risk) {
			
			var section = key.substring(0, key.length - 1);

			if ($scope.risk.hasOwnProperty(key)) {

				if (angular.isArray($scope.risk[key])) {
					console.log("judist");
				}

				subTotal += weightedValue(Number($scope.risk[key]), key);
			}
			
			// console.log("section: " + section + "  previous: " + previous);
			
			if (section == previous) {
				count +=1;
				continue;
			} else {
				previous = section;
				count = 1;
				total += subTotal / count;
				subTotal = 0;
			}		
		}
		$scope.riskTolerenceScore = total;
	}


	function weightedValue(val, section) {
		var multiplier = 1;

		if (section.indexOf('expectations') > -1 || section.indexOf('objectives') > -1) {
			multiplier = .1;
		} else if (section.indexOf('experience') > -1) {
			multiplier = .8;
		}
		return Math.floor((val * multiplier) * 100) / 100;
	}
	
}]);