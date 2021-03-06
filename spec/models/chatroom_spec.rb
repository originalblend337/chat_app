require 'spec_helper'

describe Chatroom do

  subject(:chatroom){Chatroom.create(name: "Chap_App")}

  it { should validate_presence_of(:name)}
  it { should validate_uniqueness_of(:name)}
  it { should have_many(:messages)}

  describe '#timed_destroy' do
    it "destroys the chatroom and its message contents after 24 hours" do
      expect(Time.now.hour - chatroom.created_at.hour).to be < 24;
      expect(chatroom.timed_destroy).to eq(nil)
      #because it is less than 24 hours at this point
    end

  end

end