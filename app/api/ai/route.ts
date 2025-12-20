import { openai } from "@/config/openAI";
import { AIDoctorAgents } from "@/list";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const {notes} = await req.json()
    try {
        const completion = await openai.chat.completions.create({
          model: "google/gemma-3-27b-it",
          messages: [
            { role: "system", content: JSON.stringify(AIDoctorAgents) },
            {
              role: "user",
              content:
                "User Notes/Symptomps:" +
                notes +
                ", Depends on user notes and symptoms, Please suggest list of doctors, Return objects in JSON only with image,id,description,agentprompt,specialist",
            },
          ],
        });
        const rawResp = completion.choices[0].message;
        const response = rawResp.content?.trim().replace("```json", "").replace("```","")
        // @ts-ignore
        const JSONresp = JSON.parse(response)
        return NextResponse.json(JSONresp)
    } catch (error) {
        return NextResponse.json(error)
    }
}