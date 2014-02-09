describe('App.Views.UserSessionsNew', function(){

  var current_user
  , view
  , model
  , $el;

  beforeEach(function(){
    current_user = new App.Models.CurrentUser({});
    view = new App.Views.UserSessionsNew({ current_user: current_user });
    model = view.model;
    $el = $(view.render().el);
  });

  it('should render form sign in', function(){
    expect($el).toHaveText(/Email/);
    expect($el).toHaveText(/Password/);
  });

  it('should authenticate user', function(){
    spyOn(model, 'save');
    view.$('#email').val('fake@email.com');
    view.$('#password').val('passwordFake');
    view.authenticate(new Event(undefined));
    expect(model.save).toHaveBeenCalled();
  });

  it('should not authenticate if email/password are blank', function(){
    spyOn(model, 'save');
    spyOn(view, 'formValidationError');
    view.$('#email').val('');
    view.$('#password').val('');
    view.authenticate(new Event(undefined));
    expect(model.save).not.toHaveBeenCalled();
    expect(view.formValidationError).toHaveBeenCalled();
  });

  it('should not authenticate if email are blank', function(){
    spyOn(model, 'save');
    spyOn(view, 'formValidationError');
    view.$('#email').val('');
    view.$('#password').val('12345678');
    view.authenticate(new Event(undefined));
    expect(model.save).not.toHaveBeenCalled();
    expect(view.formValidationError).toHaveBeenCalled();
  });

  it('should not authenticate if password are blank', function(){
    spyOn(model, 'save');
    spyOn(view, 'formValidationError');
    view.$('#email').val('fake@email.com');
    view.$('#password').val('');
    view.authenticate(new Event(undefined));
    expect(model.save).not.toHaveBeenCalled();
    expect(view.formValidationError).toHaveBeenCalled();
  });

});
