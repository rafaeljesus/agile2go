require 'spec_helper'

feature 'when create a new sprint' do
  scenario 'with all filled corrected filled', js: true do
    current_user = sign_in
    create_sprint current_user
    expect(page).to have_content I18.t('flash.actions.create.notice', model: 'Sprint')
  end
end
