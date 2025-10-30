#!/usr/bin/env node

import 'dotenv/config';
import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { GlitchTipClient } from "./client.js";

const server = new McpServer({
  name: "glitchtip-mcp",
  version: "1.0.0"
});

function getGlitchTipClient(): GlitchTipClient | null {
  try {
    return new GlitchTipClient({
      baseUrl: process.env.GLITCHTIP_BASE_URL || 'https://app.glitchtip.com',
      token: process.env.GLITCHTIP_TOKEN,
      sessionId: process.env.GLITCHTIP_SESSION_ID,
      organization: process.env.GLITCHTIP_ORGANIZATION!
    });
  } catch (error) {
    return null;
  }
}

function getValidationError(): string {
  if (!process.env.GLITCHTIP_TOKEN && !process.env.GLITCHTIP_SESSION_ID) {
    return 'Either token or session ID is required';
  }
  if (!process.env.GLITCHTIP_ORGANIZATION) {
    return 'Organization is required';
  }
  return 'Configuration error';
}

server.resource(
  "issues",
  new ResourceTemplate("glitchtip://issues", {
    list: () => ({
      resources: [{
        uri: "glitchtip://issues",
        mimeType: "application/json",
        name: "GlitchTip Issues",
        description: "All unresolved issues from GlitchTip error monitoring"
      }]
    })
  }),
  async (uri) => {
    const client = getGlitchTipClient();
    if (!client) {
      return {
        contents: [{
          uri: uri.href,
          mimeType: "text/plain",
          text: getValidationError()
        }]
      };
    }
    try {
      const issues = await client.getIssues('is:unresolved');
      return {
        contents: [{
          uri: uri.href,
          mimeType: "application/json",
          text: JSON.stringify(issues, null, 2)
        }]
      };
    } catch (error) {
      return {
        contents: [{
          uri: uri.href,
          mimeType: "text/plain",
          text: error instanceof Error ? error.message : 'Error fetching issues'
        }]
      };
    }
  }
);

server.tool(
  "glitchtip_issues",
  "Get all issues from GlitchTip",
  {
    status: z.enum(['resolved', 'unresolved', 'all']).optional().describe("Filter issues by status: 'resolved', 'unresolved', or 'all' (default: 'unresolved')")
  },
  async ({ status = 'unresolved' }) => {
    const client = getGlitchTipClient();
    if (!client) {
      return {
        content: [{
          type: "text",
          text: getValidationError()
        }]
      };
    }
    try {
      const query = status === 'all' ? undefined : `is:${status}`;
      const issues = await client.getIssues(query);
      return {
        content: [{
          type: "text",
          text: JSON.stringify(issues, null, 2)
        }]
      };
    } catch (error) {
      return {
        content: [{
          type: "text",
          text: error instanceof Error ? error.message : 'Error fetching issues'
        }]
      };
    }
  }
);

server.tool(
  "glitchtip_latest_event",
  "Get the latest event for a specific issue",
  {
    issueId: z.string().describe("The issue ID to get the latest event for")
  },
  async ({ issueId }) => {
    const client = getGlitchTipClient();
    if (!client) {
      return {
        content: [{
          type: "text",
          text: getValidationError()
        }]
      };
    }
    try {
      const event = await client.getIssueEvents(issueId, true);
      return {
        content: [{
          type: "text",
          text: JSON.stringify(event, null, 2)
        }]
      };
    } catch (error) {
      return {
        content: [{
          type: "text",
          text: error instanceof Error ? error.message : 'Error fetching latest event'
        }]
      };
    }
  }
);

const main = async () => {
  const transport = new StdioServerTransport();
  await server.connect(transport);
};

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
