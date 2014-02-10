class ChangeColumnPointsFromStringToInteger < ActiveRecord::Migration
  def change
    change_column :sprints, :points, :integer
  end
end
