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
      fill_in 'status', with: new_task.status
      fill_in 'priority', with: new_task.priority
      fill_in 'points', with: new_task.points
      fill_in 'title', with: new_task.title
      fill_in 'story', with: new_task.story
      page.execute_script("$('select').val(#{new_task.sprint.id}).trigger('change');")
      submit
      new_task
    end

    def submit
      page.find("[type='submit']").click
    end

  end
end
