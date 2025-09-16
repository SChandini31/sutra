import 'dotenv/config';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const users = [
    { email: 'student@sutra.app', password: 'Password123', role: 'student' },
    { email: 'faculty@sutra.app', password: 'Password123', role: 'faculty' },
    { email: 'admin@sutra.app', password: 'Password123', role: 'admin' },
    { email: 'parent@sutra.app', password: 'Password123', role: 'parent' },
  ];

  for (const u of users) {
    const exists = await prisma.user.findUnique({ where: { email: u.email } });
    if (exists) continue;
    const hash = await bcrypt.hash(u.password, 10);
    const created = await prisma.user.create({ data: { email: u.email, password: hash, role: u.role } });
    if (u.role === 'student') {
      await prisma.studentProfile.create({ data: { userId: created.id, name: 'Sample Student', department: 'CSE', college: 'Sutra University', year: 'III' } });
    }
  }

  // Link parent -> wardId (first student profile)
  const studentProfile = await prisma.studentProfile.findFirst();
  const parent = await prisma.user.findUnique({ where: { email: 'parent@sutra.app' } });
  if (studentProfile && parent && !parent.wardId) {
    await prisma.user.update({ where: { id: parent.id }, data: { wardId: studentProfile.id } });
  }

  // Sample marks for student
  if (studentProfile) {
    const count = await prisma.mark.count({ where: { studentId: studentProfile.id } });
    if (count === 0) {
      const samples = [
        { subject: 'Math', marks: 82, semester: 'V' },
        { subject: 'Physics', marks: 76, semester: 'V' },
        { subject: 'Chemistry', marks: 88, semester: 'V' },
        { subject: 'CS', marks: 92, semester: 'V' },
        { subject: 'English', marks: 79, semester: 'V' },
      ];
      for (const s of samples) {
        await prisma.mark.create({ data: { studentId: studentProfile.id, subject: s.subject, marks: s.marks, semester: s.semester } });
      }
    }
  }

  // eslint-disable-next-line no-console
  console.log('Seed complete.');
}

main().finally(async () => {
  await prisma.$disconnect();
});


