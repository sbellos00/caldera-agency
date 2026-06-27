'use client'

import { useEffect } from 'react'

// WebMCP (Web Model Context) lets browser-based AI agents discover and call
// site actions directly. The API is experimental and only present in
// agent-enabled browsers, so everything here is feature-detected and a no-op
// elsewhere. Tools map 1:1 to the existing /api/contact and /api/prototype
// JSON endpoints, so an agent can do exactly what a human can via the forms.

// Minimal shape of the proposed navigator.modelContext API. Declared locally
// because it is not yet part of the standard DOM lib types.
type McpToolResult = { content: Array<{ type: 'text'; text: string }> }

interface McpTool {
  name: string
  description: string
  inputSchema: Record<string, unknown>
  execute: (args: Record<string, unknown>) => Promise<McpToolResult>
}

interface ModelContext {
  provideContext?: (context: { tools: McpTool[] }) => void
  registerTool?: (tool: McpTool) => void
}

function getModelContext(): ModelContext | undefined {
  if (typeof navigator === 'undefined') return undefined
  return (navigator as Navigator & { modelContext?: ModelContext }).modelContext
}

async function postJson(path: string, body: Record<string, unknown>): Promise<McpToolResult> {
  try {
    const res = await fetch(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    const data = await res.json().catch(() => ({}))
    const text =
      (data && (data.message || data.error)) ||
      (res.ok ? 'Request submitted successfully.' : 'Request failed.')
    return { content: [{ type: 'text', text }] }
  } catch {
    return {
      content: [
        { type: 'text', text: 'Could not reach Caldera Agency. Please try again or email contact@caldera.agency.' },
      ],
    }
  }
}

const tools: McpTool[] = [
  {
    name: 'submit_contact_inquiry',
    description:
      "Send a contact inquiry to Caldera Agency, a website agency for solo consultants. Use this when a user wants to get in touch, ask a question, or start a project.",
    inputSchema: {
      type: 'object',
      required: ['name', 'email'],
      properties: {
        name: { type: 'string', description: 'Full name of the person reaching out' },
        email: { type: 'string', description: 'Contact email address' },
        message: { type: 'string', description: 'The inquiry or message' },
        linkedin: { type: 'string', description: 'Optional LinkedIn profile URL' },
        website: { type: 'string', description: 'Optional current website URL' },
      },
    },
    execute: (args) =>
      postJson('/api/contact', {
        name: args.name,
        email: args.email,
        // Always send a message key so the API treats this as a full inquiry.
        message: args.message ?? '',
        linkedin: args.linkedin,
        website: args.website,
      }),
  },
  {
    name: 'request_free_prototype',
    description:
      "Request a free website prototype from Caldera Agency. Caldera researches the consultant's background and builds a working prototype before any payment. Use this when a user wants to start the free prototype process.",
    inputSchema: {
      type: 'object',
      required: ['linkedin', 'email'],
      properties: {
        linkedin: { type: 'string', description: "The consultant's LinkedIn profile URL" },
        email: { type: 'string', description: 'Contact email address' },
      },
    },
    execute: (args) =>
      postJson('/api/prototype', {
        linkedin: args.linkedin,
        email: args.email,
      }),
  },
]

export default function WebMCP() {
  useEffect(() => {
    const ctx = getModelContext()
    if (!ctx) return

    try {
      if (typeof ctx.provideContext === 'function') {
        ctx.provideContext({ tools })
      } else if (typeof ctx.registerTool === 'function') {
        // Fallback for the per-tool registration variant of the API.
        tools.forEach((tool) => ctx.registerTool!(tool))
      }
    } catch {
      // Experimental API: never let a registration failure affect the page.
    }
  }, [])

  return null
}
