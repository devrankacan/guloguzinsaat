import { NextRequest, NextResponse } from "next/server";
import { createTestimonial, listTestimonials } from "@/lib/server/testimonials";

export async function GET() {
  const items = await listTestimonials();
  return NextResponse.json({ items });
}

export async function POST(request: NextRequest) {
  const { quote, authorName, authorRole } = await request.json();

  if (!quote?.trim() || !authorName?.trim()) {
    return NextResponse.json({ error: "Alıntı ve isim gerekli." }, { status: 400 });
  }

  const testimonial = await createTestimonial({
    quote,
    authorName,
    authorRole: authorRole ?? "",
  });
  return NextResponse.json({ ok: true, testimonial });
}
