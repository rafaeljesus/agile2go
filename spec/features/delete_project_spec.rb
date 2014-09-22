require 'spec_helper'

feature 'when delete project' do

  before(:each) { @current_user = sign_in }
  after(:each) { logout }

  scenario 'when I delete a project', js: true do
    project = FactoryGirl.create :project
    delete_project project
    expect(page).to have_content I18n.t('flash.actions.destroy.notice', model: 'Item')
  end
end
