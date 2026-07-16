import { NextRequest, NextResponse } from "next/server";
import { createProject, listProjects } from "@/lib/server/projects";

export async function GET() {
  const projects = await listProjects();
  return NextResponse.json({ projects });
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const phone = String(formData.get("phone") ?? "");
  const projectName = String(formData.get("projectName") ?? "");
  const stage = Number(formData.get("stage") ?? 0);
  const note = String(formData.get("note") ?? "");
  const imageFiles = formData.getAll("images").filter((f): f is File => f instanceof File);

  if (!phone.trim() || !projectName.trim()) {
    return NextResponse.json({ error: "Telefon ve proje adı gerekli." }, { status: 400 });
  }

  const project = await createProject({ phone, projectName, stage, note, imageFiles });
  return NextResponse.json({ ok: true, project });
}
