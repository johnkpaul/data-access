require.config({
  baseUrl: "../",
  paths: {
      "jquery": "./components/jquery/jquery"
  },
  waitSeconds: 15
});

require(['test/all'], function(){
  mocha.run();
});
