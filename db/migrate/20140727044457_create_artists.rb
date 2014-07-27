class CreateArtists < ActiveRecord::Migration
  def change
    create_table :artists do |t|
      t.string :name
      t.string :spotify_id
      t.string :gracenote_id
      t.string :openaura_id
      t.string :outside_id
      t.string :rdio_id
      t.string :musicbrainz_id
      t.string :echonest_id

      t.timestamps
    end
  end
end
