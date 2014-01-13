require 'spec_helper'

feature 'when sign up' do
  scenario 'with all fields corrected filled' do
    sign_up
    expect(page).to have_content I18n.t('registrations.signed_up')
  end
end
