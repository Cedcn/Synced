class PartnerCategoriesPartner < ApplicationRecord
  validates :partner_category_id, uniqueness: { scope: [:partner_id], message: :cant_add_repeat }
  belongs_to :partner_category, touch: true
  belongs_to :partner
  after_create :set_to_top, :set_logo

  delegate :url, :name, to: :partner

  include RankedModel
  ranks :rank_order, with_same: :partner_category_id

  def set_to_top
    update!(rank_order_position: 0)
  end

  def set_logo
    default_logo_id = partner.default_logo&.id
    update(logo_id: default_logo_id) if default_logo_id
  end

  def logo
    Image.find_by(id: logo_id)
  end
end

# == Schema Information
#
# Table name: partner_categories_partners
#
#  id                  :integer          not null, primary key
#  partner_category_id :uuid
#  partner_id          :uuid
#  rank_order          :integer
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  logo_id             :uuid
#
# Indexes
#
#  index_partner_categories_partners_on_partner_category_id  (partner_category_id)
#  index_partner_categories_partners_on_partner_id           (partner_id)
#
