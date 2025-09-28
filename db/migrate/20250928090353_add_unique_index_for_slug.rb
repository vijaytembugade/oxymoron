class AddUniqueIndexForSlug < ActiveRecord::Migration[8.0]
  def change
    add_index :tasks, :slug, unique: true
  end
end
