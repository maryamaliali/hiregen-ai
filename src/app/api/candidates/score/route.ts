import { NextRequest, NextResponse } from "next/server";
import { mockCandidates, mockJobs } from "@/lib/mock-db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { candidateId, jobId } = body;

    if (!candidateId || !jobId) {
      return NextResponse.json(
        { error: "Candidate ID and Job ID are required" },
        { status: 400 }
      );
    }

    // Fetch candidate from database
    let candidate = mockCandidates.find((c) => c.id === candidateId);
    
    // If not found in DB, use data from request
    if (!candidate && body.candidate) {
      candidate = body.candidate;
    } else if (!candidate) {
      return NextResponse.json(
        { error: "Candidate not found" },
        { status: 404 }
      );
    }

    // Fetch job from database
    let job = mockJobs.find((j) => j.id === jobId);
    
    // If not found in DB, use data from request
    if (!job && body.job) {
      job = body.job;
    } else if (!job) {
      return NextResponse.json(
        { error: "Job not found" },
        { status: 404 }
      );
    }

    // Mock AI Scoring Algorithm
    const candidateSkills = candidate.skills.map((s: string) =>
      s.toLowerCase()
    );
    const requiredSkills = job.requiredSkills.map((s: string) =>
      s.toLowerCase()
    );

    // Calculate match score
    const matchedSkills = requiredSkills.filter((skill: string) =>
      candidateSkills.some((cs: string) => cs.includes(skill) || skill.includes(cs))
    );

    const skillMatchPercentage = (matchedSkills.length / requiredSkills.length) * 100;

    // Experience score (max 30 points)
    const experienceScore = Math.min(
      (candidate.experience / job.experienceRequired) * 30,
      30
    );

    // Final match score
    const matchScore = Math.round(
      Math.min(skillMatchPercentage * 0.7 + experienceScore, 100)
    );

    // Missing skills
    const missingSkills = requiredSkills.filter(
      (skill: string) =>
        !candidateSkills.some((cs: string) => cs.includes(skill) || skill.includes(cs))
    );

    // Strength areas
    const strengthAreas = matchedSkills;

    const scoringResult = {
      matchScore,
      missingSkills,
      strengthAreas,
      skillMatch: Math.round(skillMatchPercentage),
      experienceMatch: Math.round(experienceScore),
    };

    // Update candidate in database with score
    const candidateIndex = mockCandidates.findIndex(
      (c) => c.id === candidateId
    );
    if (candidateIndex !== -1) {
      mockCandidates[candidateIndex] = {
        ...mockCandidates[candidateIndex],
        matchScore,
        missingSkills,
        strengthAreas,
        status: matchScore >= 70 ? "shortlisted" : matchScore >= 50 ? "review" : "pending",
      };
    }

    return NextResponse.json({
      success: true,
      scoring: scoringResult,
      candidate: candidateIndex !== -1 ? mockCandidates[candidateIndex] : null,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
