require 'spec_helper'
require 'json'

describe DashboardController, type: :controller do

  before do
    attributes = { project_name: 'Fake Name' }
    Dashboard.create(attributes)
  end

  it 'should return a json for dashboard' do
    xhr :get, :index
    json = JSON.parse(response.body)[0]
    expect(json).to include({
      "project_name" => "Fake Name",
      "todo_count" => 0,
      "ongoing_count" => 0,
      "test_count" => 0,
      "done_count" => 0
    })
  end

end
