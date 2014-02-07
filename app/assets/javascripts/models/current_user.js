App.Models.CurrentUser = Backbone.Model.extend({
  urlRoot: 'current_user',

  initialize: function(){
    this.on('change', this.setSession, this);
    this.attributes = this.getSession();
    this._fetch();
  },

  defaults: {
    signed_in: false
  },

  setSession: function(){
    sessionStorage.setItem('currentUser', JSON.stringify(this.toJSON()));
  },

  getSession: function(){
    return JSON.parse(sessionStorage.getItem('currentUser')) || {};
  },

  removeSession: function(){
    sessionStorage.removeItem('currentUser');
  },

  signedIn: function(){
    return this.get('signed_in');
  },

  name: function(){
    this.get('name');
  },

  email: function(){
   this.get('email');
  },

  _fetch: function(){
    if(!this.signedIn()) this.fetch();
  }

});
