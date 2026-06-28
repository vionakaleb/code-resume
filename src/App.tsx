import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import resumeJson from "@/data/resume.json";
import type { ResumeData, TabKey } from "@/data/types";
import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { IndexNav } from "@/components/IndexNav";
import { StatusBar } from "@/components/StatusBar";
import { LineGutter } from "@/components/LineGutter";
import { WorkTabHeader, BlogTabHeader } from "@/components/TabHeaders";
import { HeroSection } from "@/sections/HeroSection";
import { EducationSection } from "@/sections/EducationSection";
import { AboutSection } from "@/sections/AboutSection";
import { ProjectSection } from "@/sections/ProjectSection";
import { StackSection } from "@/sections/StackSection";
import { AwardsSection } from "@/sections/AwardsSection";
import { TestimonialsSection } from "@/sections/TestimonialsSection";
import { BlogSection } from "@/sections/BlogSection";
import { ContactSection } from "@/sections/ContactSection";
import { ExperienceSection } from "@/sections/ExperienceSection";
import { useLiveTime } from "@/hooks/useLiveTime";
import { useActiveSection } from "@/hooks/useActiveSection";
import { GithubSection } from "./sections/GithubSection";
import { ServicesSection } from "./sections/ServicesSection";
import { ToolsSection } from "./sections/ToolsSection";
import { FAQSection } from "./sections/FAQSection";
import { getPublicResume } from "./api/resume";

const resume = resumeJson as ResumeData;

const infoNavItems = [
  { id: "hero", label: "Index" },
  { id: "about", label: "About Me" },
  { id: "experience", label: "Careers" },
  { id: "education", label: "Education" },
  { id: "awards", label: "Awards" },
  { id: "testimonials", label: "Testimonials" },
  { id: "services", label: "Services" },
  { id: "tools", label: "Tools" },
  { id: "faq", label: "FAQs" },
  { id: "contact", label: "Contact" },
];

const workNavItems = [
  { id: "project", label: "Projects" },
  { id: "github", label: "Github" },
  { id: "stack", label: "Tech Stack" },
];

const blogNavItems = [{ id: "blog", label: "All Articles" }];

export default function App() {
  const getTabFromHash = (): TabKey => {
    const hash = window.location.hash.replace("#", "");
    if (hash === "work" || hash === "blog") return hash;
    return "info";
  };
  const [activeTab, setActiveTab] = useState<TabKey>(getTabFromHash);

  const mainRef = useRef<HTMLDivElement | null>(null);
  const mainContentRef = useRef<HTMLElement | null>(null);

  const time = useLiveTime("Asia/Jakarta");

  const sectionIds = useMemo(() => {
    if (activeTab === "info") return infoNavItems.map((i) => i.id);
    if (activeTab === "work") return workNavItems.map((i) => i.id);
    return blogNavItems.map((i) => i.id);
  }, [activeTab]);

  const activeSection = useActiveSection(mainRef, sectionIds);

  const [state, setState] = useState({
    status: "loading",
    data: null,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;
    setState({ status: "loading", data: null, error: null });

    (async () => {
      try {
        const result: any = await getPublicResume();
        if (cancelled) return;
        const content = result?.content || result;
        setState({ status: "ready", data: content, error: null });
      } catch {
        if (cancelled) return;
        setState({ status: "ready", data: null, error: null });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const hash = activeTab === "info" ? "" : `#${activeTab}`;
    window.history.replaceState(null, "", hash || window.location.pathname);
  }, [activeTab]);

  useEffect(() => {
    const onHashChange = () => setActiveTab(getTabFromHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleTabChange = useCallback((tab: TabKey) => {
    setActiveTab(tab);
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  const handleSidebarContact = useCallback(() => {
    setActiveTab("info");
    setTimeout(() => scrollTo("contact"), 100);
  }, [scrollTo]);

  const handleSidebarWork = useCallback(() => {
    setActiveTab("work");
  }, []);

  const navItems =
    activeTab === "info"
      ? infoNavItems
      : activeTab === "work"
        ? workNavItems
        : blogNavItems;

  return (
    <div className="h-screen flex bg-bg-base text-ink-primary overflow-hidden">
      <Sidebar
        main={resume.main}
        onContactClick={handleSidebarContact}
        onWorkClick={handleSidebarWork}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <TopBar
          activeTab={activeTab}
          onTabChange={handleTabChange}
          location={resume.main.location}
          time={time}
        />

        <div ref={mainRef} className="flex-1 overflow-y-auto">
          <div className="flex">
            <LineGutter contentRef={mainContentRef} />
            <main
              ref={mainContentRef}
              className="flex-1 min-w-0 px-6 md:px-12 lg:px-16 py-10 max-w-5xl"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-24"
                >
                  {activeTab === "info" && (
                    <InfoView
                      resume={resume}
                      state={state}
                      onTabChange={handleTabChange}
                      onContactClick={handleSidebarContact}
                    />
                  )}
                  {activeTab === "work" && <WorkView resume={resume} />}
                  {activeTab === "blog" && <BlogView />}
                </motion.div>
              </AnimatePresence>
            </main>

            <IndexNav
              items={navItems}
              activeId={activeSection}
              onSelect={scrollTo}
            />
          </div>

          <StatusBar social={resume.main.social} />
        </div>
      </div>
    </div>
  );
}

function InfoView({
  resume,
  state,
  onTabChange,
  onContactClick,
}: {
  resume: ResumeData;
  state: any;
  onTabChange: (tab: TabKey) => void;
  onContactClick: () => void;
}) {
  if (state.status === "loading") {
    return (
      <div className="flex flex-col min-h-[75vh] items-center justify-center gap-4">
        <div className="text-slate-300">Loading profile...</div>
        <div className="flex gap-2 items-center">
          <div
            className="w-2.5 h-2.5 rounded-full bg-accent
    animate-bounce [animation-delay:0ms]"
          ></div>
          <div
            className="w-2.5 h-2.5 rounded-full bg-accent
    animate-bounce [animation-delay:200ms]"
          ></div>
          <div
            className="w-2.5 h-2.5 rounded-full bg-accent
    animate-bounce [animation-delay:400ms]"
          ></div>
        </div>
      </div>
    );
  }

  if (!state.data)
    return (
      <div className="flex min-h-[75vh] items-center justify-center text-slate-300">
        No data.
      </div>
    );

  const resumeApi = state.data?.resume_content ?? null;

  return (
    <>
      <HeroSection
        main={resume.main}
        resumeApi={resumeApi}
        onTabChange={onTabChange}
        onContactClick={onContactClick}
      />
      <AboutSection main={resume.main} resumeApi={resumeApi} />
      <ExperienceSection work={resume.work} resumeApi={resumeApi} />
      <EducationSection education={resume.education} resumeApi={resumeApi} />
      <AwardsSection awards={resume.awards} resumeApi={resumeApi} />
      <TestimonialsSection testimonials={resume.testimonials} />
      <ServicesSection />
      <ToolsSection />
      <FAQSection />
      <ContactSection main={resume.main} />
    </>
  );
}

function WorkView({ resume }: { resume: ResumeData }) {
  return (
    <>
      <WorkTabHeader />

      <ProjectSection projects={resume.projects} />
      <GithubSection />
      <StackSection stack={resume.stack} />
    </>
  );
}

function BlogView() {
  return (
    <>
      <BlogTabHeader />

      <BlogSection id="blog" showHeading={false} limit={20} />
    </>
  );
}
