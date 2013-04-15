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
    var petSchema = dataAccess.createSchema({
      schema:{
        name: 'String',
        legs: 'Number'
      }
    });

    var personSchema = dataAccess.createSchema({
      schema:{
        firstName: 'String',
        lastName: 'String',
        pet: petSchema
      }
    });

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

