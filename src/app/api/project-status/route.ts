import { NextRequest, NextResponse } from "next/server";
import { findProjectsByPhone } from "@/lib/server/projects";

export async function POST(request: NextRequest) {
  const { phone } = await request.json();

  if (typeof phone !== "string" || phone.trim().length === 0) {
    return NextResponse.json({ error: "Telefon numarası gerekli." }, { status: 400 });
  }

  const projects = await findProjectsByPhone(phone);

  return NextResponse.json({
    projects: projects.map((p) => ({
      id: p.id,
      projectName: p.projectName,
      stage: p.stage,
      note: p.note,
      images: p.images,
      updatedAt: p.updatedAt,
    })),
  });
}
