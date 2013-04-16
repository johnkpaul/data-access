(function(){
"use strict";
define(function(require){

  var Em = require('ember');
  var dataAccess = require('src/data-access');

  describe('ember validations', function(){

    dataAccess.registerSchema('person', {
      schema:{
        firstName: 'String',
        lastName: 'String'
      },
      validate: function(){
        return this.get('firstName') === "valid value";
      }
    });

    var personSchema = dataAccess.initializeSchema({name:'person', type:'ember'});

    describe('emberify', function(){

      it('returns ember object that uses ember properties', function(){
        var personModel = personSchema.create({
          firstName: 'valid value'
        }).emberify();

        personModel.reopen({
          isNotValid:function(){
            return !this.get('isValid');
          }.property('isValid')
        });

        expect(personModel.get('isValid')).to.equal(true);
        expect(personModel.get('isNotValid')).to.equal(false);
      });

      it('updates isValid when invalid attributes are set', function(){

        var personModel = personSchema.create({
          firstName: 'valid value'
        }).emberify();

        expect(personModel.get('isValid')).to.equal(true);

        personModel.set('firstName', 'invalid value');

        expect(personModel.get('isValid')).to.equal(false);

      });

    });

  });
});

}());

