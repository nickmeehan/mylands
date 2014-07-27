# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

#destroy & reset artists table if exists
ActiveRecord::Base.connection.reset_pk_sequence!(Artist.table_name)

artists_json = open("lib/assets/artists_json.txt").read
artists_raw = JSON.parse(artists_json)
artists_raw.each do |artist|
  Artist.create(name: artist["artist"], url: artist["link"], spotify_id: artist["ids"]["spotify"], gracenote_id: artist["ids"]["gracenote"], openaura_id: artist["ids"]["openaura"], outside_id: artist["ids"]["outside"], rdio_id: artist["ids"]["rdio"], musicbrainz_id: artist["ids"]["musicbrainz"], echonest_id: artist["ids"]["echonest"] )
end

setlists_json = open("lib/assets/sets_json.txt").read
setlists_raw = JSON.parse(setlists_json)
setlists_raw.each do |setlist|
  if setlist["shows"].length != 0
    location = Location.find_by(name: setlist["shows"].first["stage"])
    artist = Artist.find_by(name: setlist["artist"])
    location_id = location.id
    artist_id = artist.id
    setlist["shows"].each do |show|
      start_time = DateTime.parse("#{show["date"]} #{show["start_time"]} PM")
      end_time = DateTime.parse("#{show["date"]} #{show["end_time"]} PM")
      Performance.create(location_id: location_id, artist_id: artist_id, start_time: start_time, end_time: end_time)
    end
  end
end
