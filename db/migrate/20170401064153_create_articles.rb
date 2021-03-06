class CreateArticles < ActiveRecord::Migration[5.0]
  def change
    create_table :articles, id: :uuid, default: 'uuid_generate_v4()' do |t|
      t.string  :title, null: false
      t.string  :description
      t.text    :content
      t.string  :cover_image
      t.integer :status, default: 0
      t.integer :copyright, default: 0
      t.string  :copyright_content
      t.string  :check_content
      t.date    :publish_at, :datetime

      t.uuid    :user_id
      t.uuid    :category_id

      t.timestamps
    end

    add_index :articles, :title
    add_index :articles, :status
  end
end
