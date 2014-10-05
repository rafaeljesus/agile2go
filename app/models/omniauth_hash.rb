class OmniauthHash

  def initialize(hash)
    @hash = hash
    @user = User.new
  end

  def to_user
    @user.provider = @hash[:provider]
    @user.uid = @hash[:uid]
    @user.first_name = get_first_name
    @user.last_name = get_last_name
    @user.email = @hash[:info][:email]
    @user.avatar = get_image
    @user.oauth_token = @hash[:credentials][:token]
    @user
  end

  private
  def get_last_name
    return @hash[:info][:last_name] if @hash[:info][:last_name]
    @hash[:info][:name].split(' ')[1]
  end

  def get_first_name
    return @hash[:info][:first_name] if @hash[:info][:first_name]
    @hash[:info][:name].split(' ')[0]
  end

  def get_image
    return @hash[:info][:image] unless @hash[:provider] == 'github'
    @hash[:extra][:raw_info][:avatar_url]
  end

end
