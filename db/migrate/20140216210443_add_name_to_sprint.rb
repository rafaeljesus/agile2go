class AddNameToSprint < ActiveRecord::Migration
  def change
    add_column :sprints, :name, :string
  end
end
