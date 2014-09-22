require 'spec_helper'

feature 'generate dashboard' do

  before(:each) { sign_in }
  after(:each) { logout }

  subject(:task) { FactoryGirl.create :task }

  scenario 'when I am logged in and visit home page, I see the dashboard', js: true do
    visit '#'
    expect(page).to have_content 'Dashboard'
  end
end
