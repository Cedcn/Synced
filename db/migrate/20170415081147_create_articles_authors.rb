class CreateArticlesAuthors < ActiveRecord::Migration[5.0]
  def change
    create_table :articles_cooperation_authors do |t|
      t.uuid    :article_id, index: true
      t.uuid    :user_id, index: true

      t.timestamps
    end
  end
end
