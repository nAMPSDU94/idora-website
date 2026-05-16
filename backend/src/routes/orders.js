const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const upload = require('../middleware/upload');
const nodemailer = require('nodemailer');
const { customerConfirmation, adminNotification } = require('../emails/templates');

const prisma = new PrismaClient();

function getMailer() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
  });
}

// POST /api/orders — create new order
router.post('/', upload.array('photos', 20), async (req, res) => {
  try {
    const { type, yourName, magNames, email, story } = req.body;

    if (!type || !yourName || !magNames || !email || !story) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const photoPaths = (req.files || []).map(f => f.filename);

    const order = await prisma.order.create({
      data: {
        type,
        yourName: yourName.trim(),
        magNames: magNames.trim(),
        email: email.trim().toLowerCase(),
        story: story.trim(),
        photos: JSON.stringify(photoPaths),
        status: 'pending'
      }
    });

    // Send emails (non-blocking)
    if (process.env.SMTP_USER && process.env.SMTP_USER !== 'your-email@gmail.com') {
      const mailer = getMailer();
      mailer.sendMail({
        from: process.env.EMAIL_FROM,
        to: order.email,
        subject: `✦ Your IDORA Magazine Order is Confirmed — ${order.magNames}`,
        html: customerConfirmation(order)
      }).catch(err => console.error('Client email error:', err.message));

      mailer.sendMail({
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_ADMIN,
        subject: `[IDORA] New Order: ${order.magNames} (${order.type})`,
        html: adminNotification(order)
      }).catch(err => console.error('Admin email error:', err.message));
    }

    res.status(201).json({
      success: true,
      orderId: order.id,
      message: 'Order created successfully. We\'ll be in touch within 24 hours!'
    });

  } catch (err) {
    console.error('Order error:', err);
    res.status(500).json({ error: 'Failed to create order. Please try again.' });
  }
});

module.exports = router;
