require 'spec_helper'

feature 'when delete project' do
  scenario 'when I delete a project', js: true do
    current_user = sign_in
    project = create_project current_user
    delete_project project
    expect(page).to have_content I18n.t('flash.actions.destroy.notice', model: 'Project')
  end
end
