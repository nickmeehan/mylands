class User < ActiveRecord::Base
  has_many :checkins

  def self.define_attributes(params)
    return {
      username: params[:screen_name],
      twitter_user_id: params[:user_id],
      access_token: params[:oauth_token],
      access_secret: params[:oauth_token_secret]
    }
  end

end