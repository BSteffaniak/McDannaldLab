var publications = [
    {
        header: 'Asdf test',
        fileUrl: 'Publications/asdf.txt',
        description: '<b>asdfasdfasdfasdfa</b>'
    },
    {
        header: 'Asdf test2',
        fileUrl: 'Publications/asdf2.txt',
        description: '<b>asdfasdfasdfsadfdfdfdasdfa</b>'
    },
];

app.controller("PublicationsController", ["$scope", function ($scope) {
    $scope.publications = publications;
}]);