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
    schemas: {},
    schemaFromName: function(name){
      return this.schemas[name];
    },
    registerSchema: function(name, options){
      this.schemas[name] = this._createSchema(options);
    },
    initializeSchema: function(options){
      var schemaInstance = Object.create(this.schemas[options.name]);
      schemaInstance._type = options.type;
      return schemaInstance;
    },
    _createSchema: function(options){

      var instance = Object.create({
        schema: options.schema,
        validate: options.validate,
        create: function(params){
          var newObj = Object.create(this);
          extend(newObj, repo);
          extend(newObj, params);
          for( var key in params ){
            var relationshipSchema = this.schema[key];

            if ( relationshipSchema.create && typeof relationshipSchema === 'object' ){
              newObj[key] = relationshipSchema.create(params[key]);
            }
          }
          return newObj;
        }, 
        backboneify: function(){
          var validator = this.validate;
          var model = new Backbone.Model();
          var dependentKeys = getDependentKeys(validator);

          for(var i = 0, len = dependentKeys.length;i < len; i++){
            var key = dependentKeys[i];
            model.on('change:'+key, function(){
              this.set('isValid', validator.call(this));
            }.bind(model));
          }

          model.set(this.toJSON());

          return model;
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

