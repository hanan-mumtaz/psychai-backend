const crypto = require('crypto');

// Master Encryption Key (32 bytes for AES-256-GCM)
// In production, load from KMS / environment variables
const ENCRYPTION_SECRET = process.env.HIPAA_MASTER_KEY || 'psych_ai_hipaa_master_encryption_key_2026_aes256';
const KEY = crypto.createHash('sha256').update(String(ENCRYPTION_SECRET)).digest();

const TOKEN_SECRET = process.env.HIPAA_TOKEN_SECRET || 'psych_ai_secure_token_hmac_secret_2026';

/**
 * 1. AES-256-GCM Authenticated Encryption for PHI (Protected Health Information)
 * Returns string formatted as: ivHex:authTagHex:encryptedHex
 */
function encryptPhi(plainText) {
  if (plainText === undefined || plainText === null) return plainText;
  const text = typeof plainText === 'object' ? JSON.stringify(plainText) : String(plainText);
  
  const iv = crypto.randomBytes(12); // 96-bit standard IV for GCM
  const cipher = crypto.createCipheriv('aes-256-gcm', KEY, iv);
  
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const authTag = cipher.getAuthTag().toString('hex');
  
  return `${iv.toString('hex')}:${authTag}:${encrypted}`;
}

/**
 * 2. AES-256-GCM Authenticated Decryption
 */
function decryptPhi(encryptedString) {
  if (!encryptedString || typeof encryptedString !== 'string' || !encryptedString.includes(':')) {
    return encryptedString;
  }
  
  try {
    const parts = encryptedString.split(':');
    if (parts.length !== 3) return encryptedString;
    
    const [ivHex, authTagHex, encryptedHex] = parts;
    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');
    
    const decipher = crypto.createDecipheriv('aes-256-gcm', KEY, iv);
    decipher.setAuthTag(authTag);
    
    let decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    try {
      return JSON.parse(decrypted);
    } catch {
      return decrypted;
    }
  } catch (err) {
    console.warn('Decryption fallback (raw text or corrupted tag):', err.message);
    return encryptedString;
  }
}

/**
 * 3. Secure Time-Sensitive HMAC-SHA256 Token for Clinical Reports (24h TTL)
 */
function generateSecureReportToken(sessionId, clinicianEmail, ttlMinutes = 1440) {
  const expiresAt = Date.now() + (ttlMinutes * 60 * 1000);
  const payload = `${sessionId}|${clinicianEmail}|${expiresAt}`;
  const hmac = crypto.createHmac('sha256', TOKEN_SECRET).update(payload).digest('hex');
  const token = Buffer.from(`${payload}|${hmac}`).toString('base64url');
  return { token, expiresAt: new Date(expiresAt).toISOString() };
}

/**
 * 4. Verify Secure Report Token
 */
function verifySecureReportToken(token) {
  try {
    const decoded = Buffer.from(token, 'base64url').toString('utf8');
    const parts = decoded.split('|');
    if (parts.length !== 4) return { valid: false, reason: 'Invalid token structure' };
    
    const [sessionId, clinicianEmail, expiresAtStr, receivedHmac] = parts;
    const expiresAt = parseInt(expiresAtStr, 10);
    
    if (Date.now() > expiresAt) {
      return { valid: false, reason: 'Secure link has expired (24-hour HIPAA TTL exceeded)' };
    }
    
    const payload = `${sessionId}|${clinicianEmail}|${expiresAtStr}`;
    const expectedHmac = crypto.createHmac('sha256', TOKEN_SECRET).update(payload).digest('hex');
    
    if (!crypto.timingSafeEqual(Buffer.from(receivedHmac), Buffer.from(expectedHmac))) {
      return { valid: false, reason: 'Invalid token signature / tampering detected' };
    }
    
    return {
      valid: true,
      sessionId,
      clinicianEmail,
      expiresAt: new Date(expiresAt).toISOString()
    };
  } catch (err) {
    return { valid: false, reason: err.message };
  }
}

/**
 * 5. Immutable Cryptographic SHA-256 Hash Chaining for Audit Ledger
 */
function computeAuditHash(entry, prevHash = 'GENESIS_HIPAA_ROOT_2026') {
  const dataString = `${prevHash}|${entry.timestamp}|${entry.action}|${entry.clinicianEmail}|${entry.patientId}|${entry.status}|${JSON.stringify(entry.details || {})}`;
  return crypto.createHash('sha256').update(dataString).digest('hex');
}

module.exports = {
  encryptPhi,
  decryptPhi,
  generateSecureReportToken,
  verifySecureReportToken,
  computeAuditHash
};

