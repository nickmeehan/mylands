class CreateCheckins < ActiveRecord::Migration
  def change
    create_table :checkins do |t|
      t.point :position, srid: 4326
      t.belongs_to :user
      t.timestamps
    end
  end
end
