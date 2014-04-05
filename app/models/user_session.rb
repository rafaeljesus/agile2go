class UserSession
  include ActiveModel::Validations
  include ActiveModel::Conversion

  extend ActiveModel::Translation
  extend ActiveModel::Naming

  validates :email, presence: true, format: { with: /\A[^@]+@([^@\.]+\.)+[^@\.]+\z/ }
  validates :password, length: { minimum: 8, too_short: "%{count} is the minimum allowed" }

  def initialize(session)
    @session = session
  end

  def authenticate(options={})
    user = User.authenticate(options[:email], options[:password])
    if user.present?
      store(user)
    else
      errors.add(:base, :invalid_login)
      false
    end
  end

  def authenticate_from_omniauth(omniauth_hash)
    user = User.from_omniauth(omniauth_hash)
    if user.present?
      store(user)
    else
      errors.add(:base, :invalid_login)
      false
    end
  end

  def store(user)
    @session[:user_id] = user.id
  end

  def persisted?
    false
  end

  def current_user
    return nil if @session[:user_id].nil?
    User.find(@session[:user_id])
  end

  def user_signed_in?
    @session[:user_id].present?
  end

  def destroy
    @session[:user_id] = nil
  end
end
