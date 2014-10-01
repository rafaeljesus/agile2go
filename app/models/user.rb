require 'bcrypt'
class User
  include MongoMapper::Document
  include BCrypt

  EMAIL_REGEX = /\A[^@]+@([^@\.]+\.)+[^@\.]+\z/

  key :first_name, String, required: true
  key :last_name, String, required: true
  key :email, String, required: true, unique: true, format: EMAIL_REGEX
  key :crypted_password, String
  key :provider, String
  key :uid, String
  key :avatar, String
  key :oauth_token, String
  key :oauth_expires_at, Time
  timestamps!

  many :projects

  validate :password_length

  def omniauth_user?
    !uid.nil? && !provider.nil?
  end

  def password_length
    return if omniauth_user? || password.length >= 8
    errors.add(:password, 'password must be greather then 8')
  end

  def project_name_uniq?(name)
    is_uniq = collection.find('projects.name' => name).count == 0
    unless is_uniq
      errors.add(:project_name, 'project name has already been taken')
    end
    return is_uniq
  end

  def sprint_name_uniq?(name)
    is_uniq = true
    collection.find.each do |doc|
      doc['projects'].each do |p_doc|
        p_doc['sprints'].each do |s_doc|
          if s_doc['name'] == name
            errors.add(:sprint_name, 'sprint name has already been taken')
            return false
          end
        end
      end
    end
    is_uniq
  end

  def sprints_size
    size = 0
    projects.each do |p|
      size += p.sprints.length
    end
    size
  end

  def password
    return nil unless crypted_password.present?
    @password ||= Password.new(crypted_password)
  end

  def password=(value)
    return unless value.present?
    @password = value
    self.crypted_password = Password.create(value)
  end

end
