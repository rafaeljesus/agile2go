class TaskSearch
  COLUMNS = %w(title status story)

  def self.search(query, relation = Task.all)
    return relation.ordered unless query
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
    relation.where(conditions)
  end
end
