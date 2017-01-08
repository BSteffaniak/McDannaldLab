var publications = [
    {
        header: 'Asdf test',
        date: '01/20/2016',
        fileUrl: 'Publications/asdf.txt',
        description: '<b>asdfasdfasdfasdfa</b>'
    },
    {
        header: 'Asdf test2',
        date: '01/07/2017',
        fileUrl: 'Publications/asdf2.txt',
        description: '<b>asdfasdfasdfsadfdfdfdasdfa</b>'
    },
];

angular.module("lab").controller("PublicationsController", ["$scope", "$sce", function ($scope, $sce) {
    $scope.publications = publications;
    $scope.years = [];
    
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
            
            pub.fileType = pub.fileType || pub.fileUrl.substring(pub.fileUrl.lastIndexOf('.') + 1);
            
            if ($scope.years.indexOf(year) < 0) {
                $scope.years.push(year);
            }
        });
    });
}]);