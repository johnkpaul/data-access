(function(){
"use strict";
define(function(require){

  var validationTests = require('test/validation');
  var emberValidationTests = require('test/ember-validation');
  var backboneValidationTests = require('test/backbone-validation');
  var conversionTests = require('test/conversion');

});

}());
      //var SlideRepo = dataAccess.createRepo({
        //collectionConfig:{
          //find: "http://localhost:3002/slideshows/:slideshow_id/:_id"
        //},
        //instanceConfig:{
          //save: "http://localhost:3002/slideshows/:slideshow_id/:_id"
        //},
        //schema:{
          //_id: 'String',
          //createdAt: 'Date',
          //modifiedAt: 'Date',
          //photo: 'Object'
        //},
        //validate:function(){
          //var firstName = this.get('firstName'); 
          //var lastName = this.get('lastName'); 
          //return firstName && lastName;
        //}
      //});

      //var SlideshowRepo = dataAccess.createRepo({
        //collectionConfig:{
          //findAll: "http://localhost:3002/slideshows"
        //},
        //instanceConfig:{
          //save: "http://localhost:3002/slideshows/:_id"
        //},
        //schema:{
          //_id: 'String',
          //createdAt: 'Date',
          //modifiedAt: 'Date',
          //deadline: 'Date',
          //hed: 'String',
          //dek: 'String',
          //slides: [SlideRepo.entity]
        //}
      //});

      //var slideshowRepo = SlideshowRepo.create({modelType:'ember'});
      
      //slideshowRepo.findAll().then(function(slideshows){

        //slideshows.slides[0].photo.url = "http://newurl";
        //slideshows.slides[0].save();

        //slideshows.slides[1].deadline = new Date();
        //slideshows.slides[1].save();  //this will send ISO8601
        
      //});

