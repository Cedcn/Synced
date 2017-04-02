class Category < ApplicationRecord
  validates :title, present: true, uniqueness: true

  has_many :articles
  has_many :sub_category, class_name: 'Category', foreign_key: 'sub_category_id'

  def all_articles
    Article.where(category_id: sub_categories.map(&:id))
  end
end

# == Schema Information
#
# Table name: categories
#
#  id              :uuid             not null, primary key
#  title           :string
#  type            :string
#  sub_category_id :uuid
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
