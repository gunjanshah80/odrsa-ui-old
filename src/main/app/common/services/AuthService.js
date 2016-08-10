(function () {
 
        var serverUrl;

	m = angular.module('app').factory('AuthService', AuthService);

        serverUrl = 'http://localhost:8180/odrsa-server/';

	AuthService.$inject = ['$http', '$rootScope'];
	function AuthService($http, $rootScope) {
		var service = {};
		
		service.Login = Login;
/*        service.SetCredentials = SetCredentials;
        service.ClearCredentials = ClearCredentials;
        */

        return service;

                function Login(username, password, callback) {

                        debugger;

                        var userLogin = {
                                "userName": username,
                                "userAuthData": password
                        };
                
                        var url = serverUrl + 'login';

                        var httpConfig = {
                                withCredentials: true,                               
                                headers : {
                                        "Content-Type":'application/x-www-form-urlencoded'                                        
                                }
                        };
                        
                        $http.post(url, userLogin, httpConfig).then(
                                function(loginResponse) {
                                        callback(response);
                        });
                }

	}

}).call(this);