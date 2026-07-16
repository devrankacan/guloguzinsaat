import { NextResponse } from "next/server";
import { syncInstagramMedia } from "@/lib/server/instagram";

export async function POST() {
  const settings = await syncInstagramMedia();
  return NextResponse.json({
    ok: !settings.lastError,
    error: settings.lastError,
    postCount: settings.posts.length,
    lastSyncedAt: settings.lastSyncedAt,
  });
}
