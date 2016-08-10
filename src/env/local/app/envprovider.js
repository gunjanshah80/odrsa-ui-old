/*
Local
*/

(function() {
  var Environment, EnvironmentProvider, mod, modName;

  modName = "envprovider";

  Environment = (function() {
    function Environment() {}

    Environment.prototype.env = 'Local';
    Environment.prototype.serverUrl = 'http://localhost:8180/odrsa-server/';

    return Environment;

  })();

  EnvironmentProvider = (function() {
    function EnvironmentProvider() {}

    EnvironmentProvider.prototype.$get = [
      function() {
        return new Environment();
      }
    ];

    return EnvironmentProvider;

  })();

  mod = angular.module(modName, []);

  mod.provider(providerName, new EnvironmentProvider());

}).call(this);
