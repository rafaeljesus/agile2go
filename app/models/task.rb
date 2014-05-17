class Task < ActiveRecord::Base
  include BackboneSync::Faye::Observer
  COLUMNS = %w(title status story)

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

  scope :ordered, -> { order(:created_at) }

  def self.search(query)
    return ordered unless query
    tokens = query.split(/\s+/)
    conditions = tokens.collect do |token|
      COLUMNS.collect do |column|
        if token =~ /^\d+$/
          "#{column} = #{token}"
        else
          "#{column} like '%#{token}%'"
        end
      end
    end
    conditions = conditions.flatten.join(" or ")
    where(conditions)
  end

end
