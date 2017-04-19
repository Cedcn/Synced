class ArticlesCooperationAuthor < ApplicationRecord
  belongs_to :article
  belongs_to :cooperation_author, foreign_key: 'user_id', class_name: 'User'
end

# == Schema Information
#
# Table name: articles_cooperation_authors
#
#  id         :integer          not null, primary key
#  article_id :uuid
#  user_id    :uuid
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_articles_cooperation_authors_on_article_id  (article_id)
#  index_articles_cooperation_authors_on_user_id     (user_id)
#
