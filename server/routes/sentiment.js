const express = require('express');
const router = express.Router();

// Mock sentiment analysis
const getSentimentAnalysis = () => {
  return {
    overallSentiment: 0.68,
    breakdown: {
      positive: {
        percentage: 68,
        count: 10704,
        trend: 'up',
        change: 5.2
      },
      neutral: {
        percentage: 22,
        count: 3463,
        trend: 'stable',
        change: 0.1
      },
      negative: {
        percentage: 10,
        count: 1574,
        trend: 'down',
        change: -2.1
      }
    },
    bySentiment: [
      {
        sentiment: 'positive',
        topThemes: ['Quality', 'Price', 'Customer Service', 'Design'],
        topPosts: [
          { content: 'Love this brand! Great quality', likes: 1250, author: 'happy_shopper' },
          { content: 'Best purchase ever!', likes: 890, author: 'retail_lover' }
        ]
      },
      {
        sentiment: 'negative',
        topThemes: ['Shipping Delays', 'Quality Issues', 'Return Policy'],
        topPosts: [
          { content: 'Waited 3 weeks for delivery', likes: 450, author: 'frustrated_buyer' },
          { content: 'Item arrived damaged', likes: 320, author: 'unhappy_customer' }
        ]
      }
    ],
    sentimentTrend: [
      { date: '2024-08-04', positive: 65, neutral: 24, negative: 11 },
      { date: '2024-08-05', positive: 66, neutral: 23, negative: 11 },
      { date: '2024-08-06', positive: 67, neutral: 23, negative: 10 },
      { date: '2024-08-07', positive: 68, neutral: 22, negative: 10 },
      { date: '2024-08-08', positive: 68, neutral: 22, negative: 10 },
      { date: '2024-08-09', positive: 68, neutral: 22, negative: 10 },
      { date: '2024-08-11', positive: 68, neutral: 22, negative: 10 }
    ]
  };
};

router.get('/analysis', (req, res) => {
  try {
    const analysis = getSentimentAnalysis();
    res.json(analysis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/trend', (req, res) => {
  const analysis = getSentimentAnalysis();
  res.json(analysis.sentimentTrend);
});

router.post('/analyze', (req, res) => {
  const { text } = req.body;
  // Simple mock sentiment analysis
  const sentiment = Math.random() > 0.5 ? 'positive' : Math.random() > 0.5 ? 'negative' : 'neutral';
  res.json({ text, sentiment, score: Math.random() * 2 - 1 });
});

module.exports = router;
