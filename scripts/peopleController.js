var people = [
    {
        name: "Mike McDannald",
        titles: ["Title 1", "Title n"],
        description: "Description.... Description.... Description.... Description.... Description.... Description.... Description.... Description....",
        email: "michael.mcdannald@bc.edu",
        imageUrl: "/content/images/mike.jpg",
        cvUrl: "content/cv/McDannald CV.pdf",
    },
    {
        name: "Mahsa Moaddab",
        titles: ["Title 1", "Title 123"],
        description: "Description.... Description.... Description.... Description.... Description.... Description.... Description.... Description....",
        email: "asdfasdf@gmail.com",
        imageUrl: "/content/images/JohnMarriott.jpg",
        cvUrl: "resources/people/",
    },
    {
        name: "Rachel Zacharias",
        titles: ["Title 1", "Title 123"],
        description: "Description.... Description.... Description.... Description.... Description.... Description.... Description.... Description....",
        email: "asdfasdf@gmail.com",
        imageUrl: "/content/images/RachelZacharias.jpg",
        cvUrl: "resources/people/",
    },
    {
        name: "Kristina Wright",
        titles: ["Title 1", "Title 123"],
        description: "Description.... Description.... Description.... Description.... Description.... Description.... Description.... Description....",
        email: "asdfasdf@gmail.com",
        imageUrl: "/content/images/JohnMarriott3.jpg",
        cvUrl: "resources/people/",
    },
    {
        name: "Madelyn Ray",
        titles: ["Title 1", "Title 123"],
        description: "Description.... Description.... Description.... Description.... Description.... Description.... Description.... Description....",
        email: "asdfasdf@gmail.com",
        imageUrl: "/content/images/JohnMarriott4.jpg",
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