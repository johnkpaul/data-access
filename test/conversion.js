(function(){
"use strict";
define(function(require){

  var dataAccess = require('src/data-access');

  describe('data-access external API', function(){
    var personSchema = dataAccess.createSchema({
      schema:{
        birthdate: 'Date',
        firstName: 'String',
        lastName: 'String'
      }
    });

    describe('toJSON conversions', function(){

      var serializedDate = "2013-04-11T15:16:00.000Z";
      var date = new Date(Date.parse(serializedDate));

      it('should convert date to ISO8601 in toJSON', function(){
        var person = personSchema.create({
          birthdate: date
        });

        var iso8601 = person.toJSON().birthdate;
        expect(iso8601).to.equal(serializedDate);

        expect(person.birthdate).to.equal(date);

        expect(person.get('birthdate')).to.equal(date);
      });
    });
  });
});

}());
