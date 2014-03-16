require 'spec_helper'

feature 'when create a new project' do
  scenario 'with all filled corrected filled', js: true do
    current_user = sign_in
    create_project current_user
    expect(page).to have_content I18n.t('flash.actions.create.notice', model: 'Project')
  end

  scenario 'with name blank', js: true do
    current_user = sign_in
    new_project = FactoryGirl.build :project, name: ''
    create_project_as new_project, current_user
    expect(page).to have_content "CAN'T BE BLANK"
  end

  scenario 'with company blank', js: true do
    current_user = sign_in
    new_project = FactoryGirl.build :project, company: ''
    create_project_as new_project, current_user
    expect(page).to have_content "CAN'T BE BLANK"
  end

  scenario 'with description blank', js: true do
    current_user = sign_in
    new_project = FactoryGirl.build :project, description: ''
    create_project_as new_project, current_user
    expect(page).to have_content "CAN'T BE BLANK"
  end

end
