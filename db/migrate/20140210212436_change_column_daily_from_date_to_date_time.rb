class ChangeColumnDailyFromDateToDateTime < ActiveRecord::Migration
  def change
    change_column :sprints, :daily, :date_time
  end
end
