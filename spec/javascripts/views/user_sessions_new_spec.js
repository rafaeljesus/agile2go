describe('App.Views.UserSessionsNew', function(){

  var view
  , model
  , server
  , $el
  , currentUserMock = {
      signed_in: true,
      user_id: "54459dcc793f7605f0000005",
      provider: "twitter",
      avatar: "http://pbs.twimg.com/profile_images/448956860473675777/S0iOEF00_normal.jpeg"
    }
  , e;

  beforeEach(function() {
    current_user = currentUserMock;
    server = sinon.fakeServer.create();
    server.respondWith('GET', '/current_user/1', [
      200,
      {"Content-Type": "application/json"},
      JSON.stringify(current_user)
    ]);
    var current_user = new App.Models.CurrentUser();
    view = new App.Views.UserSessionsNew({ current_user: current_user });
    model = view.model;
    $el = $(view.render().el);
    e = document.createEvent('KeyboardEvent');
  });

  afterEach(function(){
    server.restore();
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
    view.$('#email').val('');
    view.$('#password').val('');
    view.authenticate(e);
    expect(model.save).toHaveBeenCalled();
    expect(model.isValid()).toBeFalsy();
  });

  it('should not authenticate if email are blank', function(){
    spyOn(model, 'save');
    view.$('#email').val('');
    view.$('#password').val('12345678');
    view.authenticate(e);
    expect(model.save).toHaveBeenCalled();
    expect(model.isValid()).toBeFalsy();
  });

  it('should not authenticate if password are blank', function(){
    spyOn(model, 'save');
    view.$('#email').val('fake@email.com');
    view.$('#password').val('');
    view.authenticate(e);
    expect(model.save).toHaveBeenCalled();
    expect(model.isValid()).toBeFalsy();
  });

});
