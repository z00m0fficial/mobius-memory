import assert from "node:assert/strict";
import test from "node:test";
import { createSeededEngineeringMemory, MemoryStore } from "../src/memory-store.js";

test("memory store writes and returns records", () => {
  const store = new MemoryStore();

  const record = store.write({
    organizationId: "mobius-technologies",
    title: "Runtime API work",
    summary: "Runtime API is the active engineering priority.",
    tags: ["runtime", "engineering"],
    confidence: 0.95,
    verified: true
  });

  assert.equal(record.verified, true);
  assert.equal(store.list().length, 1);
});

test("seeded engineering memory returns First Breath context", () => {
  const store = createSeededEngineeringMemory();
  const result = store.search({
    organizationId: "mobius-technologies",
    query: "summarize today's engineering work",
    tags: ["engineering"]
  });

  assert.ok(result.matchCount >= 1);
});
