require 'bcrypt'
class User
  include MongoMapper::Document
  include BCrypt

  EMAIL_REGEX = /\A[^@]+@([^@\.]+\.)+[^@\.]+\z/

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

  many :projects

  validate :password_length

  def as_json(options = {})
    super(options.merge(except: [crypted_password]))
  end

  def omniauth_user?
    !uid.nil? && !provider.nil?
  end

  def password_length
    return if omniauth_user? || password.length >= 8
    errors.add(:password, 'password must be greather then 8')
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
