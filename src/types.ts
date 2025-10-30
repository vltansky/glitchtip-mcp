export interface GlitchTipConfig {
  baseUrl: string;
  token?: string;
  sessionId?: string;
  organization: string;
}

export interface GlitchTipIssue {
  id: string;
  count: string;
  type: string;
  level: string;
  status: string;
  project: {
    id: string;
    platform: string;
    slug: string;
    name: string;
  };
  shortId: string;
  numComments: number;
  stats: {
    "24h": unknown[];
  };
  shareId: string | null;
  logger: string | null;
  permalink: string;
  statusDetails: Record<string, unknown>;
  subscriptionDetails: unknown;
  userCount: number;
  matchingEventId: string | null;
  firstSeen: string;
  lastSeen: string;
  title: string;
  metadata: Record<string, unknown>;
  culprit: string;
}

export interface GlitchTipEvent {
  platform: string;
  id: string;
  eventID: string;
  projectID: number;
  groupID: string;
  dateCreated: string;
  dateReceived: string;
  dist: string | null;
  culprit: string;
  packages: unknown;
  type: string;
  message: string;
  metadata: {
    type: string;
    value: string;
    filename: string;
    function: string;
  };
  tags: Array<{
    key: string;
    value: string;
  }>;
  entries: Array<{
    type: string;
    data: unknown;
  }>;
  contexts: Record<string, unknown>;
  context: Record<string, unknown>;
  user: unknown;
  sdk: {
    name: string;
    version: string;
    packages: Array<{
      name: string;
      version: string;
    }>;
    integrations: string[];
  };
  title: string;
  userReport: unknown;
  nextEventID: string | null;
  previousEventID: string | null;
}

export class GlitchTipValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GlitchTipValidationError';
  }
}

export class GlitchTipApiError extends Error {
  statusCode?: number;

  constructor(message: string, statusCode?: number) {
    super(message);
    this.name = 'GlitchTipApiError';
    this.statusCode = statusCode;
  }
}

export class GlitchTipConnectionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GlitchTipConnectionError';
  }
}
