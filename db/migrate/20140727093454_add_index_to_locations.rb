class AddIndexToLocations < ActiveRecord::Migration
  def change
    change_table :locations do |t|
      t.index :boundary, :spatial => true
    end
  end
end
