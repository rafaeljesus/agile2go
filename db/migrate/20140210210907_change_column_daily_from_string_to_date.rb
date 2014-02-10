class ChangeColumnDailyFromStringToDate < ActiveRecord::Migration
  def change
    change_column :sprints, :daily, :date
  end
end
