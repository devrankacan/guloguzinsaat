import { NextRequest, NextResponse } from "next/server";
import { deleteReference, updateReference } from "@/lib/server/references";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const formData = await request.formData();
  const name = String(formData.get("name") ?? "");
  const website = String(formData.get("website") ?? "");
  const logoFile = formData.get("logo");

  if (!name.trim()) {
    return NextResponse.json({ error: "Marka adı gerekli." }, { status: 400 });
  }

  const item = await updateReference(id, {
    name,
    website,
    logoFile: logoFile instanceof File ? logoFile : null,
  });

  if (!item) {
    return NextResponse.json({ error: "Bulunamadı." }, { status: 404 });
  }
  return NextResponse.json({ ok: true, item });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await deleteReference(id);
  return NextResponse.json({ ok: true });
}
