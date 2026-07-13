export interface LinkedInPost {
  id: string;
  link: string;
  embedUrl: string;
  collapsedHeight: number;
}

const LINKEDIN_EMBED_BASE = "https://www.linkedin.com/embed/feed/update";

export const linkedinPosts: LinkedInPost[] = [
  {
    id: "urn:li:share:7482293313488728064",
    link: "https://www.linkedin.com/posts/vionakaleb_sistech2026-womenintech-frontendengineering-activity-7482293314692730880-4r2-?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAABtfvw0BEeCfYmRN9CmBBlWYbyrfcEb7mzg",
    embedUrl: `${LINKEDIN_EMBED_BASE}/urn:li:share:7482293313488728064`,
    collapsedHeight: 560,
  },
  {
    id: "urn:li:ugcPost:6989061588578177024",
    link: "https://www.linkedin.com/posts/superapp-id_breaking-the-stereotype-viona-activity-6989061590071341056--0-I?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAABtfvw0BEeCfYmRN9CmBBlWYbyrfcEb7mzg",
    embedUrl: `${LINKEDIN_EMBED_BASE}/urn:li:ugcPost:6989061588578177024`,
    collapsedHeight: 560,
  },
];
