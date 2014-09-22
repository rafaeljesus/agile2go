require 'spec_helper'

feature 'when edit existing sprint' do

  before(:each) { @current_user = sign_in }
  after(:each) { logout }

  scenario 'when I change the sprint name', js: true do
    sprint = FactoryGirl.create :sprint
    update_sprint sprint
    expect(page).to have_content I18n.t('flash.actions.create.notice', model: 'Sprint')
  end
end
