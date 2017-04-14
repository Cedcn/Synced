class Article < ApplicationRecord
  validates :title, presence: true, uniqueness: { case_sensitive: false }

  belongs_to :category
  belongs_to :author, class_name: 'User', foreign_key: 'user_id'

  enum status: { draft: 0, published: 1 }

  mount_uploader :cover, ImageUploader
  acts_as_taggable
end

# == Schema Information
#
# Table name: articles
#
#  id                :uuid             not null, primary key
#  title             :string           not null
#  description       :string
#  content           :text
#  cover_image       :string
#  status            :integer          default("draft")
#  copyright         :integer          default("original")
#  copyright_content :string
#  check_content     :string
#  publish_at        :date
#  datetime          :date
#  user_id           :uuid
#  category_id       :uuid
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#
# Indexes
#
#  index_articles_on_status  (status)
#  index_articles_on_title   (title)
#
