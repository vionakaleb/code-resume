import resumeJson from "@/data/resume.json";
import { ResumeData } from "@/data/types";
import { request } from "./client";

const resume = resumeJson as ResumeData;

export async function getPublicResume() {
  return request(`/users/${encodeURIComponent(resume.main.username)}/public`, {
    method: "GET",
  });
}
