const express = require('express');
const router = express.Router();

// Mock trends data
const getTrendsData = () => {
  return {
    trendingTopics: [
      {
        id: 'trend_001',
        name: '#EcoFriendlyFashion',
        category: 'hashtag',
        mentionCount: 2340,
        engagementCount: 18500,
        sentiment: 0.72,
        growthRate: 32,
        trendingScore: 89,
        platforms: ['Instagram', 'Twitter', 'TikTok'],
        topInfluencers: ['eco_fashion_guru', 'sustainable_style']
      },
      {
        id: 'trend_002',
        name: 'SustainableRetail',
        category: 'topic',
        mentionCount: 1890,
        engagementCount: 15200,
        sentiment: 0.68,
        growthRate: 28,
        trendingScore: 85,
        platforms: ['Twitter', 'LinkedIn'],
        topInfluencers: ['retail_expert', 'sustainability_now']
      },
      {
        id: 'trend_003',
        name: '#ShopLocal',
        category: 'hashtag',
        mentionCount: 1650,
        engagementCount: 12300,
        sentiment: 0.75,
        growthRate: 15,
        trendingScore: 78,
        platforms: ['Instagram', 'Facebook'],
        topInfluencers: ['local_business_hub']
      },
      {
        id: 'trend_004',
        name: 'RetailInnovation',
        category: 'topic',
        mentionCount: 1420,
        engagementCount: 10800,
        sentiment: 0.70,
        growthRate: 22,
        trendingScore: 75,
        platforms: ['Twitter', 'LinkedIn', 'YouTube'],
        topInfluencers: ['tech_retail_guru']
      }
    ],
    emerginTrends: [
      {
        id: 'emerg_001',
        name: 'AI-Powered Shopping',
        mentionCount: 450,
        growthRate: 156,
        weeklyGrowth: 245
      },
      {
        id: 'emerg_002',
        name: 'Virtual Try-On',
        mentionCount: 320,
        growthRate: 142,
        weeklyGrowth: 189
      }
    ],
    hashtagAnalysis: [
      { hashtag: '#retail', usage: 8900, engagement: 67500 },
      { hashtag: '#shopping', usage: 7650, engagement: 58300 },
      { hashtag: '#fashion', usage: 6200, engagement: 51800 },
      { hashtag: '#brandnew', usage: 5400, engagement: 42100 }
    ],
    productTrends: [
      { product: 'Sustainable Clothing', mentions: 1250, sentiment: 0.80 },
      { product: 'Smart Home Devices', mentions: 890, sentiment: 0.72 },
      { product: 'Eco Packaging', mentions: 756, sentiment: 0.85 }
    ]
  };
};

router.get('/all', (req, res) => {
  try {
    const trends = getTrendsData();
    res.json(trends);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/trending-topics', (req, res) => {
  const data = getTrendsData();
  res.json(data.trendingTopics);
});

router.get('/emerging', (req, res) => {
  const data = getTrendsData();
  res.json(data.emerginTrends);
});

router.get('/hashtags', (req, res) => {
  const data = getTrendsData();
  res.json(data.hashtagAnalysis);
});

router.get('/products', (req, res) => {
  const data = getTrendsData();
  res.json(data.productTrends);
});

module.exports = router;
