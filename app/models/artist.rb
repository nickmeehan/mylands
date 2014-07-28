class Artist < ActiveRecord::Base
  has_many :performances
  has_many :checkins
end
