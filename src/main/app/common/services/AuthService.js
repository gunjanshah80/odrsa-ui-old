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
                                "username": username,
                                "authdata": password
                        };
                
                        var url = serverUrl + 'login';
                        var response = {success: true};
                        callback(response);
                        /*
                        var httpConfig = {
                                withCredentials: true,
                                headers : {
                                        "Content-Type" : 'application/json'
                                }                                                              
                        }; */
                        
                        $http.post(url, userLogin, httpConfig).then(
                                function(response) {
                                        callback(response);
                        });
                }

	}

}).call(this);