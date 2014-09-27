module Features
  module TaskHelpers

    def create_task
      new_task = FactoryGirl.build :task
      create_task_as new_task
    end

    def update_task task
      visit "#tasks/#{task.id}/edit"
      fill_in 'title', with: 'new title'
      submit
    end

    def delete_task task
      visit '#tasks'
      page.find(".confirm").click
      page.find(".delete").click
    end

    private
    def create_task_as new_task
      visit '#tasks/new'
      sleep 1
      page.execute_script("$('#status')[0].value = '#{new_task.status}'")
      page.execute_script("$('#priority')[0].value = '#{new_task.priority}'")
      page.execute_script("$('#points')[0].value = '#{new_task.points}'")
      fill_in 'title', with: new_task.title
      fill_in 'story', with: new_task.story
      page.execute_script("$('select').val(#{new_task.sprint.id}).trigger('change');")
      submit
    end

    def submit
      page.find("[type='submit']").click
    end

  end
end
