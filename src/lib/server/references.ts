import { randomUUID } from "crypto";
import { mkdir, unlink, writeFile } from "fs/promises";
import path from "path";
import { readJsonFile, writeJsonFile } from "@/lib/server/store";

const FILE = "references.json";
const UPLOAD_DIR = path.join(process.cwd(), "data", "uploads", "referanslar");
const UPLOAD_URL_PREFIX = "/api/uploads/referanslar";

export type BrandReference = {
  id: string;
  name: string;
  website: string;
  logo: string;
  createdAt: number;
};

async function getAll(): Promise<BrandReference[]> {
  return readJsonFile(FILE, []);
}

async function saveAll(items: BrandReference[]): Promise<void> {
  await writeJsonFile(FILE, items);
}

export async function listReferences(): Promise<BrandReference[]> {
  const items = await getAll();
  return items.sort((a, b) => b.createdAt - a.createdAt);
}

async function saveLogo(id: string, file: File | null): Promise<string | null> {
  if (!file || file.size === 0) return null;
  const dir = path.join(UPLOAD_DIR, id);
  await mkdir(dir, { recursive: true });
  const ext = path.extname(file.name) || ".png";
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(dir, filename), buffer);
  return `${UPLOAD_URL_PREFIX}/${id}/${filename}`;
}

async function deleteLogoFile(logo: string) {
  if (!logo.startsWith(UPLOAD_URL_PREFIX)) return;
  const relative = logo.slice(UPLOAD_URL_PREFIX.length + 1);
  await unlink(path.join(UPLOAD_DIR, relative)).catch(() => {});
}

export async function createReference(data: {
  name: string;
  website: string;
  logoFile: File | null;
}): Promise<BrandReference> {
  const id = randomUUID();
  const logo = (await saveLogo(id, data.logoFile)) ?? "";

  const item: BrandReference = {
    id,
    name: data.name.trim(),
    website: data.website.trim(),
    logo,
    createdAt: Date.now(),
  };

  const items = await getAll();
  items.push(item);
  await saveAll(items);
  return item;
}

export async function updateReference(
  id: string,
  data: { name: string; website: string; logoFile: File | null }
): Promise<BrandReference | undefined> {
  const items = await getAll();
  const idx = items.findIndex((r) => r.id === id);
  if (idx === -1) return undefined;

  const existing = items[idx];
  const newLogo = await saveLogo(id, data.logoFile);
  if (newLogo && existing.logo) await deleteLogoFile(existing.logo);

  const updated: BrandReference = {
    ...existing,
    name: data.name.trim(),
    website: data.website.trim(),
    logo: newLogo ?? existing.logo,
  };

  items[idx] = updated;
  await saveAll(items);
  return updated;
}

export async function deleteReference(id: string): Promise<void> {
  const items = await getAll();
  const target = items.find((r) => r.id === id);
  await saveAll(items.filter((r) => r.id !== id));
  if (target?.logo) await deleteLogoFile(target.logo);
}
