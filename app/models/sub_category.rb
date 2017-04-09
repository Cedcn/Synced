class SubCategory < Category
  belongs_to :main_category, foreign_key: 'category_id', touch: true

  def all_articles
    articles
  end
end

# == Schema Information
#
# Table name: categories
#
#  id          :uuid             not null, primary key
#  title       :string
#  type        :string
#  category_id :uuid
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
