(function () { 	

	m = angular.module('app').factory('DaoService', DaoService);

	DaoService.$inject = ['$http', '$rootScope', '$location', '$scope'];
	function DaoService($http, $rootScope, $location, $scope) {

		DaoService.prototype.serverUrl = 'http://localhost:8180/odrsa-server/';

		DaoService.prototype.getUrlBuilder = function(baseUrl, action) {
            var builder;

            builder = new UrlBuilder(this.serverUrl);

            if(baseUrl != undefined)
                builder.setUrl(baseUrl) ;
            if(action != undefined)
                builder.setAction(action);
            return builder;
        }

        DaoService.prototype.post = function(config, data, httpConfig) {        

            var error, success;
        /*
                _this = this;

            if (!$.isPlainObject(config)) {
                config = {
                    url: config,
                    propegateErrors: []
                };
            }

            success = function(resp) {
                return _this.onSuccess(resp, config);
            };
            error = function(resp) {
                return _this.onError(resp, config);
            };

        */
            return this.$http.post(config.url, data, httpConfig).then(success, error);
        } ;

        return DaoService;

	}

}).call(this);