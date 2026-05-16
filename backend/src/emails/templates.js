const gold = '#B8962E';
const cream = '#FAF7F2';
const charcoal = '#1E1A16';

function baseLayout(content) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
</head>
<body style="margin:0;padding:0;background:#F2EDE4;font-family:'Georgia',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F2EDE4;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#FAF7F2;max-width:600px;">
        <!-- Header -->
        <tr>
          <td style="background:${charcoal};padding:36px 40px;text-align:center;border-bottom:2px solid ${gold};">
            <p style="margin:0;font-size:10px;letter-spacing:6px;text-transform:uppercase;color:rgba(255,255,255,0.4);margin-bottom:8px;">Personalized Magazines</p>
            <h1 style="margin:0;font-size:36px;font-weight:300;letter-spacing:8px;color:${gold};text-transform:uppercase;">IDORA</h1>
          </td>
        </tr>
        <!-- Body -->
        <tr><td style="padding:48px 40px;">${content}</td></tr>
        <!-- Footer -->
        <tr>
          <td style="background:${charcoal};padding:28px 40px;text-align:center;">
            <p style="margin:0;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,0.3);">
              © 2026 IDORA · hello@idora-mag.com · @idora-mag
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function customerConfirmation(order) {
  const typeLabel = order.type === 'couple' ? 'Couple Magazine — Love Edition' : 'Birthday Magazine';
  return baseLayout(`
    <p style="margin:0 0 8px;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:${gold};">Order Confirmed</p>
    <h2 style="margin:0 0 28px;font-size:28px;font-weight:300;color:${charcoal};line-height:1.2;">
      Thank you, <em style="color:${gold};">${order.yourName}</em>
    </h2>
    <p style="margin:0 0 24px;font-size:15px;line-height:1.9;color:#4A4238;">
      We've received your order and we're excited to start working on your personalized magazine.
      Our team will be in touch within <strong>24 hours</strong> to confirm the details.
    </p>
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid rgba(184,150,46,0.25);margin-bottom:28px;">
      <tr><td style="padding:20px 24px;border-bottom:1px solid rgba(184,150,46,0.15);">
        <p style="margin:0;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:${gold};">Order Summary</p>
      </td></tr>
      <tr><td style="padding:16px 24px;border-bottom:1px solid rgba(184,150,46,0.1);">
        <span style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#999;">Magazine Type</span><br/>
        <span style="font-size:15px;color:${charcoal};">${typeLabel}</span>
      </td></tr>
      <tr><td style="padding:16px 24px;border-bottom:1px solid rgba(184,150,46,0.1);">
        <span style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#999;">Names</span><br/>
        <span style="font-size:15px;color:${charcoal};">${order.magNames}</span>
      </td></tr>
      <tr><td style="padding:16px 24px;">
        <span style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#999;">Order ID</span><br/>
        <span style="font-size:13px;color:#999;font-family:monospace;">${order.id}</span>
      </td></tr>
    </table>
    <p style="margin:0 0 28px;font-size:14px;line-height:1.9;color:#4A4238;">
      While you wait, follow us on Instagram <a href="https://instagram.com/idora-mag" style="color:${gold};">@idora-mag</a> to see more of our work.
    </p>
    <p style="margin:0;font-size:13px;color:#999;font-style:italic;">With love, the IDORA team ✦</p>
  `);
}

function adminNotification(order) {
  const typeLabel = order.type === 'couple' ? 'Couple Magazine — Love Edition' : 'Birthday Magazine';
  return baseLayout(`
    <p style="margin:0 0 8px;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:${gold};">New Order Received</p>
    <h2 style="margin:0 0 28px;font-size:28px;font-weight:300;color:${charcoal};">New order from <em style="color:${gold};">${order.yourName}</em></h2>
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid rgba(184,150,46,0.25);margin-bottom:28px;">
      <tr><td style="padding:16px 24px;border-bottom:1px solid rgba(184,150,46,0.1);">
        <strong style="font-size:11px;color:#999;letter-spacing:2px;text-transform:uppercase;">Type</strong><br/>
        <span style="font-size:15px;color:${charcoal};">${typeLabel}</span>
      </td></tr>
      <tr><td style="padding:16px 24px;border-bottom:1px solid rgba(184,150,46,0.1);">
        <strong style="font-size:11px;color:#999;letter-spacing:2px;text-transform:uppercase;">Names on Magazine</strong><br/>
        <span style="font-size:15px;color:${charcoal};">${order.magNames}</span>
      </td></tr>
      <tr><td style="padding:16px 24px;border-bottom:1px solid rgba(184,150,46,0.1);">
        <strong style="font-size:11px;color:#999;letter-spacing:2px;text-transform:uppercase;">Client Email</strong><br/>
        <a href="mailto:${order.email}" style="font-size:15px;color:${gold};">${order.email}</a>
      </td></tr>
      <tr><td style="padding:16px 24px;border-bottom:1px solid rgba(184,150,46,0.1);">
        <strong style="font-size:11px;color:#999;letter-spacing:2px;text-transform:uppercase;">Story</strong><br/>
        <span style="font-size:14px;line-height:1.8;color:#4A4238;">${order.story}</span>
      </td></tr>
      <tr><td style="padding:16px 24px;">
        <strong style="font-size:11px;color:#999;letter-spacing:2px;text-transform:uppercase;">Order ID</strong><br/>
        <span style="font-size:13px;font-family:monospace;color:#999;">${order.id}</span>
      </td></tr>
    </table>
    <a href="http://localhost:3001/admin" style="display:inline-block;background:${gold};color:white;padding:14px 32px;text-decoration:none;font-size:12px;letter-spacing:3px;text-transform:uppercase;">View in Admin Panel</a>
  `);
}

module.exports = { customerConfirmation, adminNotification };
