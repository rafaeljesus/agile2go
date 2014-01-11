class User < ActiveRecord::Base
  rolify

  has_many :assignments
  has_many :projects, through: :assignments
  has_many :assigned_projects, through: :assignments, class_name: "Project", source: :project

  validates_presence_of :email, :name
  validates_format_of :email, with: /\A[^@]+@([^@\.]+\.)+[^@\.]+\z/
  validates_uniqueness_of :email

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
end
