import { randomUUID } from "crypto";
import { readJsonFile, writeJsonFile } from "@/lib/server/store";

const FILE = "testimonials.json";

export type Testimonial = {
  id: string;
  quote: string;
  authorName: string;
  authorRole: string;
  createdAt: number;
};

async function getAll(): Promise<Testimonial[]> {
  return readJsonFile(FILE, []);
}

async function saveAll(items: Testimonial[]): Promise<void> {
  await writeJsonFile(FILE, items);
}

export async function listTestimonials(): Promise<Testimonial[]> {
  const items = await getAll();
  return items.sort((a, b) => b.createdAt - a.createdAt);
}

export async function createTestimonial(data: {
  quote: string;
  authorName: string;
  authorRole: string;
}): Promise<Testimonial> {
  const testimonial: Testimonial = {
    id: randomUUID(),
    quote: data.quote.trim(),
    authorName: data.authorName.trim(),
    authorRole: data.authorRole.trim(),
    createdAt: Date.now(),
  };
  const items = await getAll();
  items.push(testimonial);
  await saveAll(items);
  return testimonial;
}

export async function updateTestimonial(
  id: string,
  data: { quote: string; authorName: string; authorRole: string }
): Promise<Testimonial | undefined> {
  const items = await getAll();
  const idx = items.findIndex((t) => t.id === id);
  if (idx === -1) return undefined;
  items[idx] = {
    ...items[idx],
    quote: data.quote.trim(),
    authorName: data.authorName.trim(),
    authorRole: data.authorRole.trim(),
  };
  await saveAll(items);
  return items[idx];
}

export async function deleteTestimonial(id: string): Promise<void> {
  const items = await getAll();
  await saveAll(items.filter((t) => t.id !== id));
}
