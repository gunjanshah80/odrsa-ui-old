(function() {
	debugger;
    var ctrlName, mod, modName;
    modName = 'login';

    mod = angular.module(modName, []);

    ctrlName = modName + 'Ctrl';

    mod.controller(ctrlName, ['$scope', '$location', '$rootScope', 'AuthService', '$window',
    	function($scope, $location, $rootScope, $authservice, $window) {

    		$scope.$id = ctrlName;

            $scope.signin = function() {
                debugger;
                $scope.spinner = true;
                $authservice.Login($scope.model.username, $scope.model.password, function (response) {
                  if (response.success) {
                      $rootScope.isLoginPage = false;
                      /* AuthenticationService.SetCredentials(vm.username, vm.password); */                      
                      $scope.redirectUser();                      
                  } else {
                    $scope.spinner = false;
                  }
                });              
            };

            $scope.redirectUser = function(){                                           
                $location.path('/home'); 
                $window.location.reload(true);            
            };

            initialiseController = function (){
                  $scope.spinner = false;
                  $scope.model = {};
                  $scope.model.username='';
                  $scope.model.password = '';
                  $scope.model.msg = '';
                  $rootScope.isLoginPage = true;
                  $scope.formname = 'login';
            }
            initialiseController();
        }        

    ]);


}).call(this);