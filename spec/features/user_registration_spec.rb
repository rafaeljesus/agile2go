require 'spec_helper'

feature 'when sign up' do
  scenario 'with all fields corrected filled', js: true do
    sign_up
    expect(page).to have_content I18n.t('registrations.signed_up')
  end

  scenario 'with name blank', js: true do
    sign_up_as FactoryGirl.build :user, name: ''
    expect(page).to have_content I18n.t('errors.messages.blank').upcase
  end

  scenario 'with email blank', js: true do
    sign_up_as FactoryGirl.build :user, email: ''
    expect(page).to have_content I18n.t('errors.messages.blank').upcase
  end

  scenario 'with password blank', js: true do
    sign_up_as FactoryGirl.build :user, password: ''
    expect(page).to have_content I18n.t('errors.messages.blank').upcase
  end

  scenario 'with password_confirmation blank', js: true do
    sign_up_as FactoryGirl.build :user, password_confirmation: ''
    expect(page).to have_content I18n.t('errors.messages.blank').upcase
  end

end
