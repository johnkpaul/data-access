require.config({
  baseUrl: "../",
  paths: {
    "jquery": "./components/jquery/jquery",
    "handlebars": "./components/handlebars/handlebars",
    "ember": "./components/ember/ember"
  },
  shim: {
    "ember": {
      deps: ['jquery', 'handlebars'],
      exports: 'Ember'
    }
  },

  waitSeconds: 15
});

require(['test/all'], function(){
  mocha.run();
});
