require 'spec_helper'

feature 'when edit existing sprint' do
  scenario 'when I change the sprint name', js: true do
    sign_in
    sprint = FactoryGirl.create :sprint
    update_sprint sprint
    puts page.html
    expect(page).to have_content I18n.t('flash.actions.create.notice', model: 'Sprint')
  end
end
