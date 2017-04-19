class CreateRememberTokens < ActiveRecord::Migration[5.0]
  def change
    create_table :remember_tokens do |t|
      t.uuid    :user_id
      t.string  :token, null: false
      t.string  :ua
      t.string  :ip
      t.datetime  :last_actived_at

      t.timestamps
    end

    add_index :remember_tokens, :created_at
    add_index :remember_tokens, [:user_id, :token]
  end
end
