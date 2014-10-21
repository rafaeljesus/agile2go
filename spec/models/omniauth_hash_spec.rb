require 'spec_helper'
require 'json'

describe OmniauthHash do

  before do
    @json = File.read("spec/fixtures/omniauth_hash.json")
  end

  it 'when twitter provider then return a omniauth user from hash' do
    hash = JSON.parse(@json)
    user = OmniauthHash.new(hash).to_user
    expect(user.email).to eq(hash['info']['email'])
  end

  it 'when github provider then return a omniauth user from hash' do
    hash = JSON.parse(@json)
    hash['provider'] = 'github'
    user = OmniauthHash.new(hash).to_user
    expect(user.email).to eq(hash['info']['email'])
  end
end
