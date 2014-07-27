# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140727080416) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "postgis"

  create_table "artists", force: true do |t|
    t.string   "name"
    t.string   "spotify_id"
    t.string   "gracenote_id"
    t.string   "openaura_id"
    t.string   "outside_id"
    t.string   "rdio_id"
    t.string   "musicbrainz_id"
    t.string   "echonest_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "url"
  end

  create_table "checkins", force: true do |t|

    t.integer  "user_id"
    t.integer  "location_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.spatial  "position",    limit: {:srid=>4326, :type=>"point"}
  end

  add_index "checkins", ["location_id"], :name => "index_checkins_on_location_id"
  add_index "checkins", ["user_id"], :name => "index_checkins_on_user_id"

  create_table "locations", force: true do |t|
    t.string   "name"
    t.string   "type"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.spatial  "boundary",   limit: {:srid=>4326, :type=>"polygon"}
  end

  create_table "performances", force: true do |t|
    t.datetime "start_time"
    t.datetime "end_time"
    t.integer  "artist_id"
    t.integer  "location_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "performances", ["artist_id"], :name => "index_performances_on_artist_id"
  add_index "performances", ["location_id"], :name => "index_performances_on_location_id"

  create_table "users", force: true do |t|
    t.string   "username"
    t.string   "twitter_user_id"
    t.string   "access_token"
    t.string   "access_secret"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
