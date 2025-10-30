# GlitchTip MCP Server

MCP server for integrating GlitchTip error monitoring with AI assistants like Claude.

## Installation

<details>
<summary><b>Install in Cursor</b></summary>

### Prerequisites

1. [Cursor IDE](https://cursor.com) installed
2. GlitchTip API token or session ID
3. Your GlitchTip organization slug

### Quick Install

[![Install MCP Server](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=glitchtip&config=eyJjb21tYW5kIjoibnB4IC15IGdsaXRjaHRpcC1tY3AifQ%3D%3D)

Click the button above and follow the installation flow, or manually configure:

### Manual Configuration

1. Open your MCP configuration file:
   - **Global (all projects)**: `~/.cursor/mcp.json`
   - **Project-specific**: `.cursor/mcp.json` in project root

2. Add the following configuration:

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

3. Replace the environment variables with your actual values
4. Save the file and restart Cursor

### Using .env File (Recommended)

For better security, store credentials in a `.env` file:

1. Create `.env` in your project root:

```bash
GLITCHTIP_TOKEN=your-api-token
GLITCHTIP_ORGANIZATION=your-org-slug
GLITCHTIP_BASE_URL=https://app.glitchtip.com
```

2. Update `.cursor/mcp.json`:

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

3. Add `.env` to `.gitignore`:

```bash
echo ".env" >> .gitignore
```

### Verify Installation

1. Restart Cursor completely
2. Check for green dot in Settings → Tools & Integrations → MCP Tools
3. In chat/composer, check "Available Tools"
4. Test with: "Show me GlitchTip errors"

</details>

<details>
<summary><b>Install in Claude Desktop</b></summary>

### Prerequisites

1. [Claude Desktop](https://claude.ai/download) installed
2. GlitchTip API token or session ID
3. Your GlitchTip organization slug

### Configuration

1. Open your Claude Desktop configuration file:
   - **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
   - **Linux**: `~/.config/Claude/claude_desktop_config.json`

2. Add the following configuration:

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

3. Replace the environment variables with your actual values
4. Save the file and restart Claude Desktop

### Using .env File (Recommended)

For better security, store credentials in a `.env` file:

1. Create `.env` in your project root:

```bash
GLITCHTIP_TOKEN=your-api-token
GLITCHTIP_ORGANIZATION=your-org-slug
GLITCHTIP_BASE_URL=https://app.glitchtip.com
```

2. Update `claude_desktop_config.json`:

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

3. Add `.env` to `.gitignore`:

```bash
echo ".env" >> .gitignore
```

### Verify Installation

1. Restart Claude Desktop completely
2. Look for the 🔌 icon in the bottom right
3. Click it to see available MCP servers
4. Test with: "Show me GlitchTip errors"

</details>

<details>
<summary><b>Install in Claude Code CLI</b></summary>

### Prerequisites

1. [Claude Code CLI](https://docs.anthropic.com/en/docs/build-with-claude/claude-code) installed
2. GlitchTip API token or session ID
3. Your GlitchTip organization slug

### Installation

Run the following command in your terminal:

```bash
claude mcp add glitchtip -e GLITCHTIP_TOKEN=your-api-token -e GLITCHTIP_ORGANIZATION=your-org-slug -e GLITCHTIP_BASE_URL=https://app.glitchtip.com -- npx -y glitchtip-mcp
```

### Using Environment Variables (Recommended)

For better security, store credentials in a `.env` file:

1. Create `.env` in your project root:

```bash
GLITCHTIP_TOKEN=your-api-token
GLITCHTIP_ORGANIZATION=your-org-slug
GLITCHTIP_BASE_URL=https://app.glitchtip.com
```

2. Add the MCP server:

```bash
claude mcp add glitchtip -e GLITCHTIP_TOKEN=$(grep GLITCHTIP_TOKEN .env | cut -d '=' -f2) -e GLITCHTIP_ORGANIZATION=$(grep GLITCHTIP_ORGANIZATION .env | cut -d '=' -f2) -e GLITCHTIP_BASE_URL=$(grep GLITCHTIP_BASE_URL .env | cut -d '=' -f2) -- npx -y glitchtip-mcp
```

3. Add `.env` to `.gitignore`:

```bash
echo ".env" >> .gitignore
```

### Configuration Scopes

- `-s user`: Available across all projects
- `-s project`: Shared via `.mcp.json` file (committed to repo)
- Default: `local` (current project only)

### Verify Installation

```bash
claude mcp list
claude mcp get glitchtip
```

Test with: "Show me GlitchTip errors"

</details>

<details>
<summary><b>Install in Cline (VS Code Extension)</b></summary>

### Prerequisites

1. [VS Code](https://code.visualstudio.com/) installed
2. [Cline extension](https://marketplace.visualstudio.com/items?itemName=saoudrizwan.claude-dev) installed
3. GlitchTip API token or session ID
4. Your GlitchTip organization slug

### Configuration

1. Open VS Code
2. Click the MCP Servers icon (📚) in the Cline extension
3. Click the "Installed" tab
4. Click "Configure MCP Servers"
5. Add the following to `cline_mcp_settings.json`:

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

6. Replace the environment variables with your actual values
7. Save the file
8. Restart VS Code or reload the Cline extension

### Using .env File (Recommended)

For better security, store credentials in a `.env` file:

1. Create `.env` in your project root:

```bash
GLITCHTIP_TOKEN=your-api-token
GLITCHTIP_ORGANIZATION=your-org-slug
GLITCHTIP_BASE_URL=https://app.glitchtip.com
```

2. Update `cline_mcp_settings.json`:

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

3. Add `.env` to `.gitignore`:

```bash
echo ".env" >> .gitignore
```

### Verify Installation

1. Restart VS Code or reload Cline
2. Check the MCP Servers panel in Cline
3. Look for "glitchtip" in the list of connected servers
4. Test with: "Show me GlitchTip errors"

</details>

## Getting Your GlitchTip Credentials

<details>
<summary><b>API Token (Recommended)</b></summary>

1. Log in to GlitchTip
2. Go to [https://app.glitchtip.com/profile/auth-tokens](https://app.glitchtip.com/profile/auth-tokens)
3. Create a new API token
4. Copy the token

</details>

<details>
<summary><b>Session ID (Alternative)</b></summary>

1. Log in to GlitchTip
2. Open browser DevTools (F12)
3. Go to Application/Storage → Cookies
4. Copy the `sessionid` cookie value

</details>

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

## Available Prompts

### `recent_errors`

Get overview of recent production errors with analysis and prioritization.

**Use case**: Quick triage of production issues

**Example**: "Use the recent_errors prompt"

### `debug_issue`

Deep-dive into a specific error with full context and suggested fixes.

**Parameters**:
- `issueId`: The issue ID to debug

**Use case**: Detailed investigation of a specific error

**Example**: "Use the debug_issue prompt for issue 12345"

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

### Use Prompts for Guided Analysis

```
User: "Use the recent_errors prompt"

AI: [Analyzes all unresolved issues]
Summary:
- 23 unresolved errors across 5 projects
- Critical: DatabaseConnectionError (89 occurrences)
- High: TimeoutError in payment flow (45 occurrences)
- Medium: ValidationErrors (12 occurrences)

Recommended prioritization:
1. Fix database connection pooling
2. Investigate payment timeout root cause
3. Add validation for edge cases

User: "Use the debug_issue prompt for issue 12345"

AI: [Deep-dives into specific error with stack trace and fix suggestions]
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
