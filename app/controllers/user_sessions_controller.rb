class UserSessionsController < ApplicationController
  before_filter authorize: [:destroy]
  respond_to :json

  def create
    @session = UserSession.new(session)
    @session.authenticate(params[:user_session])
    respond_with @session
  end

  def create_with_omniauth
    @session = UserSession.new(session)
    @session.from_omniauth(omniauth_hash)
    if cookies[:oauth_popup]
      cookies[:oauth_popup] = nil
      return render 'layouts/oauth_popup_close', layout: false
    else
      render json: user_json
    end
  end

  def destroy
    user_session.destroy
    respond_with user_session
  end

  def check
    if user_signed_in?
      session[:oauth_popup] = nil
      respond_with user_json
    else
      respond_with {}
    end
  end

  def user_json
    {
      signed_in: true,
      user_id: current_user.id,
      provider: current_user.provider,
      avatar: current_user.avatar
    }
  end

  private
  def omniauth_hash
    request.env['omniauth.auth']
  end

end
