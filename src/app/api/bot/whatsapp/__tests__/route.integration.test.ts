import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/knowledge", () => ({
  answerFromKnowledge: vi.fn(async () => "yaml answer")
}));

import { GET, POST } from "@/app/api/bot/whatsapp/route";

describe("/api/bot/whatsapp", () => {
  it("verifies webhook when token matches", async () => {
    process.env.WHATSAPP_VERIFY_TOKEN = "ok";
    const req = new Request(
      "http://test/api/bot/whatsapp?hub.mode=subscribe&hub.verify_token=ok&hub.challenge=123"
    );
    const res = await GET(req as never);
    expect(res.status).toBe(200);
  });

  it("fails verification when token mismatches", async () => {
    const req = new Request(
      "http://test/api/bot/whatsapp?hub.mode=subscribe&hub.verify_token=nope&hub.challenge=1"
    );
    const res = await GET(req as never);
    expect(res.status).toBe(403);
  });

  it("skips when no inbound message", async () => {
    const req = new Request("http://test", { method: "POST", body: JSON.stringify({}) });
    const res = await POST(req as never);
    expect(res.status).toBe(200);
  });

  it("returns send failure when meta API rejects", async () => {
    process.env.WHATSAPP_ACCESS_TOKEN = "token";
    process.env.WHATSAPP_PHONE_NUMBER_ID = "pid";
    vi.stubGlobal("fetch", vi.fn(async () => new Response("meta error", { status: 500 })));
    const req = new Request("http://test", {
      method: "POST",
      body: JSON.stringify({
        entry: [{ changes: [{ value: { messages: [{ text: { body: "hello" }, from: "555" }] } }] }]
      })
    });
    const res = await POST(req as never);
    expect(res.status).toBe(502);
  });

  it("returns ok when outbound whatsapp send succeeds", async () => {
    process.env.WHATSAPP_ACCESS_TOKEN = "token";
    process.env.WHATSAPP_PHONE_NUMBER_ID = "pid";
    vi.stubGlobal("fetch", vi.fn(async () => new Response("{}", { status: 200 })));
    const req = new Request("http://test", {
      method: "POST",
      body: JSON.stringify({
        entry: [{ changes: [{ value: { messages: [{ text: { body: "hello" }, from: "555" }] } }] }]
      })
    });
    const res = await POST(req as never);
    expect(res.status).toBe(200);
  });
});
