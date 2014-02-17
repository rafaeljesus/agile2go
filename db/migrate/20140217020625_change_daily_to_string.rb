class ChangeDailyToString < ActiveRecord::Migration
  def change
    change_column :sprints, :daily, :string
  end
end
