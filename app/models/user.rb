class User < ApplicationRecord
    has_many :tasks, dependent: :destroy, foreign_key: 'assigned_to_id', class_name: 'Task'
    MAX_NAME_LENGTH = 255
    validates :name, presence: true, length: { maximum: MAX_NAME_LENGTH }

end