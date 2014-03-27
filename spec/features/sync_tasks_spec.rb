require 'spec_helper'

feature 'when sync tasks' do
  scenario 'Viewing a task edited by another user', %q{
    Given fake1@example.com, fake2@example.com exists
    And I am using Session Fake1
    And I sign in as fake1@example.com
    Then I should see 'Assigning a tasks to others' task
    When I switch to session Fake2
    And I Sign In as fake2@example.com
    And I edit the task and change the title
    And I switch to session Fake1
    Then I should see the title was changed
  }, js: true do

  end

end
