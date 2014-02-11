module Features
  module SprintHelpers

    def create_sprint current_user
      new_sprint = FactoryGirl.build :sprint
      sprint = create_sprint_as(new_sprint, current_user)
      sprint
    end

    private
    def create_sprint_as(new_sprint, current_user)
      visit '#sprints/new'
      fill_in 'daily', with: new_sprint.daily
      fill_in 'points', with: new_sprint.points
      fill_in 'start_date', with: new_sprint.start_date
      fill_in 'end_date', with: new_sprint.end_date
      fill_in 'project', with: new_sprint.project
      submit
      new_sprint
    end

    def submit
      find("[type='submit']").click
    end

  end
end
