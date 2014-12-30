
var app = angular.module('myapp', []);


app.controller('formController', ['$scope', function($scope) {
	

	$scope.riskTolerenceScore = 0;
	$scope.experience = [];

	$scope.$watch('risk', function() {
		calculateRisk();
	}, true);


	function calculateRisk() {

		var total = 0;
		var subTotal = 0;
		var count = 0;

		for (var key in $scope.risk) {
			subTotal = 0;
			count = 0;

			if ($scope.risk.hasOwnProperty(key)) {
				
				for (var key2 in $scope.risk[key]) {
					
					if ($scope.risk[key].hasOwnProperty(key2)) {

						subTotal += weightedValue(Number($scope.risk[key][key2]), key);	
						count += 1;

					}
				}
			}
			total += subTotal / count;
		}
		$scope.riskTolerenceScore = Math.round(total * 100) / 100;
		$scope.fundName = fundName(total);
	}


	function weightedValue(val, section) {
		var multiplier = 1;

		if (section.indexOf('expectations') > -1 || section.indexOf('objectives') > -1) {
			multiplier = .1;
		} else if (section.indexOf('experience') > -1) {
			multiplier = .8;
		}
		return val * multiplier;
	}
	

	function fundName(val) {
		if (val < 1.5) {
			return "Conservative";
		} else if (val < 2.5) {
			return "Balanced";
		} else if (val < 3.5) {
			return "Moderate";
		} else if (val < 4.5) {
			return "Growth";
		} else if (val >= 4.5) {
			return "Aggressive";
		}
	}
}]);