module Features
  module TaskHelpers

    def create_task
      new_task = FactoryGirl.build :task
      task = create_task_as new_task
      task
    end

    def update_task task
      visit "#tasks/#{task.id}/edit"
      fill_in 'title', with: 'new task title'
      submit
    end

    def delete_task task
      execute_script("$('.confirm').click();")
      execute_script("$('.delete').click();")
    end

    private
    def create_task_as new_task
      visit '#tasks/new'
      execute_script("$('#status').val('#{new_task.status}');")
      execute_script("$('#points').val(#{new_task.points});")
      execute_script("$('#priority').val(#{new_task.priority});")
      fill_in 'title', with: new_task.title
      fill_in 'story', with: new_task.story
      execute_script("$('select').val(#{new_task.sprint.id}).trigger('change');")
      submit
      new_task
    end

    def submit
      find("[type='submit']").click
    end

  end
end
