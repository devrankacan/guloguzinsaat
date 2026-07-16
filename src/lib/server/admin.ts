import bcrypt from "bcryptjs";
import { readJsonFile, writeJsonFile } from "@/lib/server/store";

const FILE = "admin.json";

type AdminAccount = {
  username: string;
  passwordHash: string;
};

async function bootstrapFromEnv(): Promise<AdminAccount> {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !password) {
    throw new Error(
      "Admin hesabı bulunamadı. .env dosyasında ADMIN_USERNAME ve ADMIN_PASSWORD tanımlayın."
    );
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const account: AdminAccount = { username, passwordHash };
  await writeJsonFile(FILE, account);
  return account;
}

async function getAccount(): Promise<AdminAccount> {
  const existing = await readJsonFile<AdminAccount | null>(FILE, null);
  if (existing) return existing;
  return bootstrapFromEnv();
}

export async function verifyAdminCredentials(
  username: string,
  password: string
): Promise<boolean> {
  const account = await getAccount();
  if (account.username !== username) return false;
  return bcrypt.compare(password, account.passwordHash);
}

export async function updateAdminPassword(newPassword: string): Promise<void> {
  const account = await getAccount();
  account.passwordHash = await bcrypt.hash(newPassword, 10);
  await writeJsonFile(FILE, account);
}
