import { NextRequest, NextResponse } from "next/server";
import { addInstagramPostFromUpload, listInstagramPosts } from "@/lib/server/instagram";

export async function GET() {
  const items = await listInstagramPosts();
  return NextResponse.json({ items });
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const caption = String(formData.get("caption") ?? "");
  const permalink = String(formData.get("permalink") ?? "");
  const imageFile = formData.get("image");

  if (!(imageFile instanceof File) || imageFile.size === 0) {
    return NextResponse.json({ error: "Görsel gerekli." }, { status: 400 });
  }

  const post = await addInstagramPostFromUpload({ imageFile, caption, permalink });
  return NextResponse.json({ ok: true, post });
}
