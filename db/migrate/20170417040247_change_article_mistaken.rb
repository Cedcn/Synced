class ChangeArticleMistaken < ActiveRecord::Migration[5.0]
  def up
    remove_column :articles, :datetime, :date
    change_column :articles, :publish_at, :datetime
  end

  def down
    add_column :articles, :datetime, :date
    change_column :articles, :publish_at, :date
  end
end
