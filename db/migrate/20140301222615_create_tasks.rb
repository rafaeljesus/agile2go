class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.string :title
      t.text :story
      t.string :status
      t.integer :priority
      t.references :sprint, index: true

      t.timestamps
    end
  end
end
