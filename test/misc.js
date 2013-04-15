(function(){
"use strict";
define(function(require){

  var dataAccess = require('src/data-access');

  describe('misc', function(){
    var personSchema = dataAccess.createSchema({
      schema:{
        firstName: 'String',
        lastName: 'String'
      }
    });

    describe('regression tests', function(){
      
      it('should create new object from schema each time', function(){
        var person = personSchema.create({
          firstName: "first"
        });

        var person2 = personSchema.create({
          firstName: "second"
        });
        
        expect(person.get('firstName')).to.equal('first');
      });
    });
  });
});

}());


