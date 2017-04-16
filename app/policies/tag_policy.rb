class TagPolicy < ApplicationPolicy
  def index?
    user.roles.include?('organizer') || admin?
  end

  alias create? index?
end
