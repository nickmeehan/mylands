class CheckinsController < ApplicationController
  before_action :current_user

  def create
    factory = Location.rgeo_factory_for_column(:boundary)

    longitude = params["longitude"]
    latitude = params["latitude"]

    here = factory.point(longitude, latitude)
    now = DateTime.parse(params["timestamp"])

    Location.all.each do |loc|
      if loc.boundary && loc.boundary.contains?(here)
        if loc.performances
          performances = loc.performances
          performances.each do |performance|
            if now >= performance.start_time && performance.end_time >= now
              _performance = performance
              checkin = loc.checkins.new checkins_params
              checkin.user_id = @current_user.id
              checkin.position = here
              checkin.save
            end
          end
          render json: { location: loc, artist: _performance.artist }
        else
          checkin = loc.checkins.new checkins_params
          checkin.user_id = @current_user.id
          checkin.position = here
          checkin.save
          render json: { location: loc, artist: nil }
        end
      end
    end
    # something to respond with an error ex. you are not at Outside Lands
    redirect_to @current_user
  end

private
  def checkins_params
    params.require(:checkins).permit(:user_id, :location_id, :position)
  end  
end
