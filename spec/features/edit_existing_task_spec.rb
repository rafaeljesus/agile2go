require 'spec_helper'

feature 'when edit existing task' do

  before(:each) { @current_user = sign_in }
  after(:each) { logout }

  scenario 'when I change the task title', js: true do
    task = FactoryGirl.create :task
    update_task task
    expect(page).to have_content 'has a new version'
  end
end
