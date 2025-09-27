class CreateTask < ActiveRecord::Migration[8.0]
  def change
    create_table :tasks do |t|
      t.text :body
      t.timestamps
    end
  end
end
