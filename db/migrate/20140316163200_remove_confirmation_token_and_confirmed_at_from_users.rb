class RemoveConfirmationTokenAndConfirmedAtFromUsers < ActiveRecord::Migration
  def change
    remove_column :users, :confirmation_token, :string
    remove_column :users, :confirmed_at, :datetime
  end
end
