class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  delegate :current_user, :user_signed_in?, to: :user_session
  helper_method :current_user, :user_signed_in?

  def user_session
    UserSession.new(session)
  end

  def authorize
    redirect_to new_user_sessions_path unless user_signed_in?
  end

  # def default_serializer_options
  #   {root: false}
  # end
end
