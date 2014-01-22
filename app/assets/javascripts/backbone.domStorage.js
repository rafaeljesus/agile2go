/**
 * Backbone localStorage and sessionStorage Adapter
 * https://github.com/mikeedwards/Backbone.DOMStorage
 */

//A localStorage/sessionStorage polyfill
//see https://gist.github.com/350433
(function () {
  var storageAvailable = true;

  try {
    if (typeof window.localStorage !== 'undefined')
    {
      //testing to see if localStorage is available, but restricted
      //by private browsing (e.g. on an iPad)
      window.localStorage.setItem('testLocalStorage','success');
      window.localStorage.removeItem('testLocalStorage');
    }
  } catch (err) {
    storageAvailable = false;
  }

  if (!storageAvailable
    || typeof window.localStorage === 'undefined'
    || typeof window.sessionStorage === 'undefined') (function () {

    var Storage = function (type) {
      function createCookie(name, value, days) {
        var date, expires;

        if (days) {
          date = new Date();
          date.setTime(date.getTime()+(days*24*60*60*1000));
          expires = "; expires="+date.toGMTString();
        } else {
          expires = "";
        }
        document.cookie = name+"="+value+expires+"; path=/";
      }

      function readCookie(name) {
        var nameEQ = name + "=",
            ca = document.cookie.split(';'),
            i, c;

        for (i=0; i < ca.length; i++) {
          c = ca[i];
          while (c.charAt(0)==' ') {
            c = c.substring(1,c.length);
          }

          if (c.indexOf(nameEQ) == 0) {
            return c.substring(nameEQ.length,c.length);
          }
        }
        return null;
      }
      
      function setData(data) {
        data = JSON.stringify(data);
        if (type === 'session') {
          window.name = data;
        } else {
          createCookie('localStorage', data, 365);
        }
      }
      
      function clearData() {
        if (type === 'session') {
          window.name = '';
        } else {
          createCookie('localStorage', '', 365);
        }
      }
      
      function getData() {
        var data = type === 'session' ? window.name : readCookie('localStorage');
        return data ? JSON.parse(data) : {};
      }


      // initialise if there's already data
      var data = getData();

      return {
        length: 0,
        clear: function () {
          data = {};
          this.length = 0;
          clearData();
        },
        getItem: function (key) {
          return data[key] === undefined ? null : data[key];
        },
        key: function (i) {
          // not perfect, but works
          var ctr = 0;
          for (var k in data) {
            if (ctr === i) return k;
            else ctr++;
          }
          return null;
        },
        removeItem: function (key) {
          delete data[key];
          this.length--;
          setData(data);
        },
        setItem: function (key, value) {
          data[key] = value+''; // forces the value to a string
          this.length++;
          setData(data);
        }
      };
    };

    if (storageAvailable) {
      if (typeof window.localStorage === 'undefined') window.localStorage = new Storage('local');
      if (typeof window.sessionStorage === 'undefined') window.sessionStorage = new Storage('session');  
    } else {
      window.privateLocalStorage = new Storage('local');
      window.privateSessionStorage = new Storage('session');  
    }
  })();
  
})();

