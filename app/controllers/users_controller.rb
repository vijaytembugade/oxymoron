# frozen_string_literal: true

class UsersController < ApplicationController

    def index
        users = User.select(:id, :name)
        render status: :ok, json: {users:}
    end

    def create
        user = User.new(user_params)
        user.save!
        render status: :ok, json: {user:}
    end

    private
        def user_params
            params.require(:user).permit(:name)
        end
end