var UrlBuilder ,

UrlBuilder = (function() {
    function UrlBuilder(baseUrl) {
        this.baseUrl = baseUrl; // this will be server part of the url
        this.queries = {};
        this.queryNames = [];
        this.filterCounter = 1;
        this.isPost = false;
        this.isPut = false;
        this.url = '' ; // this.url will be the part of the url that will be appended to baseUrl to form the final url;
        this.action = '';
    }

    UrlBuilder.prototype.setUrl = function(url){
        this.url = $.trim(url) ;
        return this ;
    } ;

    UrlBuilder.prototype.setAction = function(action) {
        this.action = $.trim(action);
        return this;
    };

    UrlBuilder.prototype.setIsPost = function(isPost) {
        this.isPost = isPost;
        return this;
    };

    UrlBuilder.prototype.setIsPut = function(isPut) {
        this.isPut = isPut;
        return this;
    };

    UrlBuilder.prototype.addFilter = function(name, value) {
        var filterName, filterValue;

        filterName = "Filter." + this.filterCounter + ".Name";
        this.addParameter(filterName, name);
        if (value instanceof Array) {
            filterValue = "Filter." + this.filterCounter + ".Value";
        } else
        {
            filterValue = "Filter." + this.filterCounter + ".Value.1";
        }

        this.addParameter(filterValue, value);
        this.filterCounter = this.filterCounter + 1;
        return this;
    };


    UrlBuilder.prototype.addParameter = function(name, value) {
        if ($.isArray(value)) {
            return this._addParameterCollection(name, value);
        }
        if ($.inArray(name, this.queryNames) === -1) {
            this.queryNames.push(name);
        }
        this.queries[name] = value;
        return this;
    };

    UrlBuilder.prototype.addParameters = UrlBuilder.addParameter;

    UrlBuilder.prototype._addParameterCollection = function(name, collection) {
        var elem, i, _i, _len;

        for (i = _i = 0, _len = collection.length; _i < _len; i = ++_i) {
            elem = collection[i];
            this.addParameter("" + name + "." + (i + 1), elem);
        }
        return this;
    };

    UrlBuilder.prototype.build = function() {
        var query, url, value, _i, _len, _ref;

        url = "" + this.baseUrl ; // + "?Action=" + this.action;
        if(this.url != undefined && this.url.length > 0)
            url += this.url ;

        if(this.action != undefined ){
            this.queries['Action'] = this.action;
            this.queryNames.push('Action');
        }
        
        if(this.queryNames.length > 0)
        {
            url += "?" ;
            _ref = this.queryNames;

            _i = 0 ;
            url += _ref[_i] + "=" +  this.queries[_ref[_i]] ;

            for (_i = 1, _len = _ref.length; _i < _len; _i++) {
                query = _ref[_i];
                value = this.queries[query];
                url = "" + url  + "&" + query + "=" + value ;
            }
        }
        return url;
    };

    return  UrlBuilder ;
})() ;




