import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

async function ensureDataDir() {
  await mkdir(DATA_DIR, { recursive: true });
}

export async function readJsonFile<T>(filename: string, fallback: T): Promise<T> {
  try {
    const raw = await readFile(path.join(DATA_DIR, filename), "utf-8");
    return JSON.parse(raw) as T;
  } catch (err: unknown) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") {
      return fallback;
    }
    throw err;
  }
}

export async function writeJsonFile<T>(filename: string, data: T): Promise<void> {
  await ensureDataDir();
  await writeFile(path.join(DATA_DIR, filename), JSON.stringify(data, null, 2), "utf-8");
}
