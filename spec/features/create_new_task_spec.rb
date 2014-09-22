require 'spec_helper'

feature 'when create a new task' do

  before(:each) { sign_in }
  after(:each) { logout }

  scenario 'with all filled corrected filled', js: true do
    create_task
    expect(page).to have_content 'todo'
  end

  scenario 'with title blank', js: true do
    new_task = FactoryGirl.build :task, title: ''
    create_task_as new_task
    expect(page).to have_content "CAN'T BE BLANK"
  end

  scenario 'with story blank', js: true do
    new_task = FactoryGirl.build :task, story: ''
    create_task_as new_task
    expect(page).to have_content "CAN'T BE BLANK"
  end

end
