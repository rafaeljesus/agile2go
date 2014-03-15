class User < ActiveRecord::Base
  rolify

  has_many :assignments
  has_many :projects, through: :assignments
  has_many :assigned_projects, through: :assignments, class_name: "Project", source: :project

  validates :email, presence: true, uniqueness: true, format: { with: /\A[^@]+@([^@\.]+\.)+[^@\.]+\z/ }
  validates :name, presence: true, length: {
    minimum: 4, too_short: "%{count} is the minimum allowed",
    maximum: 100, too_large: "%{count} is the maximum allowed" }
  validates :password, length: { minimum: 8, too_short: "%{count} is the minimum allowed" }

  has_secure_password
  before_create :generate_token

  scope :confirmed, -> { where('confirmed_at IS NOT NULL') }

  def self.authenticate(email, password)
    #confirmed.
    find_by_email(email).try(:authenticate, password)
  end

  def generate_token
    self.confirmation_token = SecureRandom.urlsafe_base64
  end

  def confirm!
    return if confirmed?
    self.confirmed_at = Time.current
    self.confirmation_token = ''
    save!
  end

  def confirmed?
    confirmed_at.present?
  end

  def master?
    self.has_role? :master
  end
end
