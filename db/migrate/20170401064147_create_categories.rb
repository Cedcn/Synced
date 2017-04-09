class CreateCategories < ActiveRecord::Migration[5.0]
  def change
    create_table :categories, id: :uuid, default: 'uuid_generate_v4()' do |t|
      t.string :title
      t.string :type

      t.uuid :category_id

      t.timestamps
    end
  end
end