(function() {
// A simple module to replace `Backbone.sync` with *localStorage*-based
// persistence. Models are given GUIDS, and saved into a JSON object. Simple
// as that.

// Hold reference to Underscore.js and Backbone.js in the closure in order
// to make things work even if they are removed from the global namespace
var _ = this._;
var Backbone = this.Backbone;

// Generate four random hex digits.
function S4() {
   return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
};

// Generate a pseudo-GUID by concatenating random hexadecimal.
function guid() {
   return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
};

// Our Store is represented by a single JS object in *localStorage*. Create it
// with a meaningful name, like the name you'd give a table.
// window.Store is deprectated, use Backbone.LocalStorage instead
Backbone.LocalStorage = window.Store = function(name) {
  this.name = name;
  var store = this.localStorage().getItem(this.name) || "";
  this.records = (store && store.split(",")) || [];
};

_.extend(Backbone.LocalStorage.prototype, {

  // Save the current state of the **Store** to *localStorage*.
  save: function() {
    this.localStorage().setItem(this.name, this.records.join(","));
  },

  // Fetches an item from local storage and returns an empty object if it doesn't exist
  // cf. https://github.com/leaguevine/leaguevine-ultistats/commit/056e01512083fb27d5a4d67c4c733e0f57fc59ff
  safeGet: function(name) { 
    var obj = this.localStorage().getItem(name); 
    if (!obj) {
      return '{}';
    }
    return obj;
  },

  // Add a model, giving it a (hopefully)-unique GUID, if it doesn't already
  // have an id of it's own.
  create: function(model) {
    if (!model.id) {
        model.id = guid();
        model.set(model.idAttribute, model.id);
    }
    this.localStorage().setItem(this.name+"-"+model.id, JSON.stringify(model));
    this.records.push(model.id.toString());
    this.save();
    return model.toJSON();
  },

  // Update a model by replacing its copy in `this.data`.
  update: function(model) {
    this.localStorage().setItem(this.name+"-"+model.id, JSON.stringify(model));
    if (!_.include(this.records, model.id.toString())) this.records.push(model.id.toString()); this.save();
    return model.toJSON();
  },

  // Retrieve a model from `this.data` by id.
  find: function(model) {
    return JSON.parse(this.safeGet(this.name+"-"+model.id));
  },

  // Return the array of all models currently in storage.
  findAll: function() {
    return _(this.records).chain()
        .map(function(id){
          var obj = JSON.parse(this.safeGet(this.name+"-"+id));
          return _.isEmpty(obj) ? false : obj;
        }, this)
        .compact()
        .value();
  },

  // Delete a model from `this.data`, returning it.
  destroy: function(model) {
    this.localStorage().removeItem(this.name+"-"+model.id);
    this.records = _.reject(this.records, function(record_id){return record_id == model.id.toString();});
    this.save();
    return model;
  },

  localStorage: function() {
    var storage;

    if (window.privateLocalStorage) {
      storage = window.privateLocalStorage;
    } else {
      storage = localStorage;
    }

    return storage;
  }

});

// localSync delegate to the model or collection's
// *localStorage* property, which should be an instance of `Store`.
// window.Store.sync and Backbone.localSync is deprectated, use Backbone.LocalStorage.sync instead
Backbone.LocalStorage.sync = window.Store.sync = Backbone.localSync = function(method, model, options, error) {
  var store = model.localStorage || model.collection.localStorage,
    resp,
    error = "Record not found",
    syncDfd = $.Deferred && $.Deferred(); //If $ is having Deferred - use it.

  // Backwards compatibility with Backbone <= 0.3.3
  if (typeof options == 'function') {
    options = {
      success: options,
      error: error
    };
  }

  try {

    switch (method) {
      case "read":    resp = model.id != undefined ? store.find(model) : store.findAll(); break;
      case "create":  resp = store.create(model);                            break;
      case "update":  resp = store.update(model);                            break;
      case "delete":  resp = store.destroy(model);                           break;
    }

  } catch (e) { error = e; }

  if (resp) {
    options.success(resp);
    if (syncDfd) {
      syncDfd.resolve();
    }
  } else {
    options.error("Record not found");
    if (syncDfd) {
      syncDfd.reject();
    }
  }

  return syncDfd && syncDfd.promise();
};

// Our Store is represented by a single JS object in *sessionStorage*. Create it
// with a meaningful name, like the name you'd give a table.
// window.Store is deprectated, use Backbone.SessionStorage instead
Backbone.SessionStorage = window.SessionStore = function(name) {
  this.name = name;
  var store = this.sessionStorage().getItem(this.name) || "";
  this.records = (store && store.split(",")) || [];
};

_.extend(Backbone.SessionStorage.prototype, {

  // Save the current state of the **Store** to *sessionStorage*.
  save: function() {
    this.sessionStorage().setItem(this.name, this.records.join(","));
  },

  // Fetches an item from local storage and returns an empty object if it doesn't exist
  // cf. https://github.com/leaguevine/leaguevine-ultistats/commit/056e01512083fb27d5a4d67c4c733e0f57fc59ff
  safeGet: function(name) { 
    var obj = this.sessionStorage().getItem(name); 
    if (!obj) {
      return '{}';
    }
    return obj;
  },

  // Add a model, giving it a (hopefully)-unique GUID, if it doesn't already
  // have an id of it's own.
  create: function(model) {
    if (!model.id) {
        model.id = guid();
        model.set(model.idAttribute, model.id);
    }
    this.sessionStorage().setItem(this.name+"-"+model.id, JSON.stringify(model));
    this.records.push(model.id.toString());
    this.save();
    return model.toJSON();
  },

  // Update a model by replacing its copy in `this.data`.
  update: function(model) {
    this.sessionStorage().setItem(this.name+"-"+model.id, JSON.stringify(model));
    if (!_.include(this.records, model.id.toString())) this.records.push(model.id.toString()); this.save();
    return model.toJSON();
  },

  // Retrieve a model from `this.data` by id.
  find: function(model) {
    return JSON.parse(this.safeGet(this.name+"-"+model.id));
  },

  // Return the array of all models currently in storage.
  findAll: function() {
    return _(this.records).chain()
        .map(function(id){
          var obj = JSON.parse(this.safeGet(this.name+"-"+id));
          return _.isEmpty(obj) ? false : obj;
        }, this)
        .compact()
        .value();
  },

  // Delete a model from `this.data`, returning it.
  destroy: function(model) {
    this.sessionStorage().removeItem(this.name+"-"+model.id);
    this.records = _.reject(this.records, function(record_id){return record_id == model.id.toString();});
    this.save();
    return model;
  },

  sessionStorage: function() {
    var storage;

    if (window.privateLocalStorage) {
      storage = window.privateSessionStorage;
    } else {
      storage = sessionStorage;
    }
    
    return storage;
  }

});

// sessionSync delegate to the model or collection's
// *sessionStorage* property, which should be an instance of `SessionStore`.
Backbone.SessionStorage.sync = Backbone.sessionSync = function(method, model, options, error) {
  var store = model.sessionStorage || model.collection.sessionStorage,
    resp,
    error = "Record not found",
    syncDfd = $.Deferred && $.Deferred(); //If $ is having Deferred - use it.

  // Backwards compatibility with Backbone <= 0.3.3
  if (typeof options == 'function') {
    options = {
      success: options,
      error: error
    };
  }

  try {

    switch (method) {
      case "read":    resp = model.id != undefined ? store.find(model) : store.findAll(); break;
      case "create":  resp = store.create(model);                            break;
      case "update":  resp = store.update(model);                            break;
      case "delete":  resp = store.destroy(model);                           break;
    }

  } catch (e) { error = e; }

  if (resp) {
    options.success(resp);
    if (syncDfd) syncDfd.resolve();
  } else {
    options.error(error);
    if (syncDfd) syncDfd.reject();
  }

  return syncDfd && syncDfd.promise();
};

Backbone.ajaxSync = Backbone.sync;

Backbone.getSyncMethod = function(model) {
  if(model.localStorage || (model.collection && model.collection.localStorage))
  {
    return Backbone.LocalStorage.sync;
  }
  if(model.sessionStorage || (model.collection && model.collection.sessionStorage))
  {
    return Backbone.SessionStorage.sync;
  }

  return Backbone.ajaxSync;
};

// Override 'Backbone.sync' to default to localSync,
// the original 'Backbone.sync' is still available in 'Backbone.ajaxSync'
Backbone.sync = function(method, model, options, error) {
  return Backbone.getSyncMethod(model).apply(this, [method, model, options, error]);
};

})();
