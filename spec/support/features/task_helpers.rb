module Features
  module TaskHelpers

    def create_task
      new_task = FactoryGirl.build :task
      create_task_as new_task
    end

    def update_task task
      visit "#tasks/#{task.id}/edit"
      sleep 1
      fill_in 'title', with: 'new title'
      submit
    end

    def delete_task task
      visit '#tasks'
      sleep 1
      find(".confirm").click
      find(".delete").click
    end

    private
    def create_task_as new_task
      visit '#tasks/new'
      sleep 1
      page.execute_script("$('#status')[0].value = '#{new_task.status}'")
      page.execute_script("$('#priority')[0].value = '#{new_task.priority}'")
      page.execute_script("$('#points')[0].value = '#{new_task.points}'")
      page.fill_in 'title', with: new_task.title
      page.fill_in 'story', with: new_task.story
      page.execute_script("$('select').val(#{new_task.sprint.id}).trigger('change');")
      submit
    end

    def submit
      page.find("[type='submit']").click
    end

  end
end
