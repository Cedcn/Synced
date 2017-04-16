class Article < ApplicationRecord
  validates :title, presence: true, uniqueness: { case_sensitive: false }

  belongs_to :category
  has_many :articles_authors, dependent: :destroy
  has_many :authors, through: :articles_authors

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
#  cover             :string
#  status            :integer          default("draft")
#  copyright         :integer          default("original")
#  copyright_content :string
#  check_content     :string
#  published_at      :date
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
