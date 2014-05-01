class Chatroom < ActiveRecord::Base

  has_many :messages, dependent: :destroy
  validates :name, presence: true, uniqueness: true

  after_create :convert_name
  #Converting name regexes so there are no spaces or certain punctuation for Room-Name URL
  def convert_name
    self.update(name: self.name.gsub(/\s+/,"_"))
    self.update(name: self.name.gsub(",","_"))
    self.update(name: self.name.gsub(/"/,"'"))
  end
  #Destroys chatrooms and all their messages
  def timed_destroy
    if (Time.now.getgm - self.created_at.getgm) >= 86400
      self.destroy
    end
  end

end

