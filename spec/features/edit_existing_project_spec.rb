require 'spec_helper'

feature 'when edit existing project' do

  before(:each) { sign_in }
  after(:each) { logout }

  scenario 'when I change the project name', js: true do
    project = FactoryGirl.create :project
    update_project project
    expect(page).to have_content I18n.t('flash.actions.update.notice', model: 'Project')
  end
end
