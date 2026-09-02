const express = require('express');
const router = express.Router();
const Session = require('../models/Session');

// 1. GET ALL SESSIONS (For ClinicalDashboard.jsx)
router.get('/', async (req, res) => {
  try {
    const sessions = await Session.find().sort({ createdAt: -1 });
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: "Server Error fetching sessions", error: error.message });
  }
});

// 2. POST NEW COMPLETED AI SESSION (Triggered by React Native after FastAPI finishes)
router.post('/save-result', async (req, res) => {
  try {
    const { name, age, duration, mood, tags, diagnosis, confidence, keyTimestamp } = req.body;

    // Determine the risk tier natively on the backend based on AI output criteria
    let risk = 'low';
    const isPositive = diagnosis.toLowerCase().includes('positive');
    
    if (isPositive && confidence >= 75) risk = 'high';
    else if (isPositive && confidence < 75) risk = 'moderate';

    // Map profile colors to easily align with your frontend styles
    const colors = ['#7C6EAD', '#4A9B8E', '#B85C5C', '#5C84B8'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const newSession = new Session({
      name,
      age,
      duration,
      mood,
      tags,
      status: 'analyzed',
      risk,
      diagnosis,
      confidence,
      keyTimestamp,
      color: randomColor
    });

    const savedSession = await newSession.save();
    res.status(201).json({ success: true, session: savedSession });
  } catch (error) {
    res.status(500).json({ message: "Failed to store AI session", error: error.message });
  }
});

module.exports = router;