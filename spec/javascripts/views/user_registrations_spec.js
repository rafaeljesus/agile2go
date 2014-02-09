describe('App.Views.UserRegistrations', function(){
  var view
  , $el
  , model
  , e;

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
    spyOn(view, 'formValidationError');
    view.$('#name').val('');
    view.$('#email').val('');
    view.$('#password').val('');
    view.$('#password-confirmation').val('');
    view.save(e);
    expect(model.save).not.toHaveBeenCalled();
    expect(view.formValidationError).toHaveBeenCalled();
  });

});
