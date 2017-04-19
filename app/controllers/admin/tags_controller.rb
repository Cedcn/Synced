class Admin::TagsController < Admin::BaseController
  def index
    @tags = ActsAsTaggableOn::Tag.named_like(params[:query] || '').page(params[:page]).per(10)
    authorize :tag
    render json: @tags
  end

  def create
    @tag = ActsAsTaggableOn::Tag.new(tag_params)
    authorize :tag
    @tag.save!
  end

  private

  def tag_params
    params.require(:tag).permit(:name)
  end
end
