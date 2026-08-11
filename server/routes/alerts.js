const express = require('express');
const router = express.Router();

// Mock alerts data
const getAlertsData = () => {
  return {
    activeAlerts: [
      {
        id: 'alert_001',
        type: 'viral_post',
        severity: 'high',
        title: 'Viral Post Detected',
        description: 'Your new product announcement went viral on Instagram',
        platform: 'Instagram',
        engagement: 15200,
        reach: 450000,
        createdAt: new Date(Date.now() - 3600000),
        status: 'active'
      },
      {
        id: 'alert_002',
        type: 'negative_sentiment',
        severity: 'medium',
        title: 'Spike in Negative Mentions',
        description: 'Unusual increase in negative sentiment on Twitter',
        platform: 'Twitter',
        sentimentScore: -0.72,
        mentionCount: 234,
        createdAt: new Date(Date.now() - 7200000),
        status: 'active'
      },
      {
        id: 'alert_003',
        type: 'competitor_mention',
        severity: 'low',
        title: 'Competitor Comparison',
        description: 'Users comparing your brand with Competitor A',
        platform: 'Facebook',
        sentimentScore: 0.45,
        mentionCount: 87,
        createdAt: new Date(Date.now() - 10800000),
        status: 'acknowledged'
      },
      {
        id: 'alert_004',
        type: 'emerging_issue',
        severity: 'critical',
        title: 'Quality Complaint Trend',
        description: 'Multiple customers reporting quality issues with new batch',
        platform: 'Multiple',
        sentimentScore: -0.88,
        mentionCount: 156,
        createdAt: new Date(Date.now() - 14400000),
        status: 'active'
      }
    ],
    alertTrends: [
      { date: '2024-08-04', total: 5, negative: 2, viral: 1 },
      { date: '2024-08-05', total: 7, negative: 3, viral: 2 },
      { date: '2024-08-06', total: 6, negative: 2, viral: 2 },
      { date: '2024-08-07', total: 8, negative: 4, viral: 1 },
      { date: '2024-08-08', total: 9, negative: 5, viral: 2 },
      { date: '2024-08-09', total: 7, negative: 3, viral: 1 },
      { date: '2024-08-11', total: 4, negative: 2, viral: 1 }
    ],
    alertsByType: [
      { type: 'negative_sentiment', count: 28, percentage: 42 },
      { type: 'viral_post', count: 12, percentage: 18 },
      { type: 'emerging_issue', count: 18, percentage: 27 },
      { type: 'competitor_mention', count: 8, percentage: 12 }
    ],
    alertsBySeverity: [
      { severity: 'critical', count: 5, percentage: 7.5 },
      { severity: 'high', count: 18, percentage: 27 },
      { severity: 'medium', count: 35, percentage: 52.5 },
      { severity: 'low', count: 8, percentage: 12 }
    ]
  };
};

router.get('/all', (req, res) => {
  try {
    const data = getAlertsData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/active', (req, res) => {
  const data = getAlertsData();
  const activeAlerts = data.activeAlerts.filter(a => a.status === 'active');
  res.json(activeAlerts);
});

router.get('/by-severity', (req, res) => {
  const data = getAlertsData();
  res.json(data.alertsBySeverity);
});

router.get('/by-type', (req, res) => {
  const data = getAlertsData();
  res.json(data.alertsByType);
});

router.get('/trends', (req, res) => {
  const data = getAlertsData();
  res.json(data.alertTrends);
});

router.put('/:alertId/acknowledge', (req, res) => {
  res.json({ success: true, message: 'Alert acknowledged', alertId: req.params.alertId });
});

router.put('/:alertId/resolve', (req, res) => {
  res.json({ success: true, message: 'Alert resolved', alertId: req.params.alertId });
});

module.exports = router;
