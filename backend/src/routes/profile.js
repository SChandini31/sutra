import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { requireAuth, requireRole } from '../middleware/auth.js';

const prisma = new PrismaClient();
const router = Router();

router.get('/', requireAuth, requireRole(['student', 'faculty', 'admin', 'parent']), async (req, res) => {
  try {
    if (req.user.role === 'student') {
      const profile = await prisma.studentProfile.findUnique({ where: { userId: req.user.id } });
      return res.json(profile || {});
    }
    // For non-student roles, return basic user info
    const user = await prisma.user.findUnique({ where: { id: req.user.id }, select: { id: true, email: true, role: true } });
    return res.json(user || {});
  } catch (e) {
    return res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

router.put('/update', requireAuth, requireRole(['student']), async (req, res) => {
  try {
    const { name, college, department, year, dob, additional_details } = req.body || {};
    const existing = await prisma.studentProfile.findUnique({ where: { userId: req.user.id } });
    if (!existing) return res.status(404).json({ error: 'Profile not found' });
    const updated = await prisma.studentProfile.update({
      where: { id: existing.id },
      data: { name, college, department, year, dob, additional_details },
    });
    return res.json(updated);
  } catch (e) {
    return res.status(500).json({ error: 'Failed to update profile' });
  }
});

export default router;


