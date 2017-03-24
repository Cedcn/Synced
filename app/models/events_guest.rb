class EventsGuest < ApplicationRecord
  validates :event_id, uniqueness: { scope: [:guest_id], message: :cant_add_repeat }
  belongs_to :event, touch: true
  belongs_to :guest
  after_create :set_to_top, :set_avatar

  delegate :name, :company, to: :guest

  include RankedModel
  ranks :rank_order, with_same: :event_id

  def set_to_top
    update!(rank_order_position: 0)
  end

  def set_avatar
    default_avatar_id = guest.default_avatar&.id
    update(avatar_id: default_avatar_id) if default_avatar_id
  end

  def avatar
    Image.find_by(id: avatar_id)
  end
end

# == Schema Information
#
# Table name: events_guests
#
#  id         :integer          not null, primary key
#  event_id   :uuid
#  guest_id   :uuid
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  rank_order :integer
#  show       :boolean          default(FALSE)
#  avatar_id  :uuid
#
# Indexes
#
#  index_events_guests_on_event_id  (event_id)
#  index_events_guests_on_guest_id  (guest_id)
#
