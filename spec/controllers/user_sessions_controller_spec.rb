require 'spec_helper'

describe UserSessionsController, type: :controller do

  it "should create new session for user" do
    user = FactoryGirl.create(:user)
    hash = {
      user_session: {
        email: user.email,
        password: user.password
      }
    }
    xhr :post, :create, hash
    expect(response).to be_success
  end

  it "should create new session and user from oauth" do
    user = FactoryGirl.create(:user)
    json = File.read("spec/fixtures/omniauth_hash.json")
    hash = JSON.parse(json)
    request.env['omniauth.auth'] = hash
    xhr :post, :create_with_omniauth, hash
    expect(response).to be_success
  end

  it "should destroy a session from user" do
    xhr :delete, :destroy
    expect(response).to be_success
  end

  it "should check if a user is already signed in" do
    xhr :get, :check
    expect(response).to be_success
  end

end
