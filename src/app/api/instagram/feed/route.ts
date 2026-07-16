import { NextRequest, NextResponse } from "next/server";
import { saveFeedId, syncInstagramMedia } from "@/lib/server/instagram";

export async function POST(request: NextRequest) {
  const { feedId } = await request.json();

  if (typeof feedId !== "string" || feedId.trim().length === 0) {
    return NextResponse.json({ error: "Behold Feed ID gerekli." }, { status: 400 });
  }

  await saveFeedId(feedId.trim());
  const settings = await syncInstagramMedia();

  return NextResponse.json({
    ok: !settings.lastError,
    error: settings.lastError,
    postCount: settings.posts.length,
  });
}
