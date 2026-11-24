const rateStore = new Map();

function cleanString(value, maxLen = 1000) {
  if (typeof value !== 'string') return '';
  return value
    .replace(/<[^>]*>/g, '')
    .replace(/[\r\n\t]+/g, ' ')
    .trim()
    .slice(0, maxLen);
}

function cleanMessage(value, maxLen = 3000) {
  if (typeof value !== 'string') return '';
  return value
    .replace(/<[^>]*>/g, '')
    .trim()
    .slice(0, maxLen);
}

function isRateLimited(ip) {
  const now = Date.now();
  const windowMs = 60 * 1000;
  const maxRequests = 5;
  const entries = (rateStore.get(ip) || []).filter((t) => now - t < windowMs);
  if (entries.length >= maxRequests) {
    rateStore.set(ip, entries);
    return true;
  }
  entries.push(now);
  rateStore.set(ip, entries);
  return false;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const forwarded = req.headers['x-forwarded-for'];
  const clientIp = Array.isArray(forwarded)
    ? forwarded[0]
    : (forwarded || req.socket?.remoteAddress || 'unknown').split(',')[0].trim();

  if (isRateLimited(clientIp)) {
    return res.status(429).json({
      ok: false,
      error: 'Too many requests. Please wait a minute before sending again.'
    });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  const name = cleanString(body.name, 120);
  const email = cleanString(body.email, 160);
  const subject = cleanString(body.subject, 200) || 'Portfolio Inquiry';
  const message = cleanMessage(body.message, 3000);

  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: 'Name, email, and message are required.' });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ ok: false, error: 'Please provide a valid email address.' });
  }

  const targetEmail = process.env.CONTACT_TO_EMAIL || 'workufikadu643@gmail.com';
  const resendApiKey = process.env.RESEND_API_KEY;
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;

  try {
    if (resendApiKey) {
      const resp = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM_EMAIL || 'Worku Portfolio <onboarding@resend.dev>',
          to: [targetEmail],
          reply_to: email,
          subject: `[Portfolio] ${subject} — from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`
        })
      });

      if (resp.ok) {
        return res.status(200).json({
          ok: true,
          delivered: true,
          provider: 'resend',
          message: 'Your inquiry has been delivered directly to Worku Fikadu.'
        });
      }
    }

    if (webhookUrl) {
      const resp = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message, source: 'portfolio-contact' })
      });

      if (resp.ok) {
        return res.status(200).json({
          ok: true,
          delivered: true,
          provider: 'webhook',
          message: 'Your inquiry has been delivered directly to Worku Fikadu.'
        });
      }
    }

    // No server mail key configured yet — return validated handoff payload so client opens direct Email/WhatsApp/Telegram
    return res.status(200).json({
      ok: true,
      delivered: false,
      mode: 'handoff',
      message: 'Validated inquiry ready for direct Email, WhatsApp, or Telegram delivery.'
    });
  } catch {
    return res.status(502).json({
      ok: false,
      error: 'Unable to reach delivery service. Please use the direct Email or WhatsApp buttons below.'
    });
  }
}
