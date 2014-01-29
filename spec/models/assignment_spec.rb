require 'spec_helper'

describe Assignment do
  it { should belong_to(:project)  }
  it { should belong_to(:user)  }
  it { should have_db_index(:project_id) }
  it { should have_db_index(:user_id) }

end
