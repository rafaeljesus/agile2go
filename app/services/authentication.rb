class Authentication

  def initialize(omniauth = nil, options)
    @omniauth = omniauth
    @email = options[:email]
    @password = options[:password]
  end

  def user
    @user ||= @omniauth ? authenticate_from_omniauth : authenticate
  end

  private
  def authenticate
    user = User.find_by_email(@email)
    user && user.password == @password ? user : nil
  end

  def authenticate_from_omniauth
    @omniauth['uid'] = @omniauth['uid'].to_s
    User.where(@omniauth.slice('provider', 'uid')).first || create_from_omniauth
  end

  def create_from_omniauth
    user = OmniauthHash.new(@omniauth).to_user
    user.save!
    user
  end

end
