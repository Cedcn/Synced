class Admin::TagsController < Admin::BaseController
  def index
    @tags = ActsAsTaggableOn::Tag.named_like(params[:query] || '').page(params[:page]).per(10)
    authorize :article
    render json: @tags
  end

  private

  def tag_params
    params.require(:tag).permit(:name)
  end
end
