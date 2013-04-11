(function(){
"use strict";
define(function(require){

  var dataAccess = require('src/data-access');

  describe('data access validations', function(){

    var personSchema = dataAccess.createSchema({
      schema:{
        birthdate: 'Date',
        firstName: 'String',
        lastName: 'String'
      },
      validate: function(){
        return this.get('firstName') === "Hello";
      }
    });

    describe('isValid', function(){

      it('updates when valid values', function(){
        var person = personSchema.create({
          firstName: 'test'
        });

        expect(person.get('isValid')).to.equal(false);
        person.set('firstName', 'Hello');

        expect(person.get('isValid')).to.equal(true);
      });

    });

    describe('get and set', function(){

      it('provides correct value when calling get', function(){
        var person = personSchema.create({
          firstName: 'test'
        });

        expect(person.get('firstName')).to.equal('test');
        expect(person.firstName).to.equal('test');
      });
      
      it('stores value correctly when using set', function(){
        var person = personSchema.create({
          firstName: 'test'
        });
        person.set('firstName', 'newval');

        expect(person.get('firstName')).to.equal('newval');
      });

    });
  });
});

}());
