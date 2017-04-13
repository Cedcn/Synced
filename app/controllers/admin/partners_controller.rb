class Admin::PartnersController < Admin::BaseController
  def index
    load_partners
    respond_to do |format|
      format.html
      format.js { render json: @partners.to_json(include: :logos), methods: :default_logo }
    end
  end

  def new
    @partner = Partner.new
    authorize @partner
  end

  def edit
    load_partner
  end

  def create
    @partner = Partner.new(partner_params)
    authorize @partner
    @partner.save
    render json: { status: 200 }
  end

  def update
    load_partner
    @partner.update(partner_params)
  end

  def destroy
    load_partner
    @partner.destroy
    render json: { status: 200 }
  end

  private

  def load_partners
    authorize :partner
    @q = Partner.ransack(params[:q])
    @partners = @q.result.order(created_at: :desc).page(params[:page]).per(10)
  end

  def load_partner
    @partner = Partner.find(params[:id])
    authorize @partner
  end

  def partner_params
    params.require(:partner).permit(:name, :url, logos_attributes: [:id, :file, :_destroy, :default])
  end
end
