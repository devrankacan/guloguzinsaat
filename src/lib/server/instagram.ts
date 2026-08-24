import { randomUUID } from "crypto";
import { mkdir, unlink, writeFile } from "fs/promises";
import path from "path";
import { readJsonFile, writeJsonFile } from "@/lib/server/store";

const FILE = "instagram.json";
const UPLOAD_DIR = path.join(process.cwd(), "data", "uploads", "instagram");
const UPLOAD_URL_PREFIX = "/api/uploads/instagram";

export type InstagramPost = {
  id: string;
  image: string;
  caption: string;
  permalink: string;
  createdAt: number;
};

async function getAll(): Promise<InstagramPost[]> {
  const data = await readJsonFile<unknown>(FILE, []);
  // Older deployments stored a Behold-settings object under this same
  // filename; guard against that leftover shape rather than crashing.
  return Array.isArray(data) ? (data as InstagramPost[]) : [];
}

async function saveAll(items: InstagramPost[]): Promise<void> {
  await writeJsonFile(FILE, items);
}

export async function listInstagramPosts(): Promise<InstagramPost[]> {
  const items = await getAll();
  return items.sort((a, b) => b.createdAt - a.createdAt);
}

async function saveImageBuffer(id: string, buffer: Buffer, ext: string): Promise<string> {
  await mkdir(UPLOAD_DIR, { recursive: true });
  const filename = `${id}${ext}`;
  await writeFile(path.join(UPLOAD_DIR, filename), buffer);
  return `${UPLOAD_URL_PREFIX}/${filename}`;
}

function extFromContentType(contentType: string | null): string {
  if (contentType?.includes("png")) return ".png";
  if (contentType?.includes("webp")) return ".webp";
  return ".jpg";
}

async function deleteImageFile(image: string) {
  if (!image.startsWith(UPLOAD_URL_PREFIX)) return;
  const relative = image.slice(UPLOAD_URL_PREFIX.length + 1);
  await unlink(path.join(UPLOAD_DIR, relative)).catch(() => {});
}

export async function addInstagramPostFromUrl(data: {
  imageUrl: string;
  caption: string;
  permalink: string;
}): Promise<InstagramPost> {
  const res = await fetch(data.imageUrl);
  if (!res.ok) throw new Error(`Görsel indirilemedi (${res.status})`);
  const buffer = Buffer.from(await res.arrayBuffer());

  const id = randomUUID();
  const image = await saveImageBuffer(id, buffer, extFromContentType(res.headers.get("content-type")));

  const post: InstagramPost = {
    id,
    image,
    caption: data.caption.trim(),
    permalink: data.permalink.trim() || "#",
    createdAt: Date.now(),
  };

  const items = await getAll();
  items.unshift(post);
  await saveAll(items);
  return post;
}

export async function addInstagramPostFromUpload(data: {
  imageFile: File;
  caption: string;
  permalink: string;
}): Promise<InstagramPost> {
  const id = randomUUID();
  const buffer = Buffer.from(await data.imageFile.arrayBuffer());
  const ext = path.extname(data.imageFile.name) || ".jpg";
  const image = await saveImageBuffer(id, buffer, ext);

  const post: InstagramPost = {
    id,
    image,
    caption: data.caption.trim(),
    permalink: data.permalink.trim() || "#",
    createdAt: Date.now(),
  };

  const items = await getAll();
  items.unshift(post);
  await saveAll(items);
  return post;
}

export async function deleteInstagramPost(id: string): Promise<void> {
  const items = await getAll();
  const target = items.find((p) => p.id === id);
  await saveAll(items.filter((p) => p.id !== id));
  if (target) await deleteImageFile(target.image);
}
