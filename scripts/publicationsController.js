var publications = [
    {
        header: 'DiLeo A, Wright KM and McDannald MA (2016). "Sub-second fear discrimination in rats: Adult impairment in adolescent heavy alcohol drinkers." Learning & Memory 23: 618-622.',
        date: '01/20/2016',
        fileUrl: '/content/publications/DiLeo2016.pdf',
    },
    {
        header: 'Lopatina N, McDannald MA, Steyer CV, Peterson J, Sadacca BF, Cheer JF and Schoenbaum G (2016). "Medial orbitofrontal neurons preferentially signal cues predicting changes in reward during unblocking." Journal of Neuroscience 36(32): 8416-8424.',
        date: '01/07/2016',
        fileUrl: '/content/publications/Lopatina2016.pdf',
    },
    {
        header: 'Lopatina N, McDannald MA, Steyer CV, Sadacca BF, Cheer JF and Schoenbaum G (2015). "Lateral orbitofrontal neurons acquire responses to upshifted, downshifted, or blocked cues during Pavlovian unblocking." eLife 10.7554/eLife.11299.',
        date: '01/08/2015',
        fileUrl: '/content/publications/asdf2.pdf',
    },
    {
        header: 'Wright KM, DiLeo A and McDannald MA (2015). "Early adversity disrupts the adult use of aversive prediction errors to reduce fear in uncertainty." Frontiers in Behavioral Neuroscience 9:277.',
        date: '01/08/2015',
        fileUrl: '/content/publications/asdf2.pdf',
    },
    {
        header: 'DiLeo A, Wright KM, Mangone E, McDannald MA (2015). "Alcohol gains access to appetitive learning through adolescent heavy drinking." Behavioral Neuroscience 129(4): 371-9.',
        date: '01/08/2015',
        fileUrl: '/content/publications/asdf2.pdf',
    },
    {
        header: 'Cooch N, Stalnaker TA, Chaudry S, McDannald MA, Liu TZ, Wied H, Schoenbaum G (2015). "Orbitofrontal lesions eliminate signaling of biological significance in cue-responsive ventral striatal neurons." Nature Communications 6: 7195.',
        date: '01/08/2015',
        fileUrl: '/content/publications/asdf2.pdf',
    },
    {
        header: 'McDannald MA (2015). "Serotonin: Waiting but Not Rewarding." Current Biology 25(3): R103-104.',
        date: '01/08/2015',
        fileUrl: '/content/publications/asdf2.pdf',
    },
    {
        header: 'McDannald MA, Esber GR, Wegener MA, Wied H, Liu TL, Stalnaker TA, Jones JL, Trageser J and Schoenbaum G (2014). "Orbitofrontal neurons acquire responses to \'valueless\' Pavlovian cues during unblocking." eLife 10.7554/eLife.02653.',
        date: '01/08/2014',
        fileUrl: '/content/publications/asdf2.pdf',
    },
    {
        header: 'Berg BA, Schoenbaum G and McDannald MA (2014). "The dorsal raphe nucleus is integral to negative prediction errors in Pavlovian fear." European Journal of Neuroscience 40: 3096-3101.',
        date: '01/08/2014',
        fileUrl: '/content/publications/asdf2.pdf',
    },
];

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