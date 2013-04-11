/*
 * data-access
 * https://github.com/johnkpaul/data-access
 *
 * Copyright (c) 2013 John K. Paul
 * Licensed under the MIT license.
 */

define(function(require){
  "use strict";

  var $ = require("jquery");
  var extend = $.extend;

  var repo = {
    createSchema: function(options){

      var instance = Object.create({
        schema: options.schema,
        validate: options.validate,
        create: function(params){
          extend(this, repo);
          extend(this, params);
          return this;
        }, 
        emberify:function(){
          var validator = this.validate;
          var emClass = Ember.Object.extend({
            isValid: propertize(function(){
              return validator.call(this);
            }, getDependentKeys(validator))
          });


          return emClass.create(this.toJSON());
        }
      });

      extend(instance, this);
      instance.set();
      return instance;
    },
    get: function(key){
      return this[key];
    },
    set: function(key, value){
      this[key] = value;
      if (key !== 'isValid' && this.validate) {
        this.isValid = this.validate();
      }
    },
    toJSON: function(){
      var json = {};

      for (var key in this.schema) {
        var type = this.schema[key];
        var value = this[key];
        if (!value){
          continue;
        }
        if (type !== "Object" && type !== "Date"){
          json[key] = value;
        } else {
          json[key] = getSerialized(value);
        }

      }

      return json;
    }
  }
  
  function getSerialized(prop){
    if (prop instanceof Date) {
      return prop.toISOString();
    }
  }

  function propertize(func, dependentKeys){
    return func.property.apply(func, dependentKeys);
  }

  function getDependentKeys(func){
    var source = func.toString();
    var reg = /get\('(.*)'\)/g;
    var keys = [];
    var match;
    

    while (match = reg.exec(source)) {
      keys.push(match[1]);
    }
    
    return keys;
  };
  return repo;
});

