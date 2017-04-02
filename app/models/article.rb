class Article < ApplicationRecord
  validates :title, presence: true, uniqueness: { case_sensitive: false }

  belongs_to :category
  belongs_to :author, class_name: 'User'
end

# == Schema Information
#
# Table name: articles
#
#  id           :uuid             not null, primary key
#  title        :string           not null
#  description  :string
#  content      :text
#  status       :integer          default(0)
#  publish_date :date
#  user_id      :uuid
#  category_id  :uuid
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
# Indexes
#
#  index_articles_on_status  (status)
#  index_articles_on_title   (title)
#
