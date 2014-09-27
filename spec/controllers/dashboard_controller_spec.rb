require 'spec_helper'

describe DashboardController, type: :controller do

  it "should return a json for dashboard" do
    FactoryGirl.create(:task)
    xhr :get, :index
    expect(response).to be_success
  end

end
