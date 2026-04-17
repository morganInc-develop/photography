import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import {
  adminEmailHtml,
  clientEmailHtml,
  type InquiryData,
} from "@/lib/email/templates";

const resend = new Resend(process.env.RESEND_API_KEY);

// Update FROM_ADDRESS to a verified Resend sending domain once configured
const FROM_ADDRESS = "Made Invincible <onboarding@resend.dev>";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "morganinc5680@gmail.com";

export async function POST(request: NextRequest) {
  let data: InquiryData;

  try {
    data = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }

  const { name, email, projectType, budget, message } = data;

  if (!name || !email || !projectType || !budget || !message) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 },
    );
  }

  try {
    await Promise.all([
      // Notify admin
      resend.emails.send({
        from: FROM_ADDRESS,
        to: ADMIN_EMAIL,
        replyTo: email,
        subject: `New Inquiry — ${name} / ${projectType}`,
        html: adminEmailHtml(data),
      }),
      // Confirm to client
      resend.emails.send({
        from: FROM_ADDRESS,
        to: email,
        subject: "We received your inquiry — Made Invincible",
        html: clientEmailHtml(data),
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Resend error:", err);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
}
