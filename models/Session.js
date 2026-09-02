const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  date: { type: String, default: () => new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }) },
  duration: { type: String, required: true }, // e.g., "45 min"
  mood: { type: String, required: true },     // e.g., "Anxious", "Flat"
  tags: [{ type: String }],                   // e.g., ["speech-pause", "micro-expr"]
  status: { type: String, enum: ['pending', 'analyzed'], default: 'pending' },
  risk: { type: String, enum: ['low', 'moderate', 'high'], default: 'low' },
  
  // AI Engine Metrics
  diagnosis: { type: String },
  confidence: { type: Number },
  keyTimestamp: { type: String }, // XAI highlight window
  
  // Custom styling field from your dashboard design
  color: { type: String, default: '#7C6EAD' } 
}, { timestamps: true });

module.exports = mongoose.model('Session', SessionSchema);