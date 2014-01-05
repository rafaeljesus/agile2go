class UserSessionsController < ApplicationController
  respond_to :json, :html

  def new
    @session = UserSession.new(session)
  end

  def create
    @session = UserSession.new(session, params[:user_session])
    @session.authenticate
    respond_with @session, location: '/#'
  end

  def destroy
    user_session.destroy
    respond_with user_session, location: '/'
  end
end
