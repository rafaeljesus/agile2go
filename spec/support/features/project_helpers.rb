module Features
  module ProjectHelpers

    def create_project(current_user)
      new_project = FactoryGirl.build :project
      create_project_as(new_project, current_user)
    end

    def update_project project
      visit "#projects/#{project.id}/edit"
      sleep 1
      fill_in 'name', with: 'new project'
      submit
    end

    def delete_project project
      visit '#projects'
      find(".confirm").click
      find(".delete").click
    end

    private
    def create_project_as(new_project, current_user)
      sleep 1
      visit '#projects/new'
      fill_in 'name', with: new_project.name
      fill_in 'company', with: new_project.company
      fill_in 'description', with: new_project.description
      execute_script("$('select').val(#{current_user.id}).trigger('change')")
      sleep 1
      submit
    end

    def submit
      find("[type='submit']").click
    end

  end
end
