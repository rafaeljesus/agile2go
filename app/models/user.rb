require 'bcrypt'
class User
  include MongoMapper::Document
  include BCrypt

  EMAIL_REGEX = /\A[^@]+@([^@\.]+\.)+[^@\.]+\z/

  key :first_name, String, required: true
  key :last_name, String
  key :email, String, unique: true
  key :crypted_password, String
  key :provider, String
  key :uid, String
  key :avatar, String
  key :oauth_token, String
  key :oauth_expires_at, Time
  timestamps!

  validates_confirmation_of :password, if: :password_present?
  validates_presence_of :password, on: :create, unless: :omniauth_user?
  validates_presence_of :email, on: :create, unless: :omniauth_user?
  validate :password_length, unless: :omniauth_user?

  def as_json(options = {})
    super(options.merge(except: [:crypted_password, :oauth_token]))
  end

  def omniauth_user?
    !uid.nil? && !provider.nil?
  end

  def password_length
    if password && password.length < 8
      errors.add(:password, 'password must be greather then 8')
    end
  end

  def password_present?
    !password.nil?
  end

  def password
    return nil unless self.crypted_password.present?
    @password ||= Password.new(crypted_password)
  end

  def password=(value)
    return unless value.present?
    @password = value
    self.crypted_password = Password.create(value)
  end

end
