require 'spec_helper'

feature 'generate dashboard' do
  scenario 'when I am logged in and visit home page, I see the dashboard', js: true do
    sign_in
    task = FactoryGirl.create :task
    visit '#'
    expect(page).to have_content task.sprint.project.name
    expect(page).to have_content 'Dashboard'
  end
end
