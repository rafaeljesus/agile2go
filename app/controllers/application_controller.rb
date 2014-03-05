class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  delegate :current_user, :user_signed_in?, to: :user_session
  helper_method :current_user, :user_signed_in?, :user_session

  def user_session
    UserSession.new(session)
  end
end
