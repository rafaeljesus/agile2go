class UserSessionsController < ApplicationController
  respond_to :json, :html

  def new
    @session = UserSession.new(session)
  end

  def create
    @session = UserSession.new(session, params[:user_session])
    flash[:notice] = 'You successfully signed in' if @session.authenticate
    respond_with @session, location: root_path
  end

  def destroy
    flash[:notice] = 'You successfully signed out' if user_session.destroy
    respond_with user_session, location: root_path
  end
end
