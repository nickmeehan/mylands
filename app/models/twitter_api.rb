module TwitterApi
  class Client

    def initialize(auth)
      @twitter_streaming_client = Twitter::Streaming::Client.new do |config|
        config.consumer_key = ENV['TWITTER_KEY']
        config.consumer_secret = ENV['TWITTER_SECRET']
        config.access_token = auth[:token]
        config.access_token_secret = auth[:secret]
      end
    end

  end

end