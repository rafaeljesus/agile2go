describe('App.Models.CurrentUser#initialize', function(){

  var currentUser, server;

  beforeEach(function(){
    server = sinon.fakeServer.create();
    server.respondWith("GET", "/current_user/12345", [ 200, {"Content-Type": "application/json"}, '[{ "name": "fakeUser" }]' ]);
    currentUser = new App.Models.CurrentUser({});
  });

  afterEach(function(){
    currentUser.removeSession();
    server.restore();
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
