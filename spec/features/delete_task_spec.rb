require 'spec_helper'

feature 'when delete task' do
  scenario 'when I delete a task', js: true do
    sign_in
    task = FactoryGirl.create :task
    delete_task task
    expect(page).to have_content I18n.t('flash.actions.destroy.notice', model: 'Item')
  end
end
