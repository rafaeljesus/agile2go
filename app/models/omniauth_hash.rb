class OmniauthHash

  def initialize(hash)
    @hash = hash
    @user = User.new
  end

  def to_user
    @user.provider = @hash[:provider]
    @user.uid = @hash[:uid]
    @user.first_name = find_name(:first_name, 0)
    @user.last_name = find_name(:last_name, 1)
    @user.email = @hash[:info][:email]
    @user.avatar = get_image
    @user.oauth_token = @hash[:credentials][:token]
    @user
  end

  private
  def find_name(attr, position)
    return @hash[:info][attr] if @hash[:info][attr]
    @hash[:info][:name].split(' ')[position]
  end

  def get_image
    return @hash[:info][:image] unless @hash[:provider] == 'github'
    @hash[:extra][:raw_info][:avatar_url]
  end

end
