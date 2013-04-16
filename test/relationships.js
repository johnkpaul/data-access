/*
 * data-access
 * https://github.com/johnkpaul/data-access
 *
 * Copyright (c) 2013 John K. Paul
 * Licensed under the MIT license.
 */

(function(){
"use strict";
define(function(require){

  var dataAccess = require('src/data-access');

  describe('relationships', function(){
    dataAccess.registerSchema('pet', {
      schema:{
        name: 'String',
        legs: 'Number'
      }
    });

    dataAccess.registerSchema('person', {
      schema:{
        firstName: 'String',
        lastName: 'String',
        pet: dataAccess.schemaFromName('pet')
      }
    });

    var personSchema = dataAccess.initializeSchema({name:'person', type:'backbone'});

    describe('parent child', function(){
      
      it('should express child as model', function(){
        var person = personSchema.create({
          firstName: 'John',
          lastName: 'Paul',
          pet: {
            name: 'Ruff',
            legs: 4
          }
        });

        var legs = person.get('pet').toJSON().legs;
        expect(legs).to.equal(4);
      });

    });
  });
});

}());

