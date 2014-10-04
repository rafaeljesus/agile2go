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
    request.env['omniauth.auth'] = omniauth_hash
    xhr :post, :create_with_omniauth, omniauth_hash
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

  def omniauth_hash
    {
      info: {
        first_name: 'user omniauth test',
        last_name: 'user omniauth test',
        email: 'user@omniauth.com',
        image: 'some_image_hash'
      },
      credentials: {
        token: '12345678987654321'
      },
      provider: 'twitter',
      uid: '100'
    }
  end

end
