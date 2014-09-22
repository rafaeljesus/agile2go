class DashboardController < ApplicationController
  respond_to :json

  def index
    respond_with DashboardQuery.new.to_json
  end

end
