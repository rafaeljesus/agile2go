describe('App.Views.UserSessionsNew', function(){

  var view
  , model
  , $el
  , e;

  beforeEach(function(){
    var current_user = new App.Models.CurrentUser({});
    view = new App.Views.UserSessionsNew({ current_user: current_user });
    model = view.model;
    $el = $(view.render().el);
    e = new Event(undefined);
  });

  it('should render sign in form', function(){
    expect($el).toHaveText(/Sign In/);
  });

  it('should authenticate user', function(){
    spyOn(model, 'save');
    view.$('#email').val('fake@email.com');
    view.$('#password').val('passwordFake');
    view.authenticate(e);
    expect(model.save).toHaveBeenCalled();
  });

  it('should not authenticate if sign in form is blank', function(){
    spyOn(model, 'save');
    spyOn(view, 'formValidationError');
    view.$('#email').val('');
    view.$('#password').val('');
    view.authenticate(e);
    expect(model.save).not.toHaveBeenCalled();
    expect(view.formValidationError).toHaveBeenCalled();
  });

  it('should not authenticate if email are blank', function(){
    spyOn(model, 'save');
    spyOn(view, 'formValidationError');
    view.$('#email').val('');
    view.$('#password').val('12345678');
    view.authenticate(e);
    expect(model.save).not.toHaveBeenCalled();
    expect(view.formValidationError).toHaveBeenCalled();
  });

  it('should not authenticate if password are blank', function(){
    spyOn(model, 'save');
    spyOn(view, 'formValidationError');
    view.$('#email').val('fake@email.com');
    view.$('#password').val('');
    view.authenticate(e);
    expect(model.save).not.toHaveBeenCalled();
    expect(view.formValidationError).toHaveBeenCalled();
  });

});
