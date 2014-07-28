class Checkin < ActiveRecord::Base
  belongs_to :user
  belongs_to :location
  belongs_to :artist

  def get_data
    artist_name = self.artist ? self.artist.name : nil
    {location: self.location.name, artist: artist_name, latitude: self.get_lat_lng[:latitude], longitude: self.get_lat_lng[:longitude], time: self.created_at}
  end

  def get_lat_lng
    temp = self.position.to_s.split("(")[1].split(" ")
    lng = temp.first
    lat = temp.last[0...-1]
    {latitude: lat, longitude: lng}
  end

  wgs84_proj4 = '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs'
  wgs84_wkt = <<WKT
    GEOGCS["WGS 84",
      DATUM["WGS_1984",
        SPHEROID["WGS 84",6378137,298.257223563,
          AUTHORITY["EPSG","7030"]],
        AUTHORITY["EPSG","6326"]],
      PRIMEM["Greenwich",0,
        AUTHORITY["EPSG","8901"]],
      UNIT["degree",0.01745329251994328,
        AUTHORITY["EPSG","9122"]],
      AUTHORITY["EPSG","4326"]]
WKT

  wgs84_factory = RGeo::Geographic.simple_mercator_factory(:srid => 4326,
    :proj4 => wgs84_proj4, :coord_sys => wgs84_wkt)

  set_rgeo_factory_for_column(:boundary, wgs84_factory)
end
