/*global require*/
'use strict';

require.config({
    shim: {
    },
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/lodash/dist/lodash',
        ampersand : './ampersand-bundle'
    }
});
require([
	'jquery',
    'backbone',
    'ampersand'
], function ($, Backbone, Ampersand) {
    Backbone.history.start();
    var Person = Ampersand.State.extend({
    	props : {
    		name : 'string'
    	},
    	derived : {
    		greeting : {
    			deps : ['name'],    		
    			fn : function(){
    				return 'Hello ' +this.name;
    			}
    		}
    	}
    });
    var EchoView = Ampersand.View.extend({
    	template : '<div>'
    		+'<input data-hook="input"></input>'
    		+'<h2 data-hook="name"></h2>'
    		+'</div>',
    	events : {
    		'keyup input' : 'setName'
    	},
    	bindings : {
    		'model.greeting' : {
    			hook : 'name'
    		}
    	},
    	setName : function(evt){
    		var val = this.queryByHook('input').value;
    		this.model.name = val;
    	}
    });
    var person = new Person({name:'Mike'});
    var echo = new EchoView({model:person});
    $('body').append(echo.render().el);    
});
