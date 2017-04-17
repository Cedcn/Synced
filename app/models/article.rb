class Article < ApplicationRecord
  validates :title, presence: true, uniqueness: { case_sensitive: false }

  belongs_to :category
  belongs_to :author, class_name: 'User'
  has_many :articles_cooperation_authors, dependent: :destroy
  has_many :cooperation_authors, through: :articles_cooperation_authors

  enum status: { draft: 0, published: 1 }
  enum copyright: { original: 0, translate: 1, reproduce: 2 }

  before_validation :check_publish_time
  after_save :delay_publish

  mount_uploader :cover, ImageUploader
  acts_as_taggable

  def check_publish_time
    self.publish_at ||= Time.now if status == 'published'
  end

  def delay_publish
    return unless publish_at
    delay_time = Time.now - publish_at
    return if delay_time > 0
    #create a delay job to set topic status published
  end
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
#  published_at      :date
#  author_id         :uuid
#  category_id       :uuid
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#
# Indexes
#
#  index_articles_on_status  (status)
#  index_articles_on_title   (title)
#
