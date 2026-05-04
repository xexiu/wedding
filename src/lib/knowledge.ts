import { readFileSync } from "node:fs";
import { join } from "node:path";
import { getSiteConfig } from "@/lib/site-config-store";
import YAML from "yaml";

type QaEntry = { q: string; a: string };

type Knowledge = {
  faq: QaEntry[];
  fallback: { answer: string };
};

function normalize(value: string): string {
  return value.toLowerCase().replace(/[^\w\s]/g, "").trim();
}

export function loadKnowledge(): Knowledge {
  const file = join(process.cwd(), "src/content/faq.yml");
  const parsed = YAML.parse(readFileSync(file, "utf8")) as Knowledge;
  return parsed;
}

export async function answerFromKnowledge(question: string): Promise<string> {
  const data = loadKnowledge();
  const q = normalize(question);
  const siteConfig = await getSiteConfig();
  const details = siteConfig.weddingDetails;

  if (q.includes("bride") || q.includes("groom") || q.includes("name")) {
    return `${details.brideName} & ${details.groomName}`;
  }
  if (q.includes("date") || q.includes("day")) {
    return `The wedding date is ${details.weddingDate}.`;
  }
  if (q.includes("venue") || q.includes("location") || q.includes("where")) {
    return `The venue is ${details.venueName.en}.`;
  }
  if (q.includes("deadline") || q.includes("rsvp")) {
    return `RSVP deadline is ${details.rsvpDeadline}.`;
  }

  const hit = data.faq.find((item) => normalize(item.q).includes(q) || q.includes(normalize(item.q)));
  return hit?.a ?? data.fallback.answer;
}

export function getFaqEntries(): QaEntry[] {
  return loadKnowledge().faq;
}
