const express = require('express');
const router = express.Router();

// Mock dashboard data
const getDashboardData = () => {
  return {
    summary: {
      totalMentions: 15743,
      sentimentScore: 0.68,
      brandHealth: 82,
      competitorScore: 0.45,
      engagementRate: 6.2,
      viralPosts: 12
    },
    platformMetrics: [
      { platform: 'Twitter', mentions: 5200, sentiment: 0.65, engagement: 7.2 },
      { platform: 'Instagram', mentions: 4800, sentiment: 0.72, engagement: 8.5 },
      { platform: 'Facebook', mentions: 3950, sentiment: 0.61, engagement: 4.8 },
      { platform: 'YouTube', mentions: 1793, sentiment: 0.75, engagement: 5.3 }
    ],
    topTrendingTopics: [
      { topic: '#EcoFriendlyFashion', mentions: 2340, growth: 32 },
      { topic: 'SustainableRetail', mentions: 1890, growth: 28 },
      { topic: '#ShopLocal', mentions: 1650, growth: 15 },
      { topic: 'RetailInnovation', mentions: 1420, growth: 22 }
    ],
    sentimentBreakdown: {
      positive: 68,
      neutral: 22,
      negative: 10
    },
    recentAlerts: [
      {
        id: 'alert_001',
        type: 'viral_post',
        severity: 'high',
        message: 'Viral post about new product line',
        platform: 'Instagram',
        timestamp: new Date(Date.now() - 3600000)
      },
      {
        id: 'alert_002',
        type: 'negative_sentiment',
        severity: 'medium',
        message: 'Spike in negative mentions',
        platform: 'Twitter',
        timestamp: new Date(Date.now() - 7200000)
      }
    ]
  };
};

router.get('/', (req, res) => {
  try {
    const data = getDashboardData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/summary', (req, res) => {
  const data = getDashboardData();
  res.json(data.summary);
});

router.get('/platform-metrics', (req, res) => {
  const data = getDashboardData();
  res.json(data.platformMetrics);
});

router.get('/trending-topics', (req, res) => {
  const data = getDashboardData();
  res.json(data.topTrendingTopics);
});

router.get('/sentiment-breakdown', (req, res) => {
  const data = getDashboardData();
  res.json(data.sentimentBreakdown);
});

module.exports = router;
