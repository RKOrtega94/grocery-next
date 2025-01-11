import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
    const data = await req.json();
    console.log(data);
    return NextResponse.json({ pong: true });
}