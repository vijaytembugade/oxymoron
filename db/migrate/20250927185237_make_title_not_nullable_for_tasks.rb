class MakeTitleNotNullableForTasks < ActiveRecord::Migration[8.0]
  def change
    change_column_null :tasks, :title, false, length: { maximum: 100 }
  end
end
