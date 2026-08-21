export interface ResumeMain {
  name: string;
  fullname: string;
  role: string;
  tagline: string;
  shortBio: string;
  longBio: string;
  startedWorking: number;
  location: string;
  languages: string;
  email: string;
  phone: string;
  resumeBasePath: string;
  social: SocialLink[];
  image: string;
  username: string;
}

export interface SocialLink {
  name: string;
  url: string;
}

export interface WhatIDo {
  frontend: string[];
  engineering: string[];
  quality: string[];
}

export interface StackItem {
  name: string;
  level: number;
  type: string;
}

export interface AwardItem {
  title: string;
  year: string;
}

export interface Awards {
  industry: AwardItem[];
  personal: AwardItem[];
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  org: string;
}

export interface Education {
  school: string;
  degree: string;
  graduated: string;
  description: string;
}

export interface WorkItem {
  company: string;
  title: string;
  years: string;
  descriptions: string[];
  skills: string[];
}

export interface PublicationItem {
  title: string;
  publisher: string;
  date: string;
  authors: string[];
  url: string;
  description: string;
}

export interface CertificateItem {
  name: string;
  issuer: string;
  issueDate: string;
  credentialId: string;
  credentialUrl: string;
  skills: string[];
  media: string;
  isMedia?: boolean;
}

export interface ProjectItem {
  title: string;
  description: string;
  tech: string[];
  url: string;
  tag: string;
  image: string;
  featured?: boolean;
}

export interface ResumeData {
  main: ResumeMain;
  stack: StackItem[];
  awards: Awards;
  testimonials: Testimonial[];
  education: Education[];
  work: WorkItem[];
  projects: ProjectItem[];
  publications: PublicationItem[];
  certificates: CertificateItem[];
}

export interface MediumArticle {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  thumbnail: string;
  categories: string[];
}

export type TabKey = "info" | "work" | "blog" | "resume";

export type ViewMode = "grid" | "list";
