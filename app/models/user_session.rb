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

  def authenticate(credentials = {})
    auth = Authentication.new(nil, credentials)
    store(auth.user)
  end

  def from_omniauth(omniauth)
    auth = Authentication.new(omniauth, {})
    store(auth.user)
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

  private
  def store(user)
    if user.present?
      @session[:user_id] = user.id
    else
      errors.add(:base, :invalid_login)
      false
    end
  end
end
