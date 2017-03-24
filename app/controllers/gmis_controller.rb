class GmisController < ApplicationController
  layout false

  before_action :set_request_variant

  def index
    @event = Event.includes(votes: [:vote_items]).find_by(short_name: 'gmis2017')
    @event_guests = @event.events_guests.where(show: true).includes(:guest)
    @partner_categories = @event.partner_categories.includes(:partners)
    render template: 'gmis/2017'
  end

  def show
    render template: "gmis/#{params[:year]}"
  end
end
