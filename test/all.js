(function(){
"use strict";
define(function(require){

  var dataAccess = require('src/data-access');

  describe('data-access external API', function(){
    describe('allows extension', function(){
      var SlideRepo = dataAccess.createRepo({
        config:{
          find: "http://localhost:3002/slideshows/:slideshow_id/:_id"
        },
        instanceConfig:{
          save: "http://localhost:3002/slideshows/:slideshow_id/:_id"
        },
        props:{
          _id: 'String',
          createdAt: 'Date',
          modifiedAt: 'Date',
          photo: 'Object'
        }
      });
      var SlideshowRepo = dataAccess.createRepo({
        config:{
          findAll: "http://localhost:3002/slideshows"
        },
        instanceConfig:{
          save: "http://localhost:3002/slideshows/:_id"
        },
        props:{
          _id: 'String',
          createdAt: 'Date',
          modifiedAt: 'Date',
          deadline: 'Date',
          hed: 'String',
          dek: 'String',
          slides: [SlideRepo.entity]
        }
      });
      var slideshowRepo = SlideshowRepo.create({modelType:'ember'});
      slideshowRepo.findAll().then(function(slideshows){
        slideshows.slides[0].photo.url = "http://newurl";
        slideshows.slides[0].save();

        slideshows.slides[1].deadline = new Date();
        slideshows.slides[1].save();  //this will send ISO8601
        
      });

      it('should be 1', function(){
        expect(dataAccess.test).to.equal(1);
        expect(dataAccess.test2).to.equal("1.9.1");
      });
    });
  });
});

}());
