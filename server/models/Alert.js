const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['negative_sentiment', 'viral_post', 'emerging_issue', 'competitor_mention', 'brand_mention'],
    required: true
  },
  severity: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  title: String,
  description: String,
  triggeredBy: {
    postId: String,
    platform: String,
    author: String,
    content: String
  },
  metrics: {
    sentiment: Number,
    engagement: Number,
    reach: Number,
    trendingScore: Number
  },
  status: {
    type: String,
    enum: ['active', 'acknowledged', 'resolved'],
    default: 'active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  acknowledgedAt: Date,
  resolvedAt: Date,
  notes: String
});

module.exports = mongoose.model('Alert', alertSchema);
