var people = [
    {
        name: "Mike McDannald",
        titles: ["Title 1", "Title n"],
        description: "Description.... Description.... Description.... Description.... Description.... Description.... Description.... Description....",
        email: "michael.mcdannald@bc.edu",
        imageUrl: "content/images/mike.jpg",
        cvUrl: "resources/people/",
    },
    {
        name: "John Marriott",
        titles: ["Title 1", "Title 123"],
        description: "Description.... Description.... Description.... Description.... Description.... Description.... Description.... Description....",
        email: "asdfasdf@gmail.com",
        imageUrl: "content/images/JohnMarriott.jpg",
        cvUrl: "resources/people/",
    }
];

angular.module("lab").controller("PeopleController", ["$scope", "$sce", function ($scope, $sce) {
    $scope.people = people;
    
    var searchColumns = ["name", "description", "titleText"];
    
    $scope.search = function (input) {
        return fuzzySearch(input, $scope.searchValue, searchColumns);
    };
    
    $scope.$watch("people", function (value) {
        value.forEach(function (p) {
            p.titleText = p.titles.join(" ");
        });
    });
}]);