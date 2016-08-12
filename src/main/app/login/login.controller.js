(function() {
	debugger;
    var ctrlName, mod, modName;
    modName = 'login';

    mod = angular.module(modName, []);

    ctrlName = modName + 'Ctrl';

    mod.controller(ctrlName, ['$scope', '$location', '$rootScope', 'AuthService', '$window', '$timeout',
    	function($scope, $location, $rootScope, $authservice, $window, $timeout) {

    		$scope.$id = ctrlName;

            $scope.signin = function() {
                debugger;
                $scope.loading = true;
                $authservice.Login($scope.model.username, $scope.model.password, function (response) {
                  if (response.success) {
                      $rootScope.isLoginPage = false;
                      /* AuthenticationService.SetCredentials(vm.username, vm.password); */                      
                      $timeout($scope.redirectUser(), 3000);                      
                  } else {
                    $scope.loading = false;
                  }
                });              
            };

            $scope.redirectUser = function(){                                           
                $location.path('/home'); 
                $window.location.reload(true);            
            };

            initialiseController = function (){
                  $scope.loading = false;
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