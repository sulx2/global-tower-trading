import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");

  if (!code?.trim()) {
    return NextResponse.json(
      { found: false, message: "Order code is required." },
      { status: 400 }
    );
  }

  const endpoint = process.env.NEXT_PUBLIC_TRACK_ENDPOINT;
  if (!endpoint) {
    return NextResponse.json(
      { found: false, message: "Tracking service is not configured." },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(
      `${endpoint}?code=${encodeURIComponent(code.trim())}`,
      { next: { revalidate: 0 } }
    );

    if (!res.ok) throw new Error(`Upstream error: ${res.status}`);

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("[track/api]", err);
    return NextResponse.json(
      { found: false, message: "Could not reach the tracking server. Please try again." },
      { status: 502 }
    );
  }
}
