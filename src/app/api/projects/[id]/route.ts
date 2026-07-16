import { NextRequest, NextResponse } from "next/server";
import { deleteProject, updateProject } from "@/lib/server/projects";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const formData = await request.formData();
  const phone = String(formData.get("phone") ?? "");
  const projectName = String(formData.get("projectName") ?? "");
  const stage = Number(formData.get("stage") ?? 0);
  const note = String(formData.get("note") ?? "");
  const imageFiles = formData.getAll("images").filter((f): f is File => f instanceof File);
  const removeImages = formData.getAll("removeImages").map(String);

  if (!phone.trim() || !projectName.trim()) {
    return NextResponse.json({ error: "Telefon ve proje adı gerekli." }, { status: 400 });
  }

  const project = await updateProject(id, {
    phone,
    projectName,
    stage,
    note,
    imageFiles,
    removeImages,
  });

  if (!project) {
    return NextResponse.json({ error: "Proje bulunamadı." }, { status: 404 });
  }

  return NextResponse.json({ ok: true, project });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await deleteProject(id);
  return NextResponse.json({ ok: true });
}
