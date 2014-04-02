class UserSessionsController < ApplicationController
  before_filter authorize: [:destroy]
  respond_to :json

  def create
    @session = UserSession.new(session, params[:user_session])
    @session.authenticate
    respond_with @session
  end

  def create_from_omniauth
    user = User.from_omniauth(request.env['omniauth.auth'])
    session[:user_id] = user.id
    redirect_to '#dashboad'
  end

  def destroy
    user_session.destroy
    respond_with user_session
  end
end
