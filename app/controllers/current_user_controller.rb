class CurrentUserController < ApplicationController
  respond_to :json

  def index
    respond_with CurrentUser.new(current_user, user_signed_in?)
  end
end
