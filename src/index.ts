export type { MemoryEvent, MemoryEventType, MemorySearchQuery } from "./models.js";

export function createMemoryEventId(): string {
  return "mem-" + Date.now();
}

export function isMemoryEventVerified(confidence: number, approved: boolean): boolean {
  return approved && confidence >= 0.85;
}
