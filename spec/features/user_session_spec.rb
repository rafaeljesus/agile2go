require 'spec_helper'

feature 'when sign in' do
  scenario 'with all fields corrected filled', js: true do
    sign_in
    expect(page).to have_content I18n.t('sessions.signed_in')
  end

  scenario 'with non existing user', js: true do
    sign_in_as FactoryGirl.build :user
    expect(page).to have_content I18n.t('errors.models.user_session.attributes.base.invalid_login')
  end
end
