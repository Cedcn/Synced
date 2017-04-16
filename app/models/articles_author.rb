class ArticlesAuthor < ApplicationRecord
  belongs_to :article
  belongs_to :author, class_name: 'User'
end

# == Schema Information
#
# Table name: articles_authors
#
#  id          :integer          not null, primary key
#  article_id  :uuid
#  author_id   :uuid
#  main_author :boolean          default(FALSE)
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
# Indexes
#
#  index_articles_authors_on_article_id  (article_id)
#  index_articles_authors_on_author_id   (author_id)
#
