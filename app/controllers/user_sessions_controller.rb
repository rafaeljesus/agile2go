class UserSessionsController < ApplicationController
  before_filter authorize: [:destroy]
  respond_to :json

  def create
    @session = UserSession.new(session)
    @session.authenticate(params[:user_session])
    respond_with @session
  end

  def create_from_omniauth
    @session = UserSession.new(session)
    @session.authenticate_from_omniauth(omniauth_hash)
    if cookies[:twitter_oauth_popup]
      cookies[:twitter_oauth_popup] = nil
      return render 'layouts/twitter_popup_close', layout: false
    else
      respond_with signed_in: true, user_id: current_user.id, provider: current_user.provider
    end
  end

  def check
    if user_signed_in?
      session[:twitter_omniauth] = nil
      session[:twitter_oauth_popup] = nil
      respond_with signed_in: true, user_id: current_user.id, provider: current_user.provider
    else
      respond_with {}
    end
  end

  def destroy
    user_session.destroy
    respond_with user_session
  end

  private
  def omniauth_hash
    request.env['omniauth.auth']
  end

end
