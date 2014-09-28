class User
  include MongoMapper::Document

  key :name, String
  key :email, String
  key :password_digest, String
  key :provider, String
  key :uid, String
  key :avatar, String
  key :oauth_token, String
  key :oauth_expires_at, Time
  timestamps!

  def self.authenticate(email, password)
    find_by(email: email).try(:authenticate, password)
  end

  def self.from_omniauth(auth)
    auth['uid'] = auth['uid'].to_s
    where(auth.slice(:provider, :uid)).first || create_from_omniauth(auth)
  end

  def self.create_from_omniauth(auth)
    create! do |user|
      user.provider = auth[:provider]
      user.uid = auth[:uid]
      user.name = auth[:info][:name]
      user.email = auth[:info][:email]
      user.avatar = parse_image(auth)
      user.oauth_token = auth[:credentials][:token]
    end
  end

  def self.parse_image(auth)
    return auth[:info][:image] unless auth[:provider] == 'github'
    auth[:extra][:raw_info][:avatar_url]
  end

  def omniauth_user?
    !uid.nil? && !provider.nil?
  end

end
