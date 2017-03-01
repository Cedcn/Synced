class VoteItem < ApplicationRecord
  validates :name, presence: true

  belongs_to :vote
end

# == Schema Information
#
# Table name: vote_items
#
#  id         :uuid             not null, primary key
#  name       :string           not null
#  vote_id    :uuid             not null
#  count      :integer          default(0)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_vote_items_on_vote_id  (vote_id)
#
