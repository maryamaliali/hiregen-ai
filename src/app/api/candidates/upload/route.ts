import { NextRequest, NextResponse } from "next/server";
import { mockCandidates } from "@/lib/mock-db";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const jobId = formData.get("jobId") as string;
    const userId = formData.get("userId") as string;

    if (!file || !jobId || !userId) {
      return NextResponse.json(
        { error: "File, jobId, and userId are required" },
        { status: 400 }
      );
    }

    // Mock PDF text extraction
    // In production, use pdf-parse or similar library
    const mockExtractedText = `
      ALI KHAN
      Email: ali.khan@email.com
      Phone: +92 300 1234567
      
      EXPERIENCE:
      - Frontend Developer at TechCorp (2021-2024)
      - React Developer at StartupXYZ (2019-2021)
      - Total: 5 years experience
      
      SKILLS:
      React, Node.js, TypeScript, JavaScript, HTML, CSS, Tailwind CSS, Git
      
      EDUCATION:
      BS Computer Science - University of Karachi (2015-2019)
    `;

    // Mock AI Resume Parsing
    const parsedData = {
      name: "Ali Khan",
      email: "ali.khan@email.com",
      phone: "+92 300 1234567",
      skills: ["React", "Node.js", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS", "Git"],
      experience: 5,
      education: "BS Computer Science - University of Karachi (2015-2019)",
      rawText: mockExtractedText,
    };

    // Save candidate
    const candidateId = `candidate_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const candidate = {
      id: candidateId,
      jobId,
      userId,
      ...parsedData,
      fileName: file.name,
      uploadedAt: new Date().toISOString(),
      matchScore: null, // Will be calculated later
      status: "pending",
    };

    mockCandidates.push(candidate);

    return NextResponse.json({
      success: true,
      candidate,
      message: "Resume parsed successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
