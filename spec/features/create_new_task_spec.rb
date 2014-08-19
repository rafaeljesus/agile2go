require 'spec_helper'

feature 'when create a new task' do
  scenario 'with all filled corrected filled', js: true do
    sign_in
    create_task
    expect(page).to have_content 'has a new version'
  end

  scenario 'with title blank', js: true do
    sign_in
    new_task = FactoryGirl.build :task, title: ''
    create_task_as new_task
    expect(page).to have_content "CAN'T BE BLANK"
  end

  scenario 'with story blank', js: true do
    sign_in
    new_task = FactoryGirl.build :task, story: ''
    create_task_as new_task
    expect(page).to have_content "CAN'T BE BLANK"
  end

  scenario 'with sprint_id blank', js: true do
  end

end
