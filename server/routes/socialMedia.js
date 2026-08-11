const express = require('express');
const router = express.Router();

// Mock social media data
const generateMockPosts = (platform, count = 10) => {
  const posts = [];
  const sentiments = ['positive', 'negative', 'neutral'];
  const platforms = platform || ['twitter', 'instagram', 'facebook', 'youtube'];

  for (let i = 0; i < count; i++) {
    posts.push({
      id: `post_${Date.now()}_${i}`,
      platform: Array.isArray(platforms) ? platforms[i % platforms.length] : platform,
      author: `user_${Math.floor(Math.random() * 10000)}`,
      content: `This is a sample social media post #retail #shopping ${i}`,
      likes: Math.floor(Math.random() * 5000),
      shares: Math.floor(Math.random() * 1000),
      comments: Math.floor(Math.random() * 500),
      sentiment: sentiments[Math.floor(Math.random() * 3)],
      sentimentScore: Math.random() * 2 - 1,
      engagementRate: (Math.random() * 15).toFixed(2),
      createdAt: new Date(Date.now() - Math.random() * 86400000),
      hashtags: ['#retail', '#shopping', '#fashion'],
      isViral: Math.random() > 0.9
    });
  }
  return posts;
};

router.get('/posts', (req, res) => {
  const { platform, limit = 10 } = req.query;
  try {
    const posts = generateMockPosts(platform, parseInt(limit));
    res.json({ success: true, count: posts.length, data: posts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/posts/:platform', (req, res) => {
  const { platform } = req.params;
  const { limit = 10 } = req.query;
  try {
    const posts = generateMockPosts(platform, parseInt(limit));
    res.json({ success: true, platform, count: posts.length, data: posts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/stats', (req, res) => {
  const stats = {
    twitter: { posts: 5200, followers: 425000, engagement: 7.2 },
    instagram: { posts: 4800, followers: 380000, engagement: 8.5 },
    facebook: { posts: 3950, followers: 520000, engagement: 4.8 },
    youtube: { posts: 1793, subscribers: 680000, engagement: 5.3 }
  };
  res.json(stats);
});

module.exports = router;
