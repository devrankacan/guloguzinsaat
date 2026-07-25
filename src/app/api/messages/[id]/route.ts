import { NextRequest, NextResponse } from "next/server";
import { deleteMessage, markMessageRead } from "@/lib/server/messages";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { read } = await request.json();
  await markMessageRead(id, Boolean(read));
  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await deleteMessage(id);
  return NextResponse.json({ ok: true });
}
