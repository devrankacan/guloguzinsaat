import { NextRequest, NextResponse } from "next/server";
import { deleteInstagramPost } from "@/lib/server/instagram";

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await deleteInstagramPost(id);
  return NextResponse.json({ ok: true });
}
