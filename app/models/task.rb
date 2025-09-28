# frozen_string_literal: true

class Task < ApplicationRecord
  MAX_TITLE_LENGTH = 100
  validates :title, presence: true, length: { maximum: MAX_TITLE_LENGTH }
  validates :slug, uniqueness: true
  before_create :set_slug
  validate :slug_not_changed

  private
  
    def set_slug
      title_slug = title.parameterize
      latest_task_slug = Task.where(
        "slug LIKE ? or slug LIKE ?",
        "#{title_slug}",
        "#{title_slug}-%"
      ).order("LENGTH(slug) DESC", slug: :desc).first&.slug
      slug_count = 0
      if latest_task_slug.present?
        slug_count = latest_task_slug.split("-").last.to_i
        only_one_slug_exists = slug_count == 0
        slug_count = 1 if only_one_slug_exists
      end
      slug_candidate = slug_count.positive? ? "#{title_slug}-#{slug_count + 1}" : title_slug
      self.slug = slug_candidate
    end

    def slug_not_changed
      if will_save_change_to_slug? && self.persisted?
        errors.add(:slug, I18n.t('task.slug.immutable'))
      end
    end
end
