import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();

router.post('/signup', async (req, res) => {
  try {
    const { email, password, role } = req.body || {};
    if (!email || !password || !role) return res.status(400).json({ error: 'email, password, role required' });
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) return res.status(400).json({ error: 'Email already registered' });
    const hash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({ data: { email, password: hash, role } });
    if (role === 'student') {
      await prisma.studentProfile.create({ data: { userId: user.id } });
    }
    return res.json({ id: user.id, email: user.email, role: user.role });
  } catch (e) {
    return res.status(500).json({ error: 'Signup failed' });
  }
});

router.post('/login', async (req, res) => {
  try {
    console.log("👉 Raw body:", req.body); // see what frontend sends

    const { email, password } = req.body || {};
    console.log("👉 Extracted email and password:", { email, password });

    if (!email || !password) {
      console.log("❌ Missing email or password");
      return res.status(400).json({ error: 'email and password required' });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    console.log("👉 Found user in DB:", user);

    if (!user) {
      console.log("❌ No user found with this email");
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const ok = await bcrypt.compare(password, user.password);
    console.log("👉 Password match result:", ok);

    if (!ok) {
      console.log("❌ Password did not match");
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role, email: user.email },
      process.env.JWT_SECRET || 'devsecret',
      { expiresIn: '7d' }
    );

    console.log("✅ Login successful, sending token");

    return res.json({ access: token, role: user.role, user: { id: user.id, email: user.email } });
  } catch (e) {
    console.error("❌ Login failed:", e);
    return res.status(500).json({ error: 'Login failed' });
  }
});


export default router;


