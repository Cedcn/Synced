class CreateArticlesAuthors < ActiveRecord::Migration[5.0]
  def change
    create_table :articles_authors do |t|
      t.uuid    :article_id, index: true
      t.uuid    :author_id, index: true
      t.boolean :main_author, default: false

      t.timestamps
    end
  end
end
