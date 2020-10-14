/**
 * 
 * @param {*} $scope 
 */

const SEARCH_SERVICES = function SearchServices($http) {
    
    this.get = function(cities, callback) {
        $http({
            method: "GET",
            url: `http://localhost:3000/weather/${cities}`,
            headers: { 'Content-Type': 'application/json', 'access_token': '42f3719e-8fd1-4586-a1ae-6329db109285'}
          }).then((result) => {
            callback(result);
        });
    };
}

export default SEARCH_SERVICES;