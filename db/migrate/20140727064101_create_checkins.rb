class CreateCheckins < ActiveRecord::Migration
  def change
    create_table :checkins do |t|
      t.point :position, srid: 4326
      t.references :user, index: true
      t.references :location, index: true
      t.timestamps
    end
  end
end
