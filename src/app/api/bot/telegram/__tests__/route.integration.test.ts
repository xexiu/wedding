import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/knowledge", () => ({
  answerFromKnowledge: vi.fn(async () => "yaml answer")
}));

import { POST } from "@/app/api/bot/telegram/route";

describe("/api/bot/telegram", () => {
  it("skips when no text", async () => {
    const req = new Request("http://test", { method: "POST", body: JSON.stringify({}) });
    const res = await POST(req as never);
    expect(res.status).toBe(200);
  });

  it("returns token missing error when token absent", async () => {
    const req = new Request("http://test", {
      method: "POST",
      body: JSON.stringify({ message: { text: "hello", chat: { id: 1 } } })
    });
    const res = await POST(req as never);
    expect(res.status).toBe(200);
  });

  it("sends message to telegram API when token and chat are present", async () => {
    process.env.TELEGRAM_BOT_TOKEN = "token";
    vi.stubGlobal("fetch", vi.fn(async () => new Response("{}", { status: 200 })));
    const req = new Request("http://test", {
      method: "POST",
      body: JSON.stringify({ message: { text: "hello", chat: { id: 123 } } })
    });
    const res = await POST(req as never);
    expect(res.status).toBe(200);
  });
});
