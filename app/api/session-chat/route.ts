import { db } from "@/config/db";
import { SessionChatTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  const { notes, selectedDoctor } = await req.json();
  const user = await currentUser();

  // Safety check for user
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const sessionId = uuidv4();
    const result = await db
      .insert(SessionChatTable)
      .values({
        sessionId,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        notes,
        selectedDoctor,
        createdOn: new Date().toString(),
      })
      .returning(); // Simplified returning call

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json(
      { error: "Failed to create session" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("sessionId");
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    if (sessionId === "all") {
      const result = await db
        .select()
        .from(SessionChatTable)
        .where(
          eq(
            SessionChatTable.createdBy,
            user?.primaryEmailAddress?.emailAddress as string
          )
        )
        .orderBy(desc(SessionChatTable.id));

      return NextResponse.json(result)
    } else {
      const result = await db
        .select()
        .from(SessionChatTable)
        .where(eq(SessionChatTable.sessionId, sessionId as string));

      return NextResponse.json(result[0]);
    }
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}