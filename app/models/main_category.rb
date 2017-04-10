class MainCategory < Category
  has_many :sub_categories, foreign_key: 'category_id', dependent: :destroy

  def all_articles
    Article.where(category_id: sub_categories.pluck(:id)).order(published_at: :desc)
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
