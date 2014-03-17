module Features
  module ProjectHelpers

    def create_project(current_user)
      new_project = FactoryGirl.build :project
      project = create_project_as(new_project, current_user)
      project
    end

    def update_project project
      sleep 4
      visit "#projects/#{project.id}/edit"
      fill_in 'name', with: 'new project name'
      submit
    end

    def delete_project project
      visit '#projects'
      page.find(".confirm").click
      page.find(".delete").click
    end

    private
    def create_project_as(new_project, current_user)
      visit '#projects/new'
      fill_in 'name', with: new_project.name
      fill_in 'company', with: new_project.company
      fill_in 'description', with: new_project.description
      page.execute_script("$('select').val(#{current_user.id}).trigger('change')")
      submit
      new_project
    end

    def submit
      page.find("[type='submit']").click
    end

  end
end
