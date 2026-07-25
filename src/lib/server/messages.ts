import { randomUUID } from "crypto";
import { readJsonFile, writeJsonFile } from "@/lib/server/store";

const FILE = "messages.json";

export type ContactMessage = {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  read: boolean;
  createdAt: number;
};

async function getAll(): Promise<ContactMessage[]> {
  return readJsonFile(FILE, []);
}

async function saveAll(items: ContactMessage[]): Promise<void> {
  await writeJsonFile(FILE, items);
}

export async function listMessages(): Promise<ContactMessage[]> {
  const items = await getAll();
  return items.sort((a, b) => b.createdAt - a.createdAt);
}

export async function createMessage(data: {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}): Promise<ContactMessage> {
  const item: ContactMessage = {
    id: randomUUID(),
    name: data.name.trim(),
    phone: data.phone.trim(),
    email: data.email.trim(),
    service: data.service.trim(),
    message: data.message.trim(),
    read: false,
    createdAt: Date.now(),
  };
  const items = await getAll();
  items.push(item);
  await saveAll(items);
  return item;
}

export async function markMessageRead(id: string, read: boolean): Promise<void> {
  const items = await getAll();
  const idx = items.findIndex((m) => m.id === id);
  if (idx === -1) return;
  items[idx].read = read;
  await saveAll(items);
}

export async function deleteMessage(id: string): Promise<void> {
  const items = await getAll();
  await saveAll(items.filter((m) => m.id !== id));
}
