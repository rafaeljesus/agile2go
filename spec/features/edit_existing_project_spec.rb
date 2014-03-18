require 'spec_helper'

feature 'when edit existing project' do
  scenario 'when I change the project name', js: true do
    sign_in
    project = FactoryGirl.create :project
    update_project project
    expect(page).to have_content I18n.t('flash.actions.update.notice', model: 'Project')
  end
end
