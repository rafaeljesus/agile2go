require 'spec_helper'

feature 'when sync tasks' do

  background do
    connect_to_faye
    @user1 = FactoryGirl.create :user
    @user2 = FactoryGirl.create :user
    @task = FactoryGirl.create :task
  end

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

    sign_in_as @user1
    sleep 1
    redirect_to_tasks_path
    expect(page).to have_content @task.title

    Capybara.session_name = @user2.name
    sign_in_as @user2
    sleep 1
    redirect_to_tasks_path
    update_task @task

    Capybara.session_name = 'default'
    sign_in_as @user1
    sleep 1
    redirect_to_tasks_path
    sleep 1
    expect(page).to have_content 'new title'
  end

  def redirect_to_tasks_path
    page.driver.evaluate_script("window.location.hash='#tasks'")
  end

  def connect_to_faye
    begin
      Timeout.timeout(4) do
        host = Sync::Faye.to_host
        uri = URI.parse(host)
        TCPSocket.new(uri.host, uri.port).close
      end
    rescue Errno::ECONNREFUSED, Errno::EHOSTUNREACH, Timeout::ERROR
      raise 'Could not connect to faye'
    end
  end

end
