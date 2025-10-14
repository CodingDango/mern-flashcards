// app/api/hello/route.ts
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { DateTime } from "luxon";

export async function GET(request) {
  return NextResponse.json({ message: "Hello from the App Router API!" });
}

export async function POST(request) {
  const data = await request.json();
  const processedData = {
    ...data,
    id: `deck-${randomUUID()}`,
    dateCreated: DateTime.utc().toISO(),
    progress: 0,
    totalCards: 0,
    isFavorite: false,
  };

  return NextResponse.json({
    received: processedData,
    message: "Data received!",
  });
}
