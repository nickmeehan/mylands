class UsersController < ApplicationController

  def index
    @user = User.new
  end

  def show
    @user = User.find(session[:user_id])
  end

  def new
  end

  def create
    redirect_to request_token.authorize_url
  end

  def edit
  end

  def update
  end

  def destroy
    session.clear
    redirect_to root_path
  end

  def auth
    @access_token = request_token.get_access_token(:oauth_verifier => params[:oauth_verifier])
    session.delete(:request_token)

    @existing_user = User.find_by_access_token(@access_token.token)

    if @existing_user != nil
      session[:user_id] = @existing_user.id
    else
      p @access_token
      user_attributes = User.define_attributes(@access_token.params)
      @user = User.create(user_attributes)
      session[:user_id] = @user.id
    end
    redirect_to show
  end

  private

  def oauth_consumer
    raise RuntimeError, "You must set TWITTER_KEY and TWITTER_SECRET in your server environment." unless ENV['TWITTER_KEY'] and ENV['TWITTER_SECRET']
    @consumer ||= OAuth::Consumer.new(
      ENV['TWITTER_KEY'],
      ENV['TWITTER_SECRET'],
      :site => "https://api.twitter.com"
    )
  end

  def request_token
    if not session[:request_token]
      # this 'host_and_port' logic allows our app to work both locally and on Heroku
      host_and_port = request.host
      host_and_port << ":3000" if request.host == "localhost"

      # the `oauth_consumer` method is defined above
      session[:request_token] = oauth_consumer.get_request_token(
        :oauth_callback => "http://#{host_and_port}/auth"
      )
    end
    session[:request_token]
  end

end