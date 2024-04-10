var App = angular.module('microapp', []);

App.controller('Micrositectrl', function($scope, $http, $filter, API) {

    $scope.getmcrositedata = function(url) {
        $scope.CountryData = [];
        var objdata = {
            "Projectid": 1,
            "kidzeeid": url
        };
        API.Post('https://cmsapi.zeelearn.com/api/CMS/Getmicrositedata', objdata).then(function(response) {
                if (!response.data.root.subroot.error) {
                    $scope.CountryData = $scope.checkundefined(response.data.root.subroot);
                    console.log($scope.CountryData)

                }
            },
            function myError(response) {});
    }
});