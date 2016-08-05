var app = angular.module('versionApp', []);
app.directive('versionDirective', function() {
	return {
		scope: {},
		controller: function($scope, $element, $timeout){

			$scope.version = 'v0.0.0';
			$scope.edit = function() {
				$scope.isHidden = true;
				$scope.isHiddenDiv = false;

				var parts = $scope.version.split('.');
				var major = parts[0].substr(1);
				
				$scope.versionMajor = major;
				$scope.versionMinor = parts[1];
				$scope.versionRevision = parts[2];

				var elements = $element.find('input');
				$timeout(function(){
					elements[2].focus();
				}, 0);
			};
			$scope.cancelEdit = function() {
				$scope.isHiddenDiv = true;
				$scope.isHidden = false;
				$scope.version = 'v' + $scope.versionMajor + '.' + $scope.versionMinor + '.' + $scope.versionRevision;
			}
		},
		restrict: 'AE',
		transclude: true,
		replace: true,
		template: '<div><button ng-model="version" ng-click="edit()" ng-hide="isHidden" class="versionButton" />{{version}}</button><div class="versionDiv" id="versionDiv" ng-click="cancelEdit()" ng-hide="isHiddenDiv" ng-init="isHiddenDiv=true">v<input type="text" ng-model="versionMajor" class="versionItem" ng-click="$event.stopPropagation();" />.<input type="text" ng-model="versionMinor" class="versionItem" ng-click="$event.stopPropagation();" />.<input type="text" ng-model="versionRevision" class="versionItem" ng-click="$event.stopPropagation();" /></div></div>',
		link: function(scope, element, attrs) {
		}
	};
});
