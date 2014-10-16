class DashboardController < ApplicationController
  respond_to :json

  def index
    respond_with Dashboard.all
  end

end
