require 'spec_helper'

describe UserSession do

  it { expect(UserSession).to include(ActiveModel::Validations) }
  it { expect(UserSession).to include(ActiveModel::Conversion) }

  it 'when valid credentials then authenticate' do
    user = FactoryGirl.create(:user)
    options = { email: user.email, password: user.password }
    @session = UserSession.new({})
    @session.authenticate(options)
    expect(@session.user_signed_in?).to be_truthy
  end

  it 'when invalid email then authentication failed' do
    user = FactoryGirl.create(:user)
    options = { email: 'bla.user@bla', password: user.password }
    @session = UserSession.new({})
    @session.authenticate(options)
    expect(@session.user_signed_in?).to be_falsy
  end

  it 'when valid omniauth credentials then authenticate' do
    @session = UserSession.new({})
    @session.authenticate_with_omniauth(omniauth_hash)
    expect(@session.user_signed_in?).to be_truthy
  end

  it 'when user already logged in then destroy session' do
    @session = UserSession.new({})
    @session.authenticate_with_omniauth(omniauth_hash)
    @session.destroy
    expect(@session.user_signed_in?).to be_falsy
  end

  it 'when user already logged in then get current user' do
    @session = UserSession.new({})
    @session.authenticate_with_omniauth(omniauth_hash)
    current_user = @session.current_user
    expect(current_user).not_to be_nil
  end

  def omniauth_hash
    {
      info: {
        name: 'user omniauth test',
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
