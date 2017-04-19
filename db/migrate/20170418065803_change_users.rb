class ChangeUsers < ActiveRecord::Migration[5.0]
  def up
    remove_column :users, :city
    add_column :users, :city, :integer
    add_column :users, :email_verify_token, :string
    add_column :users, :email_verify_token_created_at, :datetime
    add_column :users, :email_verified_at, :datetime

    add_index :users, :email_verify_token, unique: true
  end

  def down
    remove_index :users, :email_verify_token
    remove_columns :users, :email_verify_token, :email_verify_token_created_at, :email_verified_at, :city
    add_column :users, :city, :string
  end
end
