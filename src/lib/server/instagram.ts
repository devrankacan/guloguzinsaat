import { readJsonFile, writeJsonFile } from "@/lib/server/store";

const FILE = "instagram.json";
const BEHOLD_BASE = "https://feeds.behold.so";

export type InstagramPost = {
  id: string;
  caption?: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  mediaUrl: string;
  thumbnailUrl?: string;
  permalink: string;
  timestamp: string;
};

export type InstagramSettings = {
  feedId: string | null;
  lastSyncedAt: number | null;
  lastError: string | null;
  posts: InstagramPost[];
};

const EMPTY_SETTINGS: InstagramSettings = {
  feedId: null,
  lastSyncedAt: null,
  lastError: null,
  posts: [],
};

export async function getInstagramSettings(): Promise<InstagramSettings> {
  return readJsonFile(FILE, EMPTY_SETTINGS);
}

export async function saveFeedId(feedId: string) {
  const settings = await getInstagramSettings();
  settings.feedId = feedId;
  settings.lastError = null;
  await writeJsonFile(FILE, settings);
}

type BeholdPost = {
  id: string;
  caption?: string;
  mediaType?: string;
  media_type?: string;
  mediaUrl?: string;
  media_url?: string;
  thumbnailUrl?: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp?: string;
  timestamp_string?: string;
};

type BeholdResponse = {
  posts?: BeholdPost[];
  error?: string;
};

export async function syncInstagramMedia(): Promise<InstagramSettings> {
  const settings = await getInstagramSettings();

  if (!settings.feedId) {
    settings.lastError = "Behold Feed ID tanımlı değil.";
    await writeJsonFile(FILE, settings);
    return settings;
  }

  const url = `${BEHOLD_BASE}/${encodeURIComponent(settings.feedId)}`;

  try {
    const res = await fetch(url, { cache: "no-store" });
    const json = (await res.json()) as BeholdResponse;

    if (!res.ok || json.error || !json.posts) {
      settings.lastError = json.error ?? `Behold API hatası (${res.status})`;
      await writeJsonFile(FILE, settings);
      return settings;
    }

    settings.posts = json.posts.map((item) => ({
      id: item.id,
      caption: item.caption,
      mediaType: (item.mediaType ?? item.media_type ?? "IMAGE") as InstagramPost["mediaType"],
      mediaUrl: item.mediaUrl ?? item.media_url ?? "",
      thumbnailUrl: item.thumbnailUrl ?? item.thumbnail_url,
      permalink: item.permalink,
      timestamp: item.timestamp ?? item.timestamp_string ?? "",
    }));
    settings.lastSyncedAt = Date.now();
    settings.lastError = null;
    await writeJsonFile(FILE, settings);
    return settings;
  } catch (err) {
    settings.lastError = err instanceof Error ? err.message : "Bilinmeyen hata";
    await writeJsonFile(FILE, settings);
    return settings;
  }
}
