require.config({
  baseUrl: "../",
  paths: {
    "jquery": "./components/jquery/jquery",
    "backbone": "./components/backbone/backbone",
    "underscore": "./components/underscore/underscore",
    "handlebars": "./components/handlebars/handlebars",
    "ember": "./components/ember/ember"
  },
  shim: {
    "ember": {
      deps: ['jquery', 'handlebars'],
      exports: 'Ember'
    },
    "underscore": {
      exports: '_'
    },
    "backbone": {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    }
  },

  waitSeconds: 15
});

require(['test/all'], function(){
  mocha.run();
});
