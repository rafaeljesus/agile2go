require 'spec_helper'

feature 'when edit existing project' do
  scenario 'when I change the project name', js: true do
    current_user = sign_in
    project = create_project current_user
    update_project project
    expect(page).to have_content I18n.t('flash.actions.update.notice', model: 'Project')
  end
end
