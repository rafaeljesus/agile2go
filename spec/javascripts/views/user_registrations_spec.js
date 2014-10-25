describe('App.Views.UserRegistrations', function() {

  var view
  , $el
  , model
  , server
  , currentUserMock = {
      signed_in: true,
      user_id: "54459dcc793f7605f0000005",
      provider: "twitter",
      avatar: "http://pbs.twimg.com/profile_images/448956860473675777/S0iOEF00_normal.jpeg"
    }
  , e;

  describe('When create a new account', function() {

    beforeEach(function() {
      current_user = currentUserMock;
      server = sinon.fakeServer.create();
      server.respondWith("GET", "/current_user/12345", [
        200,
        {"Content-Type": "application/json"},
        JSON.stringify(current_user)
      ]);
      var current_user = new App.Models.CurrentUser();
      view = new App.Views.UserRegistrations({ current_user: current_user });
      model = view.model;
      $el = $(view.render().el);
      e = document.createEvent('KeyboardEvent');
    });

    afterEach(function() {
      server.restore();
    });

    it('should render sign up form', function() {
      expect($el).toHaveText(/Sign Up/);
    });

    it('should create a new user', function() {
      spyOn(model, 'save');
      view.$('#first-name').val('First Fake');
      view.$('#last-name').val('Last Fake');
      view.$('#email').val('fake@email.com');
      view.$('#password').val('passwordFake');
      view.save(e);
      expect(model.save).toHaveBeenCalled();
    });

    it('should not create a new user if sign up form is blank', function() {
      spyOn(model, 'save');
      view.$('#first-name').val('');
      view.$('#last-name').val('');
      view.$('#email').val('');
      view.$('#password').val('');
      view.save(e);
      expect(model.save).toHaveBeenCalled();
      expect(model.isValid()).toBeFalsy();
    });
  });

  describe('When edit a existing account', function() {

    beforeEach(function() {
      current_user = currentUserMock;
      server = sinon.fakeServer.create();
      server.respondWith("GET", "/current_user/12345", [
        200,
        {"Content-Type": "application/json"},
        JSON.stringify(current_user)
      ]);
      var current_user = new App.Models.CurrentUser(current_user);
      var model = new App.Models.UserRegistration({ user: { id: 1, first_name: 'first fake', last_name: 'last fake', email: 'fakeEmail' } }, { parse: true });
      var options = { model: model, current_user: current_user };
      view = new App.Views.UserRegistrations(options);
      model = view.model;
      $el = $(view.render().el);
      e = document.createEvent('KeyboardEvent');
    });

    afterEach(function() {
      server.restore();
    });

    it('should render edit account form', function() {
      expect($el).toHaveText(/Edit Account/);
    });

    it('should name and email fields be disabled', function() {
      expect($el.find('#first-name')).toBeDisabled();
      expect($el.find('#email')).toBeDisabled();
    });
  });

});
