/**
 * Security & Sanitization Utility
 * Guards against XSS, script injection, and payload attacks
 */

// Strip HTML tags and dangerous characters
export function sanitizeInput(input) {
  if (typeof input !== 'string') return '';
  return input
    .replace(/[<>]/g, '') // strip tag brackets
    .replace(/javascript:/gi, '') // strip JS pseudo protocol
    .replace(/onload|onclick|onerror|onmouseover/gi, '') // strip inline event handlers
    .trim()
    .slice(0, 1000); // enforce maximum payload length
}

// Simple client-side token bucket rate limiter
const submissions = [];

export function checkRateLimit(maxRequests = 5, windowMs = 60000) {
  const now = Date.now();
  // Filter out timestamps outside window
  const recent = submissions.filter(time => now - time < windowMs);
  if (recent.length >= maxRequests) {
    return false; // Rate limit exceeded
  }
  recent.push(now);
  submissions.length = 0;
  submissions.push(...recent);
  return true;
}
