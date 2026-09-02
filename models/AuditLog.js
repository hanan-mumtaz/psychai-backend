const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  },
  action: {
    type: String,
    required: true,
    enum: [
      'VIEW_SESSIONS_LIST',
      'VIEW_SESSION_DETAIL',
      'EVALUATE_AI_SESSION',
      'SAVE_SESSION_RECORD',
      'DOWNLOAD_PDF_REPORT',
      'DISPATCH_EMAIL_REPORT',
      'GENERATE_SECURE_LINK',
      'ACCESS_SECURE_LINK',
      'AUTH_LOGIN',
      'AUTH_REGISTER',
      'AUTH_LOGOUT',
      'UPDATE_CLINICIAN_PROFILE',
      'PURGE_LOCAL_DATABASE',
      'SEED_DEMO_DATA',
      'GDPR_CONSENT_GRANTED',
      'GDPR_CONSENT_REVOKED',
      'GDPR_DATA_EXPORT_PORTABILITY',
      'GDPR_RIGHT_TO_BE_FORGOTTEN_ERASURE'
    ],
    index: true
  },
  clinicianEmail: {
    type: String,
    default: 'anonymous_clinician@psych.ai'
  },
  clinicianName: {
    type: String,
    default: 'Attending Clinician'
  },
  clinicianRole: {
    type: String,
    default: 'Consultant Clinical Psychiatrist'
  },
  clinicianLicense: {
    type: String,
    default: 'PRO-CLINICAL-2026'
  },
  patientId: {
    type: String,
    default: null
  },
  patientName: {
    type: String,
    default: null
  },
  ipAddress: {
    type: String,
    default: '127.0.0.1'
  },
  userAgent: {
    type: String,
    default: 'Psych.ai Client Engine'
  },
  status: {
    type: String,
    enum: ['SUCCESS', 'DENIED', 'WARNING', 'ERROR'],
    default: 'SUCCESS'
  },
  details: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  prevHash: {
    type: String,
    default: 'GENESIS_HIPAA_ROOT_2026'
  },
  hash: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('AuditLog', auditLogSchema);

