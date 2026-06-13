import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");

  if (!code?.trim()) {
    return NextResponse.json({ found: false, message: "Order code is required." });
  }

  const endpoint = process.env.NEXT_PUBLIC_TRACK_ENDPOINT;
  if (!endpoint) {
    return NextResponse.json({ found: false, message: "Tracking service is not configured." });
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 9000);

  try {
    const res = await fetch(
      `${endpoint}?code=${encodeURIComponent(code.trim())}`,
      { cache: "no-store", redirect: "follow", signal: controller.signal }
    );
    clearTimeout(timer);

    if (!res.ok) throw new Error(`Upstream ${res.status}`);

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    clearTimeout(timer);
    const msg = err instanceof Error && err.name === "AbortError"
      ? "Tracking server timed out. Please try again."
      : "Could not reach the tracking server. Please try again.";
    console.error("[track/api]", err);
    return NextResponse.json({ found: false, message: msg });
  }
}
