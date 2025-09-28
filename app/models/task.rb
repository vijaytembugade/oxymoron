# frozen_string_literal: true

class Task < ApplicationRecord
  MAX_TITLE_LENGTH = 100
  validates :title, presence: true, length: { maximum: MAX_TITLE_LENGTH }
  validates :slug, uniqueness: true
  before_create :set_slug
  validate :slug_not_changed

  private

    def set_slug
      itr = 1
      loop do
        title_slug = title.parameterize
        slug_candidate = itr > 1 ? "#{title_slug}-#{itr}" : title_slug
        break self.slug = slug_candidate unless Task.exists?(slug: slug_candidate)
        itr += 1
      end
    end

    def slug_not_changed
      if will_save_change_to_slug? && self.persisted?
        errors.add(:slug, I18n.t('task.slug.immutable'))
      end
    end
end
