import { NextRequest, NextResponse } from "next/server";
import { deletePortfolioItem, updatePortfolioItem } from "@/lib/server/portfolio";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const formData = await request.formData();
  const title = String(formData.get("title") ?? "");
  const category = String(formData.get("category") ?? "");
  const location = String(formData.get("location") ?? "");
  const description = String(formData.get("description") ?? "");
  const completedAt = String(formData.get("completedAt") ?? "");
  const imageFiles = formData.getAll("images").filter((f): f is File => f instanceof File);
  const removeImages = formData.getAll("removeImages").map(String);

  if (!title.trim()) {
    return NextResponse.json({ error: "Başlık gerekli." }, { status: 400 });
  }

  const item = await updatePortfolioItem(id, {
    title,
    category,
    location,
    description,
    completedAt,
    imageFiles,
    removeImages,
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
  await deletePortfolioItem(id);
  return NextResponse.json({ ok: true });
}
