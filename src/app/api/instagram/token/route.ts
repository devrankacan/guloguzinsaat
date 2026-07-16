import { NextRequest, NextResponse } from "next/server";
import { saveAccessToken, syncInstagramMedia } from "@/lib/server/instagram";

const DEFAULT_LONG_LIVED_EXPIRY_SECONDS = 60 * 24 * 60 * 60; // 60 days

export async function POST(request: NextRequest) {
  const { accessToken } = await request.json();

  if (typeof accessToken !== "string" || accessToken.trim().length === 0) {
    return NextResponse.json({ error: "Erişim token'ı gerekli." }, { status: 400 });
  }

  await saveAccessToken(accessToken.trim(), DEFAULT_LONG_LIVED_EXPIRY_SECONDS);
  const settings = await syncInstagramMedia();

  return NextResponse.json({
    ok: !settings.lastError,
    error: settings.lastError,
    postCount: settings.posts.length,
  });
}
