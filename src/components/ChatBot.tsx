import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, User, Bot } from "lucide-react";

type ChatBotProps = {
  setActiveTab: (tab: string) => void;
  scrollTo: (id: string) => void;
};

const QUICK_QUESTIONS = [
  {
    label: "About Me",
    response: "I'm a Fullstack, Frontend-heavy Software Engineer focused on shipping scalable products. I hold a Master's in CS and love mentoring, writing, and street cats! 🐈",
    action: (setActiveTab: any, scrollTo: any) => {
      setActiveTab("info");
      setTimeout(() => scrollTo("about"), 100);
    },
  },
  {
    label: "Featured Projects",
    response: "I've built several tools like DocShift (Document Converter), Reesu (AI Resume Builder), and a Timesheet Builder. Let me show you the highlights!",
    action: (setActiveTab: any, scrollTo: any) => {
      setActiveTab("info");
      setTimeout(() => scrollTo("project"), 100);
    },
  },
  {
    label: "Career",
    response: "I've had an exciting journey working at Bank Mandiri, Hypestacks in London, and SuperApp (YC W18). I specialize in architecting high-traffic frontends.",
    action: (setActiveTab: any, scrollTo: any) => {
      setActiveTab("info");
      setTimeout(() => scrollTo("experience"), 100);
    },
  },
  {
    label: "Education",
    response: "I hold both a Master of Science (MSIT) and a Bachelor of Science (BSIT) from President University, with a strong focus on Machine Learning.",
    action: (setActiveTab: any, scrollTo: any) => {
      setActiveTab("info");
      setTimeout(() => scrollTo("education"), 100);
    },
  },
  {
    label: "Publications",
    response: "I've published research on Big Data Analytics for supply chains and feature engineering for book recommendation systems.",
    action: (setActiveTab: any, scrollTo: any) => {
      setActiveTab("info");
      setTimeout(() => scrollTo("publications"), 100);
    },
  },
  {
    label: "Certificates",
    response: "I'm certified in Generative AI (Databricks) and have advanced certifications in React, Angular, and SQL from HackerRank.",
    action: (setActiveTab: any, scrollTo: any) => {
      setActiveTab("info");
      setTimeout(() => scrollTo("certificates"), 100);
    },
  },
  {
    label: "Awards",
    response: "I've received a Government Scholarship for top graduates and successfully shipped systems serving millions of users.",
    action: (setActiveTab: any, scrollTo: any) => {
      setActiveTab("info");
      setTimeout(() => scrollTo("awards"), 100);
    },
  },
  {
    label: "Testimonials",
    response: "My colleagues from Bank Mandiri and SuperApp have highlighted my technical skills, problem-solving, and reliability.",
    action: (setActiveTab: any, scrollTo: any) => {
      setActiveTab("info");
      setTimeout(() => scrollTo("testimonials"), 100);
    },
  },
  {
    label: "Social Links",
    response: "You can find my professional journey on LinkedIn and my code on GitHub. I'll take you to my contact section!",
    action: (setActiveTab: any, scrollTo: any) => {
      setActiveTab("info");
      setTimeout(() => scrollTo("contact"), 100);
    },
  },
  {
    label: "Industries I worked in",
    response: "I've worked across Banking (Digital Banking), Fintech (B2B Trading), E-commerce (Hyper-local supply chain), and Gov-tech (3D Wayfinding).",
    action: (setActiveTab: any, scrollTo: any) => {
      setActiveTab("info");
      setTimeout(() => scrollTo("experience"), 100);
    },
  },
  {
    label: "Download CV",
    response: "Sure thing! I'm opening my latest CV for you in a new tab.",
    action: () => {
      window.open("/resume/Software Engineer - Viona Kaleb.docx", "_blank");
    },
  },
  {
    label: "Tech Stack",
    response: "My core expertise is in TypeScript, React/Next.js, and Angular, with backend experience in Python (FastAPI) and Node.js.",
    action: (setActiveTab: any, scrollTo: any) => {
      setActiveTab("work");
      setTimeout(() => scrollTo("stack"), 100);
    },
  },
  {
    label: "Resume Preview",
    response: "Of course! I'll switch you over to the Resume Preview tab for a full professional view.",
    action: (setActiveTab: any) => {
      setActiveTab("resume");
    },
  },
];

export function ChatBot({ setActiveTab, scrollTo }: ChatBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<{ role: "bot" | "user"; content: string }[]>([
    {
      role: "bot",
      content: "Hi there! 👋 I'm Viona's AI assistant. How can I help you today?",
    },
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleQuickQuestion = (question: string, response: string, action: (setActiveTab: any, scrollTo: any) => void) => {
    setMessages((prev) => [...prev, { role: "user", content: question }]);

    // Simulate bot thinking
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: response,
        },
      ]);
      action(setActiveTab, scrollTo);
    }, 500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="w-80 h-[500px] bg-bg-base border border-ink-muted rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-accent text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot size={18} />
                </div>
                <div>
                  <h3 className="font-medium text-sm">Viona Assistant</h3>
                  <p className="text-[10px] opacity-80">Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded-full transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-bg-base">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex gap-2 max-w-[80%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === "user" ? "bg-ink-primary text-bg-base" : "bg-accent text-white"}`}>
                      {msg.role === "user" ? <User size={12} /> : <Bot size={12} />}
                    </div>
                    <div className={`p-2 rounded-lg text-xs ${msg.role === "user" ? "bg-accent text-white rounded-tr-none" : "bg-ink-muted text-ink-primary rounded-tl-none"}`}>
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            <div className="p-3 border-t border-ink-muted bg-bg-base overflow-y-auto max-h-40">
              <p className="text-[10px] text-ink-muted uppercase font-bold mb-2 px-1">Ask me about:</p>
              <div className="flex flex-wrap gap-2">
                {QUICK_QUESTIONS.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickQuestion(q.label, q.response, q.action)}
                    className="text-[11px] px-2 py-1 rounded-full border border-accent text-accent hover:bg-accent hover:text-white transition-colors"
                  >
                    {q.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-accent text-white shadow-lg flex items-center justify-center cursor-pointer"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </motion.button>
    </div>
  );
}
