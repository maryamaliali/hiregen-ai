import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { jobTitle, jobDescription, candidateSkills, missingSkills, candidateName } =
      body;

    if (!jobTitle || !candidateSkills) {
      return NextResponse.json(
        { error: "Job title and candidate skills are required" },
        { status: 400 }
      );
    }

    // Mock AI Question Generation
    // In production, use OpenAI API or similar

    const technicalQuestions = [
      `Explain your experience with ${candidateSkills[0] || "React"}. Can you walk me through a complex project you've built?`,
      `How do you handle state management in large-scale applications?`,
      `Describe a challenging technical problem you solved recently.`,
      `What's your approach to optimizing application performance?`,
      `How do you ensure code quality and maintainability in your projects?`,
    ];

    const behavioralQuestions = [
      `Tell me about a time when you had to work under pressure to meet a deadline.`,
      `Describe a situation where you had to collaborate with a difficult team member.`,
      `How do you handle feedback and criticism?`,
    ];

    const scenarioQuestions = [
      `If you were tasked with building a ${jobTitle} application from scratch, what would be your approach?`,
      `How would you handle a situation where a critical bug is discovered in production?`,
    ];

    const questions = {
      technical: technicalQuestions,
      behavioral: behavioralQuestions,
      scenario: scenarioQuestions,
      personalized: candidateName
        ? `Hi ${candidateName}, based on your background, I'd like to understand more about your experience with ${candidateSkills.join(", ")}.`
        : null,
    };

    return NextResponse.json({
      success: true,
      questions,
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
