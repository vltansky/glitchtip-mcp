#!/usr/bin/env node

import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { GlitchTipClient } from "./client.js";

const server = new McpServer({
  name: "glitchtip-mcp",
  version: "1.0.0"
});

const glitchTipClient = new GlitchTipClient({
  baseUrl: process.env.GLITCHTIP_BASE_URL || 'https://app.glitchtip.com',
  token: process.env.GLITCHTIP_TOKEN,
  sessionId: process.env.GLITCHTIP_SESSION_ID,
  organization: process.env.GLITCHTIP_ORGANIZATION!
});

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
    try {
      const issues = await glitchTipClient.getIssues('is:unresolved');
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
    try {
      const query = status === 'all' ? undefined : `is:${status}`;
      const issues = await glitchTipClient.getIssues(query);
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
    try {
      const event = await glitchTipClient.getIssueEvents(issueId, true);
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
