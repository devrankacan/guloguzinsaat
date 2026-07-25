import { NextRequest, NextResponse } from "next/server";
import { deleteTestimonial, updateTestimonial } from "@/lib/server/testimonials";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { quote, authorName, authorRole } = await request.json();

  if (!quote?.trim() || !authorName?.trim()) {
    return NextResponse.json({ error: "Alıntı ve isim gerekli." }, { status: 400 });
  }

  const testimonial = await updateTestimonial(id, {
    quote,
    authorName,
    authorRole: authorRole ?? "",
  });
  if (!testimonial) {
    return NextResponse.json({ error: "Bulunamadı." }, { status: 404 });
  }
  return NextResponse.json({ ok: true, testimonial });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await deleteTestimonial(id);
  return NextResponse.json({ ok: true });
}
