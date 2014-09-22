require 'spec_helper'

feature 'when sign up' do

  after(:each) { logout }

  scenario 'with all fields corrected filled', js: true do
    sign_up
    expect(page).to have_content I18n.t('registrations.signed_up')
  end

  scenario 'with name blank', js: true do
    user = FactoryGirl.build(:user, name: '')
    sign_up_as user
    expect(page).to have_content I18n.t('errors.messages.blank').upcase
  end

  scenario 'with email blank', js: true do
    user = FactoryGirl.build(:user, email: '')
    sign_up_as user
    expect(page).to have_content I18n.t('errors.messages.blank').upcase
  end

  scenario 'with password blank', js: true do
    user = FactoryGirl.build(:user, password: '')
    sign_up_as user
    expect(page).to have_content '6 IS THE MINIMUN ALLOWED'
  end

  scenario 'with password_confirmation blank', js: true do
    user = FactoryGirl.build(:user, password_confirmation: '')
    sign_up_as user
    expect(page).to have_content I18n.t('errors.messages.blank').upcase
  end

end
