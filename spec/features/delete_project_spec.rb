require 'spec_helper'

feature 'when delete project' do
  scenario 'when I delete a project', js: true do
    sign_in
    project = FactoryGirl.create :project
    delete_project project
    expect(page).to have_content I18n.t('flash.actions.destroy.notice', model: 'Item')
  end
end
