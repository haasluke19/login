import { NextResponse } from "next/server";
import { db } from "@/lib/db";


export async function POST(req) {
  try {
    const body = await req.json()
    const { title, content } = body;

  } catch (e) {
    return NextResponse.json({ e }, { status: 500 });
  }
}
