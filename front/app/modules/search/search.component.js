'use strict';

import angular from 'angular';

function searchController($scope, searchApi) {
  var ctrl = this;

  // chart data
  $scope.chartLabels = [];
  $scope.chartData = [];
  $scope.chartSeries = ['Temperatura'];

  $scope.cities = [
    {
      value: null
    }
  ];

  $scope.citiesTemperature = null;
  $scope.reverse = true;
  $scope.propertyName = 'city';

  $scope.sortBy = function(column) {
    $scope.reverse = ($scope.propertyName === column) ? !$scope.reverse : false;
    $scope.propertyName = column;
  };

  $scope.addCity = function(keyEvent) {
    if (keyEvent != null && keyEvent.which !== 13) {
      return;
    }
    if($scope.cities[$scope.cities.length - 1].value)
      $scope.cities.push({value: null});
  };

  $scope.$watch('cities', (newVal, oldVal) => {
    if(newVal != oldVal && newVal.length > 2 && newVal[2].value != null) {
      searchApi.get(newVal.map(function(city) { return city.value; }), function(results) {
        if(results.data.code == 200 && results.data.items) {
          $scope.citiesTemperature = results.data.items;

          $scope.chartLabels = $scope.citiesTemperature.map((city) => { return city.city; });
          $scope.chartData = $scope.citiesTemperature.map((city) => { return city.temp; });
        } else {}
      });
    }
  }, true);

}

export default function searchComponent() {
  return {
    templateUrl: './app/modules/search/search.tpl.html',
    controller: searchController
  }
}