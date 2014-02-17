class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name
      t.string :email
      t.string :password_digest
      t.datetime :confirmed_at
      t.string :confirmation_token

      t.timestamps
    end
  end
end
