(function(){
"use strict";
define(function(require){

  var Backbone = require('backbone');
  var dataAccess = require('src/data-access');

  describe('backbone validations', function(){

    dataAccess.registerSchema('person', {
      schema:{
        firstName: 'String',
        lastName: 'String'
      },
      validate: function(){
        return this.get('firstName') === "valid value";
      }
    });

    var personSchema = dataAccess.initializeSchema({name:'person', type:'backbone'});

    describe('backboneify', function(){

      it('returns Backbone model object', function(){
        var personModel = personSchema.create({
          firstName: 'valid value'
        }).backboneify();

        expect(typeof personModel.sync === "function").to.equal(true);
      });

      it('updates isValid when invalid attributes are set', function(){

        var personModel = personSchema.create({
          firstName: 'valid value'
        }).backboneify();

        expect(personModel.get('isValid')).to.equal(true);

        personModel.set('firstName', 'invalid value');

        expect(personModel.get('isValid')).to.equal(false);

      });

    });

  });
});

}());


