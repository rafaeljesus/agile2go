class Task < ActiveRecord::Base
  include Sync::Faye::Observer
  STATUSES = %w(todo ongoing test done)

  after_update :publish_update
  after_create :publish_create
  after_destroy :publish_destroy

  has_many :user_assignments
  has_many :users, through: :user_assignments
  has_many :assigned_users, through: :user_assignments, class_name: "User", source: :user
  accepts_nested_attributes_for :user_assignments

  belongs_to :sprint

  validates :title, presence: true
  validates :story, presence: true
  validates :status, inclusion: { in: STATUSES }

  scope :ordered, -> { order(:created_at) }

end
