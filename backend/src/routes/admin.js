const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const path = require('path');

const prisma = new PrismaClient();

// Simple token auth middleware
function auth(req, res, next) {
  const token = req.headers['x-admin-secret'] || req.query.secret;
  if (token !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

// GET /api/admin/orders
router.get('/orders', auth, async (req, res) => {
  const { status, search } = req.query;
  const where = {};
  if (status && status !== 'all') where.status = status;
  if (search) {
    where.OR = [
      { magNames: { contains: search } },
      { yourName: { contains: search } },
      { email: { contains: search } }
    ];
  }
  const orders = await prisma.order.findMany({
    where,
    orderBy: { createdAt: 'desc' }
  });
  res.json(orders);
});

// GET /api/admin/orders/:id
router.get('/orders/:id', auth, async (req, res) => {
  const order = await prisma.order.findUnique({ where: { id: req.params.id } });
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json(order);
});

// PATCH /api/admin/orders/:id — update status or notes
router.patch('/orders/:id', auth, async (req, res) => {
  const { status, notes } = req.body;
  const data = {};
  if (status) data.status = status;
  if (notes !== undefined) data.notes = notes;
  const order = await prisma.order.update({
    where: { id: req.params.id },
    data
  });
  res.json(order);
});

// DELETE /api/admin/orders/:id
router.delete('/orders/:id', auth, async (req, res) => {
  await prisma.order.delete({ where: { id: req.params.id } });
  res.json({ success: true });
});

// GET /api/admin/stats
router.get('/stats', auth, async (req, res) => {
  const [total, pending, inProgress, done, delivered] = await Promise.all([
    prisma.order.count(),
    prisma.order.count({ where: { status: 'pending' } }),
    prisma.order.count({ where: { status: 'in_progress' } }),
    prisma.order.count({ where: { status: 'done' } }),
    prisma.order.count({ where: { status: 'delivered' } })
  ]);
  res.json({ total, pending, inProgress, done, delivered });
});

module.exports = router;
