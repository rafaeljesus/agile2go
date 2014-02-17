class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name
      t.string :email
      t.string :password_digest
      t.date_time :confirmed_at
      t.confirmation_token :string

      t.timestamps
    end
  end
end
