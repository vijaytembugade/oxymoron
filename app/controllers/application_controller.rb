# frozen_string_literal: true

class ApplicationController < ActionController::Base
  before_action :authenticate_user_using_x_auth_token

  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  private 
    def authenticate_user_using_x_auth_token
      user_email = request.headers["X-Auth-Email"].presence
      auth_token = request.headers["X-Auth-Token"].presence
      user = user_email && User.find_by!(email: user_email)
      is_valid_token = user && auth_token && ActiveSupport::SecurityUtils.secure_compare(user.authentication_token, auth_token)
      if is_valid_token
        @current_user = user
      else
        render json: { error: "Unauthorized" }, status: :unauthorized
      end
    end

    def current_user
      @current_user
    end
end
