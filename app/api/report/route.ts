// import { db } from "@/config/db";
// import { openai } from "@/config/openAI";
// import { SessionChatTable } from "@/config/schema";
// import { eq } from "drizzle-orm";
// import { NextRequest, NextResponse } from "next/server";

// const REPORT_GEN_PROMPT = `You are an AI Medical Voice Agent that just finished a voice conversation with a user. Depends on the doctor AI agent info and conversation between AI Medical Agent and user, generate a structured report with the following firlds:
// 1.sessionId: a unique session identifier
// 2.agent: the medical specialist name(e.g., "General Physician Ai")
// 3.user:name of the patient or "Anonymous" if not provided
// 4.timestamp:current date and time in ISO format
// 5.chiefComplaint:one-sentence summary of the main health concern
// 6.summary:a 2-3 sentence summary of the conversation, symptoms and recommendations
// 7.symptoms: list of symptoms mentioned by the user
// 8.duration: how long the user has experienced the symptoms
// 9.severity: mild, moderate or severe
// 10.medicationsMentioned: list of any medicines mentioned
// 11.recommendations: list of AI suggestions (e.g., rest, see a doctor)
// Return the result in this JSON format:
// {
// "sessionId":"string",
// "agent":"string,
// "timestamp":"ISO Date string",
// "chiefComplaint":"string",
// "summary":"string",
// "symptoms":["symptom1","symptom2"],
// "duration":"string",
// "severity":"string",
// "medicationsMentioned":['med1','med2'],
// "recommendations":['rec1','rec2'],
// }
// Only include valid fieds. Respond with nothing else.
// `;

// export async function POST(req:NextRequest) {
//     const {sessionId, sessionDetail, messages} = await req.json()
//     try {
//         const UserInput = "AI Doctor Agent Info:"+JSON.stringify(sessionDetail)+", Consersation:"+JSON.stringify(messages);
//         const completion = await openai.chat.completions.create({
//           model: "google/gemini-2.5-pro",
//           messages:[
//             {role: 'system', content:REPORT_GEN_PROMPT},
//             {role:'user', content:UserInput}
//           ]
//         });
//         const rawResp = completion.choices[0].message
//         const resp = rawResp.content?.trim().replace('```json','').replace('```','')
//         // @ts-ignore
//         const JSONResp = JSON.parse(resp)
//         const result = await db
//           .update(SessionChatTable)
//           .set({ report: JSONResp })
//           // @ts-ignore
//           .where(eq(SessionChatTable.sessionId, sessionId));
//         return NextResponse.json(JSONResp)
//     } catch (error) {
//         return NextResponse.json(error)
//     }
// }



import { db } from "@/config/db";
import { openai } from "@/config/openAI";
import { SessionChatTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

const REPORT_GEN_PROMPT = `You are an AI Medical Assistant. Based on the provided doctor information and conversation transcript, generate a structured medical report. 
Return ONLY a valid JSON object. Do not include markdown formatting like \`\`\`json.

{
"sessionId":"string",
"agent":"string",
"timestamp":"ISO Date string",
"chiefComplaint":"string",
"summary":"string",
"symptoms":["string"],
"duration":"string",
"severity":"string",
"medicationsMentioned":["string"],
"recommendations":["string"]
}`;

export async function POST(req: NextRequest) {
  try {
    const { sessionId, sessionDetail, messages } = await req.json();

    // 1. Prepare input for AI
    const UserInput = `Doctor Info: ${JSON.stringify(
      sessionDetail
    )}. Conversation: ${JSON.stringify(messages)}`;

    // 2. Call AI Model
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Note: Ensure this matches your provider's available models
      messages: [
        { role: "system", content: REPORT_GEN_PROMPT },
        { role: "user", content: UserInput },
      ],
      response_format: { type: "json_object" }, // Force JSON response if using OpenAI
    });

    const rawContent = completion.choices[0].message.content;
    if (!rawContent) throw new Error("AI returned empty content");

    // 3. Parse JSON safely
    // We still trim just in case, though response_format helps
    const cleanJsonString = rawContent
      .trim()
      .replace(/^```json/, "")
      .replace(/```$/, "");
    const reportJson = JSON.parse(cleanJsonString);

    // 4. Update Database
    await db
      .update(SessionChatTable)
      .set({ report: reportJson, conversation: messages })
      .where(eq(SessionChatTable.sessionId, sessionId));

    return NextResponse.json(reportJson);
  } catch (error: any) {
    console.error("Report Generation Error:", error);
    return NextResponse.json(
      { error: "Failed to generate report", details: error.message },
      { status: 500 }
    );
  }
}