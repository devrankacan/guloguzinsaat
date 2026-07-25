import { NextRequest, NextResponse } from "next/server";
import { addInstagramPostFromUrl } from "@/lib/server/instagram";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  if (!body || body.secret !== process.env.INSTAGRAM_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  }

  const imageUrl = String(body.imageUrl ?? "");
  const caption = String(body.caption ?? "");
  const permalink = String(body.permalink ?? "");

  if (!imageUrl.trim()) {
    return NextResponse.json({ error: "imageUrl gerekli." }, { status: 400 });
  }

  try {
    const post = await addInstagramPostFromUrl({ imageUrl, caption, permalink });
    return NextResponse.json({ ok: true, post });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Bilinmeyen hata";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
