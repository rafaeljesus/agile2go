require 'spec_helper'
require 'json'

describe OmniauthHash do

  it 'should return a omniauth user from hash ' do
    json = File.read("spec/fixtures/omniauth_hash.json")
    hash = JSON.parse(json)
    user = OmniauthHash.new(hash).to_user
    expect(user.email).to eq(hash['info']['email'])
  end

end
