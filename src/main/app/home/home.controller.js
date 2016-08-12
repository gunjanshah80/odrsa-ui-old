(function() {
	debugger;
    var ctrlName, mod, modName;
    modName = 'home';

    mod = angular.module(modName, []);

    ctrlName = modName + 'Ctrl';
    
    mod.controller(ctrlName, ['$scope', '$location', '$rootScope',	
    	function($scope, $location, $rootScope) {

    		$scope.$id = ctrlName;
            $scope.aboutus = "afdaf afasf afasfa asa fasfa s";

        }        

    ]);


}).call(this);