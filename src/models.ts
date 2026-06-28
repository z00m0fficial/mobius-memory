export type MemoryEventType =
  | "founder-approval"
  | "meeting-summary"
  | "voice-capture"
  | "repository-update"
  | "routing-decision"
  | "architecture-decision"
  | "platform-change-proposal"
  | "atlas-recommendation"
  | "metric-snapshot";

export interface MemoryEvent {
  id: string;
  timestamp: string;
  organizationId: string;
  department: string;
  source: string;
  eventType: MemoryEventType;
  title: string;
  summary: string;
  participants: string[];
  confidence: number;
  verified: boolean;
  linkedRepositories: string[];
  relatedEvents: string[];
  tags: string[];
  approvedBy?: string;
}

export interface MemorySearchQuery {
  organizationId: string;
  query: string;
  eventTypes?: MemoryEventType[];
  repositories?: string[];
  verifiedOnly?: boolean;
}
