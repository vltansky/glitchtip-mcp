# GlitchTip MCP Server

MCP server for integrating GlitchTip error monitoring with AI assistants like Claude.

## Quick Start

### 1. Get Your GlitchTip Credentials

#### API Token (Recommended)

1. Log in to GlitchTip
2. Go to [https://app.glitchtip.com/profile/auth-tokens](https://app.glitchtip.com/profile/auth-tokens)
3. Create a new API token
4. Copy the token

#### Session ID (Alternative)

1. Log in to GlitchTip
2. Open browser DevTools (F12)
3. Go to Application/Storage → Cookies
4. Copy the `sessionid` cookie value

### 2. Configure MCP

#### Option A: Using `.env` file (Recommended)

Create a `.env` file in your project root:

```bash
GLITCHTIP_TOKEN=your-api-token
GLITCHTIP_ORGANIZATION=your-org-slug
GLITCHTIP_BASE_URL=https://app.glitchtip.com
```

Create `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "glitchtip": {
      "command": "npx",
      "args": ["-y", "glitchtip-mcp"]
    }
  }
}
```

Add `.env` to `.gitignore`:

```bash
echo ".env" >> .gitignore
```

#### Option B: Using `env` object in MCP config

Create `.cursor/mcp.json`:

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

Add `.cursor/mcp.json` to `.gitignore`:

```bash
echo ".cursor/mcp.json" >> .gitignore
```

### 3. Start Using

Open your project in Claude Desktop or Cursor. The GlitchTip MCP server will connect automatically.

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

Fetches issues from GlitchTip.

**Parameters**:
- `status` (optional): `'resolved'`, `'unresolved'`, or `'all'` (default: `'unresolved'`)

**Examples**:
- "Show me all GlitchTip errors"
- "Get resolved issues"
- "Show all issues including resolved"

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

- Never commit `.mcp.json`, `.cursor/mcp.json`, or `.env` to version control
- Use `.env` files for storing secrets (automatically ignored by git if added to `.gitignore`)
- Use API tokens instead of session IDs for team usage
- Each developer should use their own credentials

---

## Development & Contributing

### Installation

```bash
npm install
```

### Build

```bash
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

### Project Structure

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

## License

MIT

---

Based on [mcp-glitchtip](https://github.com/coffebar/mcp-glitchtip)
