require 'spec_helper'

feature 'when edit existing sprint' do
  scenario 'when I change the sprint name', js: true do
    current_user = sign_in
    sprint = create_sprint current_user
    update_sprint sprint
    expect(page).to have_content I18n.t('flash.actions.update.notice', model: 'Sprint')
  end
end
