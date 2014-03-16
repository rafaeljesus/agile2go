describe('App.Views.UserRegistrations', function(){
  var view
  , $el
  , model
  , e;

  describe('When create a new account', function(){
    beforeEach(function(){
      var current_user = new App.Models.CurrentUser({});
      view = new App.Views.UserRegistrations({});
      model = view.model;
      $el = $(view.render().el);
      e = new Event(undefined);
    });

    it('should render sign up form', function(){
      expect($el).toHaveText(/Sign Up/);
    });

    it('should create a new user', function(){
      spyOn(model, 'save');
      view.$('#name').val('User Fake');
      view.$('#email').val('fake@email.com');
      view.$('#password').val('passwordFake');
      view.$('#password-confirmation').val('passwordFake');
      view.save(e);
      expect(model.save).toHaveBeenCalled();
    });

    it('should not create a new user if sign up form is blank', function(){
      spyOn(model, 'save');
      view.$('#name').val('');
      view.$('#email').val('');
      view.$('#password').val('');
      view.$('#password-confirmation').val('');
      view.save(e);
      expect(model.save).not.toHaveBeenCalled();
      expect(model.isValid()).toBeFalsy();
    });
  });

  describe('When edit a existing account', function(){
    beforeEach(function(){
      var current_user = new App.Models.CurrentUser({ id: 1, name: 'fakeName', email: 'fakeEmail' });
      var model = new App.Models.UserRegistration({ user: { id: 1, name: 'fakeName', email: 'fakeEmail' } }, { parse: true });
      var dependencies = { model: model, current_user: current_user };
      view = new App.Views.UserRegistrations(dependencies);
      model = view.model;
      $el = $(view.render().el);
      e = new Event(undefined);
    });

    it('should render edit account form', function(){
      expect($el).toHaveText(/Edit Account/);
    });

    it('should name and email fields be disabled', function(){
      expect($el.find('#name')).toBeDisabled();
      expect($el.find('#email')).toBeDisabled();
    });
  });

});
