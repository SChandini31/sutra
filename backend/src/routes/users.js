import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { requireAuth, requireRole } from '../middleware/auth.js';

const prisma = new PrismaClient();
const router = Router();

router.get('/', requireAuth, requireRole(['admin']), async (req, res) => {
  try {
    const users = await prisma.user.findMany({ select: { id: true, email: true, role: true } });
    return res.json(users);
  } catch (e) {
    return res.status(500).json({ error: 'Failed to fetch users' });
  }
});

export default router;


