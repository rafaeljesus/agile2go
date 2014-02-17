class CreateSprints < ActiveRecord::Migration
  def change
    create_table :sprints do |t|
      t.string :name
      t.string :daily
      t.integer :points
      t.date :start_date
      t.date :end_date
      t.references :project, index: true

      t.timestamps
    end
  end
end
