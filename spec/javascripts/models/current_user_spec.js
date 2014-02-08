describe('App.Models.CurrentUser#initialize', function(){

  var currentUser;

  beforeEach(function(){
    currentUser = new App.Models.CurrentUser({});
  });

  afterEach(function(){
    currentUser.removeSession();
  });

  it('should not be signed in', function(){
    expect(currentUser.signedIn()).toBeFalsy();
  });

  it('should set user in session when any attribute changes ', function(){
    spyOn(currentUser, 'setSession');
    currentUser.constructor({}, {});
    currentUser.set({ signed_in: true });
    expect(currentUser.setSession).toHaveBeenCalled();
  });

  it('should call _fetch method', function(){
    spyOn(currentUser, '_fetch');
    currentUser.constructor({}, {});
    expect(currentUser._fetch).toHaveBeenCalled();
  });

});
