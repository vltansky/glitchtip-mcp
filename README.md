# GlitchTip MCP Server

MCP server for integrating GlitchTip error monitoring with AI assistants like Claude.

## Features

- Fetch and analyze issues from your GlitchTip instance
- Get detailed error context including stack traces and metadata
- AI-powered debugging assistance for production errors

## Installation

```bash
npm install glitchtip-mcp
```

## Quick Start

### 1. Get GlitchTip Credentials

You need:
- **Authentication**: API token (recommended) or Session ID
- **Organization**: Your organization slug from GlitchTip
- **Base URL**: Your GlitchTip instance URL (optional, defaults to https://app.glitchtip.com)

#### Option 1: API Token (Recommended)

1. Log in to GlitchTip
2. Navigate to `/profile/auth-tokens`
3. Create a new API token
4. Copy the token

#### Option 2: Session ID

1. Log in to GlitchTip
2. Open browser DevTools (F12)
3. Go to Application/Storage → Cookies
4. Copy the `sessionid` cookie value

### 2. Configure Your Project

Create `.mcp.json` in your project root:

```json
{
  "mcpServers": {
    "glitchtip": {
      "command": "npx",
      "args": ["-y", "glitchtip-mcp"],
      "env": {
        "GLITCHTIP_TOKEN": "your-api-token",
        "GLITCHTIP_ORGANIZATION": "your-org-slug",
        "GLITCHTIP_BASE_URL": "https://app.glitchtip.com"
      }
    }
  }
}
```

**Important**: Add `.mcp.json` to `.gitignore`:

```bash
echo ".mcp.json" >> .gitignore
```

### 3. Open in Claude Desktop

Open your project folder in Claude Desktop. It will automatically connect to your GlitchTip instance.

## Configuration

| Variable | Required | Description | Default |
|----------|----------|-------------|---------|
| `GLITCHTIP_TOKEN` | Yes* | API token | - |
| `GLITCHTIP_SESSION_ID` | Yes* | Session cookie | - |
| `GLITCHTIP_ORGANIZATION` | Yes | Organization slug | - |
| `GLITCHTIP_BASE_URL` | No | Instance URL | `https://app.glitchtip.com` |

*Either `GLITCHTIP_TOKEN` or `GLITCHTIP_SESSION_ID` is required

## Available Tools

### `glitchtip_issues`

Fetches all unresolved issues from GlitchTip.

**Example**: "Show me all GlitchTip errors"

### `glitchtip_latest_event`

Gets the latest event for a specific issue with full context.

**Parameters**:
- `issueId`: The issue ID

**Example**: "Get details for issue #123"

## Available Resources

### `glitchtip://issues`

Resource endpoint providing all current issues in JSON format.

## Usage Examples

### Debug Production Error

```
User: "Check GlitchTip for recent 500 errors"

AI: I found 3 recent 500 errors:
1. DatabaseConnectionError in /api/users
2. TimeoutError in payment processing
3. ValidationError in checkout flow

User: "Show me details about the payment timeout"

AI: [Analyzes event] The TimeoutError occurs when...
[Provides stack trace and suggested fixes]
```

### Monitor Error Trends

```
User: "What are the most frequent errors?"

AI: Top errors by frequency:
1. CORS policy errors (145 occurrences)
2. Missing auth token (89 occurrences)
3. Rate limit exceeded (67 occurrences)
```

## Development

### Build

```bash
npm install
npm run build
```

### Watch Mode

```bash
npm run watch
```

### Test with MCP Inspector

```bash
export GLITCHTIP_TOKEN="your-token"
export GLITCHTIP_ORGANIZATION="your-org"
npm run inspector
```

## Project Structure

```
glitchtip-mcp/
├── src/
│   ├── types.ts      # TypeScript type definitions
│   ├── client.ts     # GlitchTip API client
│   └── index.ts      # MCP server implementation
├── package.json
├── tsconfig.json
└── README.md
```

## Troubleshooting

### Authentication Failed

- Verify your token/session ID is valid
- Check organization slug is correct
- Ensure token has appropriate permissions

### Connection Error

- Verify `GLITCHTIP_BASE_URL` is correct
- Check network connectivity
- Ensure GlitchTip instance is accessible

### No Issues Found

- Verify issues exist in GlitchTip
- Check organization slug
- Ensure you have permission to view issues

## Security

- Never commit `.mcp.json` to version control
- Use API tokens instead of session IDs for team usage
- Each developer should use their own credentials

## License

MIT
