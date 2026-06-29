export interface MemoryRecord {
  id: string;
  organizationId: string;
  title: string;
  summary: string;
  tags: string[];
  confidence: number;
  verified: boolean;
  createdAt: string;
}

export interface MemorySearchResult {
  query: string;
  matches: MemoryRecord[];
  matchCount: number;
}

export class MemoryStore {
  private readonly records: MemoryRecord[] = [];

  seed(records: Omit<MemoryRecord, "id" | "createdAt">[]): MemoryRecord[] {
    return records.map((record) => this.write(record));
  }

  write(input: Omit<MemoryRecord, "id" | "createdAt">): MemoryRecord {
    const record: MemoryRecord = {
      id: "mem-" + Date.now() + "-" + this.records.length,
      createdAt: new Date().toISOString(),
      ...input
    };

    this.records.push(record);
    return record;
  }

  search(input: { organizationId: string; query: string; tags?: string[] }): MemorySearchResult {
    const query = input.query.toLowerCase();
    const tags = input.tags ?? [];

    const matches = this.records.filter((record) => {
      if (record.organizationId !== input.organizationId) return false;

      const textMatch =
        record.title.toLowerCase().includes(query) ||
        record.summary.toLowerCase().includes(query) ||
        record.tags.some((tag) => query.includes(tag.toLowerCase()));

      const tagMatch = tags.length === 0 || tags.some((tag) => record.tags.includes(tag));

      return textMatch || tagMatch;
    });

    return {
      query: input.query,
      matches,
      matchCount: matches.length
    };
  }

  list(): MemoryRecord[] {
    return [...this.records];
  }
}

export function createSeededEngineeringMemory(): MemoryStore {
  const store = new MemoryStore();

  store.seed([
    {
      organizationId: "mobius-technologies",
      title: "First Breath objective approved",
      summary: "First Breath is defined as one complete observable Intelligence Loop from request intake to memory persistence and dashboard telemetry.",
      tags: ["first-breath", "engineering", "runtime", "dashboard"],
      confidence: 0.98,
      verified: true
    },
    {
      organizationId: "mobius-technologies",
      title: "Brain memory-first policy approved",
      summary: "Atlas Brain should search organizational memory before selecting or calling an external AI provider.",
      tags: ["brain", "memory", "policy", "provider-independence"],
      confidence: 0.97,
      verified: true
    }
  ]);

  return store;
}
