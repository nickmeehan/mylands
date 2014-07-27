class CreatePerformances < ActiveRecord::Migration
  def change
    create_table :performances do |t|
      t.datetime :start_time
      t.datetime :end_time
      t.references :artist, index: true
      t.references :location, index: true
      t.timestamps
    end
  end
end
