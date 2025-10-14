import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { DateTime } from "luxon";
import fs from 'fs/promises'
import path from 'path' 

const dbPath = path.join(process.cwd(), 'data/deck.json');  

export async function GET(request) {
  const fileData = await fs.readFile(dbPath);
  const db = JSON.parse(fileData);

  return NextResponse.json({db});
}

export async function POST(request) {
  const receivedData = await request.json();

  const newDeckData = {
    ...receivedData,
    id: `deck-${randomUUID()}`,
    dateCreated: DateTime.utc().toISO(),
    progress: 0,
    totalCards: 0,
    isFavorite: false,
  };

  const fileData = await fs.readFile(dbPath);
  const db = JSON.parse(fileData);

  db.push(newDeckData);
  await fs.writeFile(dbPath, JSON.stringify(db, null, 2));
  
  return NextResponse.json({data: newDeckData , message: "success"});
}
