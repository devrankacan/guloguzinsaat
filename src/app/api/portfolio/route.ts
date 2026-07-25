import { NextRequest, NextResponse } from "next/server";
import { createPortfolioItem, listPortfolio } from "@/lib/server/portfolio";

export async function GET() {
  const items = await listPortfolio();
  return NextResponse.json({ items });
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const title = String(formData.get("title") ?? "");
  const category = String(formData.get("category") ?? "");
  const location = String(formData.get("location") ?? "");
  const description = String(formData.get("description") ?? "");
  const completedAt = String(formData.get("completedAt") ?? "");
  const imageFiles = formData.getAll("images").filter((f): f is File => f instanceof File);

  if (!title.trim()) {
    return NextResponse.json({ error: "Başlık gerekli." }, { status: 400 });
  }

  const item = await createPortfolioItem({
    title,
    category,
    location,
    description,
    completedAt,
    imageFiles,
  });
  return NextResponse.json({ ok: true, item });
}
