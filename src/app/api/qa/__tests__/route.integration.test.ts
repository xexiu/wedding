import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/knowledge", () => ({
  answerFromKnowledge: vi.fn(async () => "from knowledge")
}));

import { POST } from "@/app/api/qa/route";

describe("/api/qa", () => {
  it("returns 400 without question", async () => {
    const req = new Request("http://test/api/qa", {
      method: "POST",
      body: JSON.stringify({})
    });
    const res = await POST(req as never);
    expect(res.status).toBe(400);
  });

  it("returns answer with valid question", async () => {
    const req = new Request("http://test/api/qa", {
      method: "POST",
      body: JSON.stringify({ question: "date?" })
    });
    const res = await POST(req as never);
    expect(res.status).toBe(200);
  });
});
