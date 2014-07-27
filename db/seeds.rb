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