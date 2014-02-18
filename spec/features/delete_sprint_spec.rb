require 'spec_helper'

feature 'when delete sprint' do
  scenario 'when I delete a sprint', js: true do
    current_user = sign_in
    sprint = create_sprint current_user
    delete_sprint sprint
    expect(page).to have_content I18n.t('flash.actions.destroy.notice', model: 'Sprint')
  end
end
