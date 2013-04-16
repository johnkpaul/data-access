(function(){
"use strict";
define(function(require){

  var dataAccess = require('src/data-access');

  describe('misc', function(){
    dataAccess.registerSchema('person', {
      schema:{
        firstName: 'String',
        lastName: 'String'
      }
    });

    var personSchema = dataAccess.initializeSchema({name: 'person', type:'backbone'});

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


