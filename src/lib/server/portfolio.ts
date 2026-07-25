import { randomUUID } from "crypto";
import { mkdir, unlink, writeFile } from "fs/promises";
import path from "path";
import { readJsonFile, writeJsonFile } from "@/lib/server/store";

const FILE = "portfolio.json";
const UPLOAD_DIR = path.join(process.cwd(), "data", "uploads", "portfolyo");
const UPLOAD_URL_PREFIX = "/api/uploads/portfolyo";

export type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  location: string;
  description: string;
  completedAt: string;
  images: string[];
  createdAt: number;
  updatedAt: number;
};

async function getAll(): Promise<PortfolioItem[]> {
  return readJsonFile(FILE, []);
}

async function saveAll(items: PortfolioItem[]): Promise<void> {
  await writeJsonFile(FILE, items);
}

export async function listPortfolio(): Promise<PortfolioItem[]> {
  const items = await getAll();
  return items.sort((a, b) => b.updatedAt - a.updatedAt);
}

async function saveImages(itemId: string, files: File[]): Promise<string[]> {
  const usable = files.filter((f) => f && f.size > 0);
  if (usable.length === 0) return [];

  const dir = path.join(UPLOAD_DIR, itemId);
  await mkdir(dir, { recursive: true });

  const saved: string[] = [];
  for (const file of usable) {
    const ext = path.extname(file.name) || ".jpg";
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(dir, filename), buffer);
    saved.push(`${UPLOAD_URL_PREFIX}/${itemId}/${filename}`);
  }
  return saved;
}

async function deleteImageFiles(images: string[]) {
  await Promise.allSettled(
    images.map((img) => {
      const relative = img.startsWith(UPLOAD_URL_PREFIX)
        ? img.slice(UPLOAD_URL_PREFIX.length + 1)
        : null;
      if (!relative) return Promise.resolve();
      return unlink(path.join(UPLOAD_DIR, relative));
    })
  );
}

export async function createPortfolioItem(data: {
  title: string;
  category: string;
  location: string;
  description: string;
  completedAt: string;
  imageFiles: File[];
}): Promise<PortfolioItem> {
  const id = randomUUID();
  const images = await saveImages(id, data.imageFiles);
  const now = Date.now();

  const item: PortfolioItem = {
    id,
    title: data.title.trim(),
    category: data.category.trim(),
    location: data.location.trim(),
    description: data.description.trim(),
    completedAt: data.completedAt.trim(),
    images,
    createdAt: now,
    updatedAt: now,
  };

  const items = await getAll();
  items.push(item);
  await saveAll(items);
  return item;
}

export async function updatePortfolioItem(
  id: string,
  data: {
    title: string;
    category: string;
    location: string;
    description: string;
    completedAt: string;
    imageFiles: File[];
    removeImages: string[];
  }
): Promise<PortfolioItem | undefined> {
  const items = await getAll();
  const idx = items.findIndex((p) => p.id === id);
  if (idx === -1) return undefined;

  const existing = items[idx];
  const keptImages = existing.images.filter((img) => !data.removeImages.includes(img));
  const removed = existing.images.filter((img) => data.removeImages.includes(img));
  const newImages = await saveImages(id, data.imageFiles);

  const updated: PortfolioItem = {
    ...existing,
    title: data.title.trim(),
    category: data.category.trim(),
    location: data.location.trim(),
    description: data.description.trim(),
    completedAt: data.completedAt.trim(),
    images: [...keptImages, ...newImages],
    updatedAt: Date.now(),
  };

  items[idx] = updated;
  await saveAll(items);
  if (removed.length > 0) await deleteImageFiles(removed);
  return updated;
}

export async function deletePortfolioItem(id: string): Promise<void> {
  const items = await getAll();
  const target = items.find((p) => p.id === id);
  const remaining = items.filter((p) => p.id !== id);
  await saveAll(remaining);
  if (target && target.images.length > 0) await deleteImageFiles(target.images);
}
