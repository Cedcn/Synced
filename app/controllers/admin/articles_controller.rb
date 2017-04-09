class Admin::ArticlesController < Admin::BaseController
  def index
    load_articles
    respond_to do |format|
      format.html
      format.json { render json: @articles, include: { author: { only: :username } , category: { } } }
    end
  end

  def create
    @article = Article.new(article_params)
    authorize @article
    @article.save!
    render json: @article, include: { author: { only: :username } }
  end

  def update
    load_article
    @article.update!(article_params)
  end

  def destroy
    load_article
    @article.destroy
  end

  private

  def load_articles
    @q = Article.includes(:author, :category).ransack(params[:q])
    @articles = @q.result.order(created_at: :desc).page(params[:page]).per(10)
    authorize @articles
  end

  def load_article
    @article = Article.find(params[:id])
    authorize @article
  end

  def article_params
    params.require(:article).permit(:title, :content, :description, :user_id, :status, :copyright, :cover, :copyright_content, :check_content)
  end
end
