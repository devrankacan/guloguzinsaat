import { readJsonFile, writeJsonFile } from "@/lib/server/store";

const FILE = "instagram.json";
const GRAPH_BASE = "https://graph.instagram.com";

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
  accessToken: string | null;
  tokenExpiresAt: number | null;
  lastSyncedAt: number | null;
  lastError: string | null;
  posts: InstagramPost[];
};

const EMPTY_SETTINGS: InstagramSettings = {
  accessToken: null,
  tokenExpiresAt: null,
  lastSyncedAt: null,
  lastError: null,
  posts: [],
};

export async function getInstagramSettings(): Promise<InstagramSettings> {
  return readJsonFile(FILE, EMPTY_SETTINGS);
}

export async function saveAccessToken(accessToken: string, expiresInSeconds: number) {
  const settings = await getInstagramSettings();
  settings.accessToken = accessToken;
  settings.tokenExpiresAt = Date.now() + expiresInSeconds * 1000;
  settings.lastError = null;
  await writeJsonFile(FILE, settings);
}

type GraphMediaResponse = {
  data: Array<{
    id: string;
    caption?: string;
    media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
    media_url: string;
    thumbnail_url?: string;
    permalink: string;
    timestamp: string;
  }>;
  error?: { message: string };
};

export async function syncInstagramMedia(): Promise<InstagramSettings> {
  const settings = await getInstagramSettings();

  if (!settings.accessToken) {
    settings.lastError = "Erişim token'ı tanımlı değil.";
    await writeJsonFile(FILE, settings);
    return settings;
  }

  const fields = "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp";
  const url = `${GRAPH_BASE}/me/media?fields=${fields}&access_token=${encodeURIComponent(
    settings.accessToken
  )}`;

  try {
    const res = await fetch(url, { cache: "no-store" });
    const json = (await res.json()) as GraphMediaResponse;

    if (!res.ok || json.error) {
      settings.lastError = json.error?.message ?? `Instagram API hatası (${res.status})`;
      await writeJsonFile(FILE, settings);
      return settings;
    }

    settings.posts = json.data.map((item) => ({
      id: item.id,
      caption: item.caption,
      mediaType: item.media_type,
      mediaUrl: item.media_url,
      thumbnailUrl: item.thumbnail_url,
      permalink: item.permalink,
      timestamp: item.timestamp,
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

type RefreshResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  error?: { message: string };
};

export async function refreshLongLivedToken(): Promise<InstagramSettings> {
  const settings = await getInstagramSettings();
  if (!settings.accessToken) return settings;

  const url = `${GRAPH_BASE}/refresh_access_token?grant_type=ig_refresh_token&access_token=${encodeURIComponent(
    settings.accessToken
  )}`;

  try {
    const res = await fetch(url, { cache: "no-store" });
    const json = (await res.json()) as RefreshResponse;

    if (!res.ok || json.error) {
      settings.lastError = json.error?.message ?? `Token yenileme hatası (${res.status})`;
      await writeJsonFile(FILE, settings);
      return settings;
    }

    settings.accessToken = json.access_token;
    settings.tokenExpiresAt = Date.now() + json.expires_in * 1000;
    settings.lastError = null;
    await writeJsonFile(FILE, settings);
    return settings;
  } catch (err) {
    settings.lastError = err instanceof Error ? err.message : "Bilinmeyen hata";
    await writeJsonFile(FILE, settings);
    return settings;
  }
}
