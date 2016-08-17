(function () {
 
        var serverUrl;

	m = angular.module('app').factory('AuthService', AuthService);

        serverUrl = 'http://localhost:8180/odrsa-server/';

	AuthService.$inject = ['$http', '$rootScope'];
	function AuthService($http, $rootScope) {
		var service = {};
		
		service.Login = Login;
                service.Logout = Logout;

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
                        
                        var httpConfig = {
                                headers : {
                                        "Content-Type" : 'application/json'
                                }                                                              
                        };
                        /*
                        $http.post(url, userLogin, httpConfig).then(
                                function(response) {
                                        callback(response);
                        }); */
                }

                function Logout(sessionid, callback) {

                        debugger;                        
                
                        var url = serverUrl + 'logout' + '/' + sessionid;
                        
                        var httpConfig = {
                                headers : {
                                        "Content-Type" : 'application/json'
                                }                                                              
                        };
                        
                        $http.get(url, httpConfig).then(
                                function(response) {
                                        callback(response);
                        });
                }

	}

}).call(this);