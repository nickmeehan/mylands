class CreateLocations < ActiveRecord::Migration
  def change
    create_table :locations do |t|
      t.string :name
      t.string :type
      t.polygon :boundary, srid: 4326
      t.timestamps
    end
  end
end
