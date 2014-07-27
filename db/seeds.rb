#destroy & reset artists table if exists
ActiveRecord::Base.connection.reset_pk_sequence!(Artist.table_name)

artists_json = open("lib/assets/artists_json.txt").read
artists_raw = JSON.parse(artists_json)
artists_raw.each do |artist|
  Artist.create(name: artist["artist"], url: artist["link"], spotify_id: artist["ids"]["spotify"], gracenote_id: artist["ids"]["gracenote"], openaura_id: artist["ids"]["openaura"], outside_id: artist["ids"]["outside"], rdio_id: artist["ids"]["rdio"], musicbrainz_id: artist["ids"]["musicbrainz"], echonest_id: artist["ids"]["echonest"] )
end

# load location shapes from geojson to shove into db
location_json = open('./lib/assets/location-shapes.geojson').read
location_collection = RGeo::GeoJSON.decode(location_json, :json_parser => :json)
location_collection.each do |location|
  puts "CREATING: #{location.properties["name"]}"
  Location.create!(name: location.properties["name"], boundary: location.geometry)
end

Location.create!(name: "The House by Heineken")

setlists_json = open("lib/assets/sets_json.txt").read
setlists_raw = JSON.parse(setlists_json)
setlists_raw.each do |setlist|
  if setlist["shows"].length != 0
    location = Location.find_by(name: setlist["shows"].first["stage"])
    artist = Artist.find_by(name: setlist["artist"])
    location_id = location.id
    artist_id = artist.id
    setlist["shows"].each do |show|
      start_time = DateTime.parse("#{show["date"]} #{show["start_time"]} PM -0700")
      end_time = DateTime.parse("#{show["date"]} #{show["end_time"]} PM -0700")
      Performance.create(location_id: location_id, artist_id: artist_id, start_time: start_time, end_time: end_time)
    end
  end
end
