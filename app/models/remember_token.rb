class RememberToken < ApplicationRecord
  belongs_to :user

  before_create :set_default

  private

  def set_default
    self.token = SecureRandom.urlsafe_base64(30)
    self.last_actived_at = Time.current
  end
end

# == Schema Information
#
# Table name: remember_tokens
#
#  id              :integer          not null, primary key
#  user_id         :uuid
#  token           :string           not null
#  ua              :string
#  ip              :string
#  last_actived_at :datetime
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
# Indexes
#
#  index_remember_tokens_on_created_at         (created_at)
#  index_remember_tokens_on_user_id_and_token  (user_id,token)
#
