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
    @omniauth[:uid] = @omniauth[:uid].to_s
    User.where(@omniauth.slice(:provider, :uid)).first || create_from_omniauth
  end

  def create_from_omniauth
    User.create! do |user|
      user.provider = @omniauth[:provider]
      user.uid = @omniauth[:uid]
      user.first_name = @omniauth[:info][:first_name]
      user.last_name = @omniauth[:info][:last_name]
      user.email = @omniauth[:info][:email]
      user.avatar = parse_image
      user.oauth_token = @omniauth[:credentials][:token]
    end
  end

  def parse_image
    return @omniauth[:info][:image] unless @omniauth[:provider] == 'github'
    @omniauth[:extra][:raw_info][:avatar_url]
  end

end
