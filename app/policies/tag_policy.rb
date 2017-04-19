class TagPolicy < ApplicationPolicy
  def index?
    user.roles.include?('editor') || admin?
  end

  alias create? index?
end
