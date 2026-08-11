const express = require('express');
const router = express.Router();

// Mock competitor intelligence data
const getCompetitorData = () => {
  return {
    competitors: [
      {
        id: 'comp_001',
        name: 'Competitor A',
        totalMentions: 5600,
        sentiment: 0.62,
        engagementRate: 5.8,
        marketShare: 28,
        topPlatforms: ['Twitter', 'Instagram'],
        followerTrend: 'up',
        followerGrowth: 8.5
      },
      {
        id: 'comp_002',
        name: 'Competitor B',
        totalMentions: 4200,
        sentiment: 0.58,
        engagementRate: 5.2,
        marketShare: 21,
        topPlatforms: ['Facebook', 'YouTube'],
        followerTrend: 'stable',
        followerGrowth: 2.1
      },
      {
        id: 'comp_003',
        name: 'Competitor C',
        totalMentions: 3100,
        sentiment: 0.64,
        engagementRate: 6.5,
        marketShare: 16,
        topPlatforms: ['Instagram', 'TikTok'],
        followerTrend: 'up',
        followerGrowth: 12.3
      }
    ],
    shareOfVoice: [
      { brand: 'Your Brand', percentage: 35 },
      { brand: 'Competitor A', percentage: 28 },
      { brand: 'Competitor B', percentage: 21 },
      { brand: 'Competitor C', percentage: 16 }
    ],
    sentimentComparison: [
      { competitor: 'Your Brand', sentiment: 0.68 },
      { competitor: 'Competitor A', sentiment: 0.62 },
      { competitor: 'Competitor B', sentiment: 0.58 },
      { competitor: 'Competitor C', sentiment: 0.64 }
    ],
    competitorMentions: [
      {
        competitor: 'Competitor A',
        topMentionReasons: ['Price', 'Quality', 'Delivery'],
        topPosts: [
          { content: 'Great deals at Competitor A', likes: 890, date: '2024-08-09' },
          { content: 'Fast shipping', likes: 670, date: '2024-08-08' }
        ]
      }
    ],
    marketTrends: [
      { date: '2024-08-04', yourBrand: 32, competitorA: 26, competitorB: 20, competitorC: 14 },
      { date: '2024-08-05', yourBrand: 33, competitorA: 27, competitorB: 20, competitorC: 15 },
      { date: '2024-08-06', yourBrand: 34, competitorA: 27, competitorB: 21, competitorC: 15 },
      { date: '2024-08-07', yourBrand: 34, competitorA: 28, competitorB: 21, competitorC: 16 },
      { date: '2024-08-08', yourBrand: 35, competitorA: 28, competitorB: 21, competitorC: 16 },
      { date: '2024-08-09', yourBrand: 35, competitorA: 28, competitorB: 21, competitorC: 16 },
      { date: '2024-08-11', yourBrand: 35, competitorA: 28, competitorB: 21, competitorC: 16 }
    ]
  };
};

router.get('/analysis', (req, res) => {
  try {
    const data = getCompetitorData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/list', (req, res) => {
  const data = getCompetitorData();
  res.json(data.competitors);
});

router.get('/share-of-voice', (req, res) => {
  const data = getCompetitorData();
  res.json(data.shareOfVoice);
});

router.get('/sentiment-comparison', (req, res) => {
  const data = getCompetitorData();
  res.json(data.sentimentComparison);
});

router.get('/:competitorId', (req, res) => {
  const data = getCompetitorData();
  const competitor = data.competitors.find(c => c.id === req.params.competitorId);
  if (competitor) {
    res.json(competitor);
  } else {
    res.status(404).json({ error: 'Competitor not found' });
  }
});

module.exports = router;
