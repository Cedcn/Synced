class Authorization < ApplicationRecord
  belongs_to :user
  validates :provider, presence: true, uniqueness: { scope: :user_id }
  validates :uid, presence: true, uniqueness: { scope: :provider }

  before_destroy :confirm_presence_of_alternate_login

  enum provider: {
    wechat:              'wechat',
    weibo:               'weibo'
  }

  private

  def confirm_presence_of_alternate_login
    throw(:abort) unless user.authorizations.count > 1 || user.mobile.present? || user.email.present?
  end
end

# == Schema Information
#
# Table name: authorizations
#
#  id         :integer          not null, primary key
#  user_id    :uuid
#  provider   :string
#  uid        :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_authorizations_on_provider_and_uid  (provider,uid)
#  index_authorizations_on_user_id           (user_id)
#
