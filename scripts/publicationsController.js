angular.module("lab").controller("PublicationsController", ["$scope", "$sce", function ($scope, $sce) {
    $scope.publications = publications;
    $scope.years = [];
    
    var searchColumns = ["header", "searchText"];
    
    $scope.search = function (input) {
        return fuzzySearch(input, $scope.searchValue, searchColumns);
    };
    
    $scope.publicationsFromYear = function (year) {
        return $scope.publications.filter(function (d) {
            return d.year == year;
        });
    };
    
    $scope.$watch("publications", function (value) {
        value.forEach(function (pub) {
            var d = moment(pub.date, "MM/DD/YYYY");
            
            var year = d.year();
            
            pub.time = +d;
            pub.year = year;
            pub.html = $sce.trustAsHtml(pub.description);
            pub.searchText = getTextFromNode(pub.description || "");
            
            pub.fileType = pub.fileType || pub.fileUrl.substring(pub.fileUrl.lastIndexOf('.') + 1);
            pub.filename = pub.filename || pub.fileUrl.substring(pub.fileUrl.lastIndexOf('/') + 1);
            
            if ($scope.years.indexOf(year) < 0) {
                $scope.years.push(year);
            }
        });
    });
}]);