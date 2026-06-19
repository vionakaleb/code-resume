import { useEffect, useState } from "react";

export function useLiveTime(timeZone = "Asia/Jakarta"): string {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000 * 30);
    return () => window.clearInterval(id);
  }, []);

  return now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone,
  });
}

export function getYearExperience(startedWorking: number): number {
  const currentYear = new Date().getFullYear();

  return currentYear - startedWorking;
}
