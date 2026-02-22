import { NextRequest, NextResponse } from "next/server";
import { mockEmailLogs } from "@/lib/mock-db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      candidateEmail,
      candidateName,
      jobTitle,
      interviewDate,
      interviewTime,
      interviewLocation,
      userId,
    } = body;

    if (!candidateEmail || !candidateName || !jobTitle) {
      return NextResponse.json(
        { error: "Candidate email, name, and job title are required" },
        { status: 400 }
      );
    }

    // Mock AI Email Generation
    const emailSubject = `Interview Invitation - ${jobTitle} Position at HireGen AI`;

    const emailBody = `
Dear ${candidateName},

Thank you for your interest in the ${jobTitle} position at HireGen AI. We were impressed with your background and would like to invite you for an interview.

${interviewDate && interviewTime ? `Interview Details:
- Date: ${interviewDate}
- Time: ${interviewTime}
${interviewLocation ? `- Location: ${interviewLocation}` : "- Format: Online/In-Person"}
` : "We will contact you shortly to schedule the interview."}

Please confirm your availability by replying to this email.

Best regards,
HireGen AI Team
    `.trim();

    // Mock email sending (in production, use Nodemailer)
    const emailId = `email_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const emailLog = {
      id: emailId,
      userId,
      candidateEmail,
      candidateName,
      jobTitle,
      subject: emailSubject,
      body: emailBody,
      status: "sent",
      sentAt: new Date().toISOString(),
      interviewDate,
      interviewTime,
      interviewLocation,
    };

    mockEmailLogs.push(emailLog);

    // Simulate email sending delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json({
      success: true,
      email: emailLog,
      message: "Email sent successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Get email logs
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const userEmails = mockEmailLogs.filter((email) => email.userId === userId);

    return NextResponse.json({
      success: true,
      emails: userEmails,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
