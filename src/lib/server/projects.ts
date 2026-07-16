import { randomUUID } from "crypto";
import { mkdir, unlink, writeFile } from "fs/promises";
import path from "path";
import { readJsonFile, writeJsonFile } from "@/lib/server/store";

const FILE = "projects.json";
const UPLOAD_DIR = path.join(process.cwd(), "data", "uploads", "projects");
const UPLOAD_URL_PREFIX = "/api/uploads/projects";

export type ProjectRecord = {
  id: string;
  phone: string;
  phoneDisplay: string;
  projectName: string;
  stage: number;
  note: string;
  images: string[];
  createdAt: number;
  updatedAt: number;
};

export function normalizePhone(input: string): string {
  const digits = input.replace(/\D/g, "");
  let d = digits;
  if (d.startsWith("90") && d.length > 10) d = d.slice(2);
  if (d.startsWith("0") && d.length > 10) d = d.slice(1);
  return d.slice(-10);
}

async function getAll(): Promise<ProjectRecord[]> {
  return readJsonFile(FILE, []);
}

async function saveAll(projects: ProjectRecord[]): Promise<void> {
  await writeJsonFile(FILE, projects);
}

export async function listProjects(): Promise<ProjectRecord[]> {
  const projects = await getAll();
  return projects.sort((a, b) => b.updatedAt - a.updatedAt);
}

export async function getProject(id: string): Promise<ProjectRecord | undefined> {
  const projects = await getAll();
  return projects.find((p) => p.id === id);
}

export async function findProjectsByPhone(phoneInput: string): Promise<ProjectRecord[]> {
  const normalized = normalizePhone(phoneInput);
  if (normalized.length < 7) return [];
  const projects = await getAll();
  return projects.filter((p) => p.phone === normalized);
}

async function saveImages(projectId: string, files: File[]): Promise<string[]> {
  const usable = files.filter((f) => f && f.size > 0);
  if (usable.length === 0) return [];

  const dir = path.join(UPLOAD_DIR, projectId);
  await mkdir(dir, { recursive: true });

  const saved: string[] = [];
  for (const file of usable) {
    const ext = path.extname(file.name) || ".jpg";
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(dir, filename), buffer);
    saved.push(`${UPLOAD_URL_PREFIX}/${projectId}/${filename}`);
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

export async function createProject(data: {
  phone: string;
  projectName: string;
  stage: number;
  note: string;
  imageFiles: File[];
}): Promise<ProjectRecord> {
  const id = randomUUID();
  const images = await saveImages(id, data.imageFiles);
  const now = Date.now();

  const record: ProjectRecord = {
    id,
    phone: normalizePhone(data.phone),
    phoneDisplay: data.phone.trim(),
    projectName: data.projectName.trim(),
    stage: data.stage,
    note: data.note.trim(),
    images,
    createdAt: now,
    updatedAt: now,
  };

  const projects = await getAll();
  projects.push(record);
  await saveAll(projects);
  return record;
}

export async function updateProject(
  id: string,
  data: {
    phone: string;
    projectName: string;
    stage: number;
    note: string;
    imageFiles: File[];
    removeImages: string[];
  }
): Promise<ProjectRecord | undefined> {
  const projects = await getAll();
  const idx = projects.findIndex((p) => p.id === id);
  if (idx === -1) return undefined;

  const existing = projects[idx];
  const keptImages = existing.images.filter((img) => !data.removeImages.includes(img));
  const removed = existing.images.filter((img) => data.removeImages.includes(img));
  const newImages = await saveImages(id, data.imageFiles);

  const updated: ProjectRecord = {
    ...existing,
    phone: normalizePhone(data.phone),
    phoneDisplay: data.phone.trim(),
    projectName: data.projectName.trim(),
    stage: data.stage,
    note: data.note.trim(),
    images: [...keptImages, ...newImages],
    updatedAt: Date.now(),
  };

  projects[idx] = updated;
  await saveAll(projects);
  if (removed.length > 0) await deleteImageFiles(removed);
  return updated;
}

export async function deleteProject(id: string): Promise<void> {
  const projects = await getAll();
  const target = projects.find((p) => p.id === id);
  const remaining = projects.filter((p) => p.id !== id);
  await saveAll(remaining);
  if (target && target.images.length > 0) await deleteImageFiles(target.images);
}
