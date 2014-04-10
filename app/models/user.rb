class User < ActiveRecord::Base
  rolify

  has_many :assignments
  has_many :projects, through: :assignments
  has_many :assigned_projects, through: :assignments, class_name: 'Project', source: :project

  validates :name, presence: true, length: {
    minimum: 4, too_short: "%{count} is the minimum allowed",
    maximum: 100, too_large: "%{count} is the maximum allowed" }

  has_secure_password validations: false

  def self.authenticate(email, password)
    find_by_email(email).try(:authenticate, password)
  end

  def self.from_omniauth(auth)
    auth['uid'] = auth['uid'].to_s
    where(auth.slice(:provider, :uid)).first || create_from_omniauth(auth)
  end

  def self.create_from_omniauth(auth)
    create! do |user|
      user.provider = auth.provider
      user.uid = auth.uid
      user.name = auth.info.name
      user.email = auth.info.email
      user.avatar = parse_image(auth)
      user.oauth_token = auth.credentials.token
    end
  end

  def self.parse_image(auth)
    return auth.info.image unless auth.provider == 'github'
    auth.extra.raw_info.avatar_url
  end

  def master?
    self.has_role? :master
  end

end
