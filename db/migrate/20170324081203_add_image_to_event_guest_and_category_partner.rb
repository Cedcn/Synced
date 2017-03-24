class AddImageToEventGuestAndCategoryPartner < ActiveRecord::Migration[5.0]
  def change
    add_column :events_guests, :avatar_id, :uuid
    add_column :partner_categories_partners, :logo_id, :uuid
  end
end
