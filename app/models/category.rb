class Category < ApplicationRecord
  validates :title, presence: true, uniqueness: true

  has_many :articles
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
