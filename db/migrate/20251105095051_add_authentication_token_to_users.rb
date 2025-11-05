class AddAuthenticationTokenToUsers < ActiveRecord::Migration[8.0]
    add_column :users, :authentication_token, :string
  end
end
