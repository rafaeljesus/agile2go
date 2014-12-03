App.Models.CurrentUser = Backbone.Model.extend({
  urlRoot: 'current_user',

  initialize: function() {
    this.on('change', this.setSession, this);
    var userFromSession = this.getSession();
    if (userFromSession) this.attributes = userFromSession;
    this._fetch();
  },

  defaults: {
    signed_in: false
  },

  setSession: function() {
    sessionStorage.setItem('currentUser', JSON.stringify(this.toJSON()));
  },

  getSession: function() {
    return JSON.parse(sessionStorage.getItem('currentUser'));
  },

  removeSession: function() {
    sessionStorage.removeItem('currentUser');
  },

  signedIn: function() {
    return this.get('signed_in');
  },

  signedInWithFacebook: function() {
    if (!this.provider) return false;
    if (this.provider() == 'facebook') return true;
  },

  provider: function() {
    return this.get('provider');
  },

  name: function() {
    return this.get('name');
  },

  email: function() {
   return this.get('email');
  },

  _fetch: function() {
    if (this.signedIn()) return;
    this.fetch();
  }

});
