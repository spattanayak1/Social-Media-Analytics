const express = require('express');
const router = express.Router();

// Mock brand intelligence data
const getBrandData = () => {
  return {
    brandMentions: {
      total: 8950,
      trend: 'up',
      change: 12.5
    },
    brandHealth: {
      score: 82,
      sentiment: 0.68,
      awareness: 87,
      consideration: 74,
      loyalty: 69
    },
    mentionsSources: [
      { source: 'Twitter', mentions: 3200, sentiment: 0.65 },
      { source: 'Instagram', mentions: 2800, sentiment: 0.72 },
      { source: 'Facebook', mentions: 1650, sentiment: 0.61 },
      { source: 'YouTube', mentions: 1300, sentiment: 0.75 }
    ],
    topBrandMentions: [
      { content: 'Love this brand for sustainability!', platform: 'Instagram', likes: 2150 },
      { content: 'Best customer service experience', platform: 'Twitter', likes: 1890 },
      { content: 'Quality products worth the price', platform: 'Facebook', likes: 1650 }
    ],
    productMentions: [
      { product: 'EcoLine Collection', mentions: 1540, sentiment: 0.81 },
      { product: 'Premium Basics', mentions: 1280, sentiment: 0.75 },
      { product: 'Smart Accessories', mentions: 980, sentiment: 0.68 },
      { product: 'Limited Edition', mentions: 850, sentiment: 0.72 }
    ],
    campaignPerformance: [
      {
        id: 'camp_001',
        name: '#SummerSale2024',
        startDate: '2024-07-15',
        endDate: '2024-08-15',
        mentions: 2340,
        engagement: 18500,
        sentiment: 0.74,
        reach: 450000
      },
      {
        id: 'camp_002',
        name: '#BackToSchool',
        startDate: '2024-08-01',
        endDate: '2024-08-31',
        mentions: 1890,
        engagement: 15200,
        sentiment: 0.71,
        reach: 380000
      }
    ],
    competitorComparison: {
      brand: 'Your Brand',
      competitors: [
        { name: 'Competitor A', mentions: 5600, sentiment: 0.62, marketShare: 28 },
        { name: 'Competitor B', mentions: 4200, sentiment: 0.58, marketShare: 21 },
        { name: 'Competitor C', mentions: 3100, sentiment: 0.64, marketShare: 16 }
      ]
    }
  };
};

router.get('/intelligence', (req, res) => {
  try {
    const data = getBrandData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/mentions', (req, res) => {
  const data = getBrandData();
  res.json({
    total: data.brandMentions.total,
    trend: data.brandMentions.trend,
    change: data.brandMentions.change,
    sources: data.mentionsSources
  });
});

router.get('/health', (req, res) => {
  const data = getBrandData();
  res.json(data.brandHealth);
});

router.get('/products', (req, res) => {
  const data = getBrandData();
  res.json(data.productMentions);
});

router.get('/campaigns', (req, res) => {
  const data = getBrandData();
  res.json(data.campaignPerformance);
});

module.exports = router;
