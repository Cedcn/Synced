class CategoryPolicy < ApplicationPolicy
  def index?
    user.roles.include?('organizer') || admin?
  end
end
