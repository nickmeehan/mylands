class CheckinsController < ApplicationController
  before_action :current_user

  def user_checkins
    @checkins = current_user.checkins
    data = []
    @checkins.each do |checkin|
      data << checkin.get_data
    end
    render :json => data
  end

  def create
    factory = Location.rgeo_factory_for_column(:boundary)

    longitude = params["longitude"]
    latitude = params["latitude"]

    here = factory.point(longitude, latitude)
    now = DateTime.parse(params["timestamp"])

    location = nil

    Location.all.each do |loc|
      if loc.boundary && loc.boundary.contains?(here)
        location = loc
      end
    end

    if location
      checkin = location.checkins.new checkins_params
      checkin.user_id = current_user.id
      checkin.position = here
      checkin.save
      performance = location.performances.where("start_time <= ? AND end_time >= ?", now, now).first
      if performance
        render :json => {location: location.name, artist: performance.artist, latitude: latitude, longitude: longitude }
      else
        render :json => {location: location.name, artist: nil, latitude: latitude, longitude: longitude }
      end
    else
      osl = Location.find(1).boundary
      distance = meters_to_miles(here.distance(osl))
      render :text => "You are #{distance.round(2)} miles from Outside Lands!", status: :unprocessable_entity
    end
  end

private
  def checkins_params
    params.permit(:user_id, :location_id, :position)
  end

  def meters_to_miles(meters)
    (meters * 3.28) / 5280
  end
end
