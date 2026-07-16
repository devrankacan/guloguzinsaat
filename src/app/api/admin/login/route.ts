import { NextRequest, NextResponse } from "next/server";
import { verifyAdminCredentials } from "@/lib/server/admin";
import { createSessionToken, SESSION_COOKIE_NAME, SESSION_MAX_AGE } from "@/lib/server/session";

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();

  if (typeof username !== "string" || typeof password !== "string") {
    return NextResponse.json({ error: "Kullanıcı adı ve şifre gerekli." }, { status: 400 });
  }

  let valid = false;
  try {
    valid = await verifyAdminCredentials(username, password);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Sunucu hatası." },
      { status: 500 }
    );
  }

  if (!valid) {
    return NextResponse.json({ error: "Kullanıcı adı veya şifre hatalı." }, { status: 401 });
  }

  const token = await createSessionToken(username);
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  return response;
}
