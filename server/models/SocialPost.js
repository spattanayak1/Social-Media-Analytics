const mongoose = require('mongoose');

const socialPostSchema = new mongoose.Schema({
  platform: {
    type: String,
    enum: ['twitter', 'instagram', 'facebook', 'youtube'],
    required: true
  },
  postId: String,
  content: String,
  author: String,
  authorId: String,
  authorFollowers: Number,
  createdAt: Date,
  likes: Number,
  shares: Number,
  comments: Number,
  sentiment: {
    type: String,
    enum: ['positive', 'negative', 'neutral'],
    default: 'neutral'
  },
  sentimentScore: Number, // -1 to 1
  hashtags: [String],
  mentions: [String],
  mediaUrls: [String],
  engagementRate: Number,
  isViral: Boolean,
  relevanceScore: Number,
  dataCollectedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('SocialPost', socialPostSchema);
