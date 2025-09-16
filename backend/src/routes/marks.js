import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { requireAuth, requireRole } from '../middleware/auth.js';

const prisma = new PrismaClient();
const router = Router();

// Faculty upload marks
router.post('/upload', requireAuth, requireRole(['faculty', 'admin']), async (req, res) => {
  try {
    const { student, subject, marks, semester } = req.body || {};
    if (!student || !subject || typeof marks !== 'number' || !semester) {
      return res.status(400).json({ error: 'student, subject, marks(number), semester required' });
    }
    const profile = await prisma.studentProfile.findFirst({ where: { OR: [{ id: Number(student) }, { userId: Number(student) }] } });
    if (!profile) return res.status(404).json({ error: 'Student not found' });
    const created = await prisma.mark.create({ data: { studentId: profile.id, subject, marks, semester } });
    return res.json(created);
  } catch (e) {
    return res.status(500).json({ error: 'Failed to upload marks' });
  }
});

// Get marks by student profile id
router.get('/student/:id', requireAuth, requireRole(['student', 'parent', 'faculty', 'admin']), async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid id' });
    // Authorization: students can fetch only their marks
    if (req.user.role === 'student') {
      const self = await prisma.studentProfile.findUnique({ where: { userId: req.user.id } });
      if (!self || self.id !== id) return res.status(403).json({ error: 'Forbidden' });
    }
    if (req.user.role === 'parent') {
      const parent = await prisma.user.findUnique({ where: { id: req.user.id }, select: { wardId: true } });
      if (!parent?.wardId || parent.wardId !== id) return res.status(403).json({ error: 'Forbidden' });
    }
    const marks = await prisma.mark.findMany({ where: { studentId: id }, orderBy: { createdAt: 'desc' } });
    return res.json(marks);
  } catch (e) {
    return res.status(500).json({ error: 'Failed to fetch marks' });
  }
});

export default router;


