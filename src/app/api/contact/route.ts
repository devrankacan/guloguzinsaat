import { NextRequest, NextResponse } from "next/server";
import { createMessage } from "@/lib/server/messages";

export async function POST(request: NextRequest) {
  const { name, phone, email, service, message } = await request.json();

  if (typeof name !== "string" || !name.trim() || typeof message !== "string" || !message.trim()) {
    return NextResponse.json({ error: "Ad ve mesaj gerekli." }, { status: 400 });
  }

  await createMessage({
    name,
    phone: phone ?? "",
    email: email ?? "",
    service: service ?? "",
    message,
  });

  return NextResponse.json({ ok: true });
}
