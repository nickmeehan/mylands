class AddArtistReferenceToCheckins < ActiveRecord::Migration
  def change
    add_column :checkins, :artist_id, :integer
  end
end
