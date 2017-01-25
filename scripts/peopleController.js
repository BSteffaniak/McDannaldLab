angular.module("lab").controller("PeopleController", ["$scope", "$sce", function ($scope, $sce) {
    $scope.people = people;
    
    var searchColumns = ["name", "description", "titleText"];
    
    $scope.search = function (input) {
        return fuzzySearch(input, $scope.searchValue, searchColumns);
    };
    
    $scope.$watch("people", function (value) {
        value.forEach(function (p) {
            p.titleText = p.titles.join(" ");
            
            var img = new Image();
            
            p.style = {
                width: '100%'
            };
            
            img.onload = function() {
                if (this.width > this.height) {
                    $scope.$apply(function () {
                        p.style.width = "auto";
                        p.style.height = '100%';
                    });
                }
            };
            
            img.src = p.imageUrl;
            
            p.html = $sce.trustAsHtml(p.description);
            p.searchText = getTextFromNode(p.description || "");
            p.cvName = p.cvUrl ? p.cvUrl.substring(p.cvUrl.lastIndexOf('/') + 1) : "";
        });
    }, false);
}]);