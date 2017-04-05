class Admin::ArticlesController < Admin::BaseController
  def index
    load_articles
    respond_to do |format|
      format.html
      format.json { render json: @articles, include: { author: { only: :username } } }
    end
  end

  def create
    @article = Article.new(article_params)
    authorize @article
    @article.save!
    render json: @article, include: { author: { only: :username } }
  end

  private

  def load_articles
    @q = Article.includes(:author).ransack(params[:q])
    @articles = @q.result.order(created_at: :desc).page(params[:page]).per(10)
    authorize @articles
  end

  def article_params
    params.require(:article).permit(:title, :content, :description, :user_id)
  end
end
