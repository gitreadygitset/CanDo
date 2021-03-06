require 'rails_helper'

RSpec.describe Api::V1::VideoSharesController, type: :controller do
  let!(:user1) { FactoryBot.create(:user) }
  let!(:user2) { FactoryBot.create(:user, username: 'guest2') }
  let!(:user3) { FactoryBot.create(:user, username: 'guest3') }
  let!(:video1) { FactoryBot.create(:video, uploader: user1) }
  let!(:video_share1) { VideoShare.create(video: video1, user: user3)}
  
  describe "POST#create" do
    it "Should create a new share and return a JSON with the shared user's information" do
      sign_in user1
      post_json = {
            username: user2.username,
            video_id: video1.id
        }
      prev_count = VideoShare.count
      post(:create, params: post_json)

      returned_json = JSON.parse(response.body)
      expect(VideoShare.count).to eq(prev_count + 1)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(returned_json["username"]).to eq(user2.username)
    end

    it "Should not let anyone other than the original creator share the video" do
      sign_in user2
      post_json = {
        username: user2.username,
        video_id: video1.id
        }
      prev_count = VideoShare.count
      post(:create, params: post_json)

      expect(VideoShare.count).to eq(prev_count)
      returned_json = JSON.parse(response.body)
      expect(returned_json["error"]).to eq(["Only the original video uploader can share it"])
    end
  end
  
  describe "POST#destroy" do
    it "Should delete the share" do
      sign_in user1
      post = {
        id: user3.username,
        video_id: video1.id
      }

      prev_count = VideoShare.count
      post(:destroy, params: post)
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(VideoShare.count). to eq(prev_count-1)
    end
  end
end
