class UserSessionsController < ApplicationController
  before_filter authorize: [:destroy]
  respond_to :json, :html

  def new
    @session = UserSession.new(session)
  end

  def create
    @session = UserSession.new(session, params[:user_session])
    @session.authenticate
    respond_with @session, location: root_path
  end

  def destroy
    user_session.destroy
    respond_with user_session, location: root_path
  end
end
