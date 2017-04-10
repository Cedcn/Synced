class Admin::CategoriesController < Admin::BaseController
  def index
    @category = MainCategory.includes(:sub_categories)
    authorize Category
    render json: @category, include: :sub_categories
  end
end
