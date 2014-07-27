class CreatePerformances < ActiveRecord::Migration
  def change
    create_table :performances do |t|
      t.datetime :start_time
      t.datetime :end_time
      t.belongs_to :artist
      t.belongs_to :location
      t.timestamps
    end
  end
end
