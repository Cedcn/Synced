class Admin::EventsController < Admin::BaseController
  def index
    load_events
    respond_to do |format|
      format.html
      format.js { render json: @events }
    end
  end

  def create
    @event = Event.new(event_params)
    authorize @event
    @event.save!
    render json: { status: 200 }
  end

  def update
    load_event
    @event.update!(event_params)
  end

  def destroy
    load_event
    @event.destroy
    render json: { status: 200 }
  end

  private

  def event_params
    params.require(:event).permit(:name, :description, :event_type, :status, :start_date, :end_date, :short_name)
  end

  def load_events
    authorize :event
    @events = Event.order(created_at: :desc).page(params[:page]).per(10)
  end

  def load_event
    @event = Event.find(params[:id])
    authorize @event
  end
end
