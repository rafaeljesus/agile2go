require 'spec_helper'

feature 'when create a new sprint' do

  before(:each) { sign_in }
  after(:each) { logout }

  # pending 'sprint created_at and updated_at not working'
  # scenario 'with all filled corrected filled', js: true do
  #   create_sprint
  #   sleep 0.5
  #   expect(page).to have_content I18n.t('flash.actions.create.notice', model: 'Sprint')
  # end

  scenario 'with name blank', js: true do
    new_sprint = FactoryGirl.build :sprint, name: ''
    create_sprint_as new_sprint
    expect(page).to have_content "CAN'T BE BLANK"
  end

  scenario 'with points blank', js: true do
    new_sprint = FactoryGirl.build :sprint, points: ''
    create_sprint_as new_sprint
    expect(page).to have_content "CAN'T BE BLANK"
  end

  scenario 'with start_date blank', js: true do
    new_sprint = FactoryGirl.build :sprint, start_date: ''
    create_sprint_as new_sprint
    expect(page).to have_content "CAN'T BE BLANK"
  end

  scenario 'with end_date blank', js: true do
    new_sprint = FactoryGirl.build :sprint, end_date: ''
    create_sprint_as new_sprint
    expect(page).to have_content "CAN'T BE BLANK"
  end

  scenario 'with project_id blank', js: true do
  end

end
