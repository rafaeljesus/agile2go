require 'bcrypt'

class User
  include MongoMapper::Document
  include BCrypt

  EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i

  key :first_name, String, required: true
  key :last_name, String, required: true
  key :email, String, required: true, unique: true, format: EMAIL_REGEX
  key :crypted_password, String
  key :provider, String
  key :uid, String
  key :avatar, String
  key :oauth_token, String
  key :oauth_expires_at, Time
  timestamps!

  validate :password_length

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

  def password_length
    if password.length < 6
      errors.add(:password, 'password must be greather then 6')
    end
  end

  def password
    return nil unless crypted_password.present?
    @password ||= Password.new(crypted_password)
  end

  def password=(value)
    return unless value.present?
    @password = value
    self.crypted_password = Password.create(value)
  end

end
