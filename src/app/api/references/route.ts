import { NextRequest, NextResponse } from "next/server";
import { createReference, listReferences } from "@/lib/server/references";

export async function GET() {
  const items = await listReferences();
  return NextResponse.json({ items });
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const name = String(formData.get("name") ?? "");
  const website = String(formData.get("website") ?? "");
  const logoFile = formData.get("logo");

  if (!name.trim()) {
    return NextResponse.json({ error: "Marka adı gerekli." }, { status: 400 });
  }

  const item = await createReference({
    name,
    website,
    logoFile: logoFile instanceof File ? logoFile : null,
  });
  return NextResponse.json({ ok: true, item });
}
