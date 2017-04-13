class CreateAuthorizations < ActiveRecord::Migration[5.0]
  def change
    create_table :authorizations do |t|
      t.uuid :user_id
      t.string :provider
      t.string :uid

      t.timestamps
    end

    add_index :authorizations, [:provider, :uid]
    add_index :authorizations, :user_id
  end
end
