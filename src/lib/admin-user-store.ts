import { DEFAULT_SEED_ADMIN_EMAIL, DEFAULT_SEED_ADMIN_PASSWORD } from "@/lib/auth/constants";
import { hashPassword } from "@/lib/auth/password";
import { prisma } from "@/lib/prisma";

function getSeedAdminEmail(): string {
  return process.env.ADMIN_SEED_EMAIL?.trim().toLowerCase() || DEFAULT_SEED_ADMIN_EMAIL;
}

function getSeedAdminPassword(): string {
  return process.env.ADMIN_SEED_PASSWORD || DEFAULT_SEED_ADMIN_PASSWORD;
}

export async function ensureAdminUserSeeded() {
  const count = await prisma.adminUser.count();
  if (count > 0) {
    return;
  }

  const email = getSeedAdminEmail();
  const passwordHash = await hashPassword(getSeedAdminPassword());

  await prisma.adminUser.create({
    data: {
      email,
      passwordHash,
      role: "ADMIN"
    }
  });
}

export async function getAdminUserByEmail(email: string) {
  await ensureAdminUserSeeded();
  return prisma.adminUser.findUnique({ where: { email: email.toLowerCase() } });
}
