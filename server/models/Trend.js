const mongoose = require('mongoose');

const trendSchema = new mongoose.Schema({
  name: String,
  category: {
    type: String,
    enum: ['topic', 'hashtag', 'product', 'brand'],
    required: true
  },
  platforms: [String],
  mentionCount: Number,
  engagementCount: Number,
  sentiment: Number, // -1 to 1
  growthRate: Number,
  trendingScore: Number,
  topPosts: [{
    postId: String,
    platform: String,
    content: String,
    engagement: Number
  }],
  relatedHashtags: [String],
  relatedTopics: [String],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date,
  forecastedGrowth: Number
});

module.exports = mongoose.model('Trend', trendSchema);
