class CurrentUserController < ApplicationController
  respond_to :json

  def index
    respond_with data
  end

  private
  def data
    json = { signed_in:  user_signed_in? }
    if !current_user.nil?
      json[:name] = current_user.name,
      json[:email] =  current_user.email
    end
    json
  end
end
