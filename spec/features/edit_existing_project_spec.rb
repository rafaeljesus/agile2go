require 'spec_helper'

feature 'when edit existing project' do
  scenario 'when I change the project name', js: true do
    current_user = sign_in
    project = FactoryGirl.create :project
    update_project project, current_user
    expect(page).to have_content I18n.t('flash.actions.create.notice', model: 'Project')
  end
end
