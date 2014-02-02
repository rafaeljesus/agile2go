require 'spec_helper'

feature 'when sign in' do
  scenario 'with all fields corrected filled', js: true do
    sign_in
    expect(page).to have_content I18n.t('sessions.signed_in')
  end

  scenario 'with non existing user', js: true do
    sign_in_as FactoryGirl.build :user
    expect(page).to have_content 'Invalid email or password'
  end

  scenario 'with email blank', js: true do
    sign_in_as FactoryGirl.build :user, email: ''
    expect(page).to have_content "email can't be blank"
  end

  scenario 'with password blank', js: true do
    sign_in_as FactoryGirl.build :user, password: ''
    expect(page).to have_content "password can't be blank"
  end
end
