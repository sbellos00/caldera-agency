import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

// Sender must be on a domain verified in Resend. `onboarding@resend.dev` is the
// sandbox sender: it only delivers to the Resend account owner's own address,
// which is fine here because CONTACT_EMAIL is that address. Once caldera.agency
// is verified at https://resend.com/domains, set
// RESEND_FROM="Caldera Agency <noreply@caldera.agency>" to send from the real
// domain (verified 2026-08: caldera.agency is NOT yet verified on this account).
const FROM = process.env.RESEND_FROM || 'Caldera Agency <onboarding@resend.dev>'
const TO = process.env.CONTACT_EMAIL || 'hello@caldera.agency'

const MAX_LEN = { name: 200, email: 320, message: 5000, linkedin: 500, website: 500 }

/** Escape user input before it goes anywhere near the email HTML. */
function esc(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/** Only linkify http(s) URLs — anything else is rendered as plain text. */
function safeUrl(value: string) {
  try {
    const url = new URL(value.trim())
    return url.protocol === 'http:' || url.protocol === 'https:' ? url.toString() : null
  } catch {
    return null
  }
}

function field(label: string, value: string) {
  return `<p style="margin: 8px 0; color: #555;"><strong>${label}:</strong> ${value}</p>`
}

function linkField(label: string, value: string) {
  const url = safeUrl(value)
  if (!url) return field(label, esc(value))
  return field(
    label,
    `<a href="${esc(url)}" style="color: #0019ff; text-decoration: none;" target="_blank" rel="noopener noreferrer">${esc(url)}</a>`
  )
}

export async function POST(request: NextRequest) {
  try {
    let body: Record<string, unknown>
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
    }

    // Coerce and trim everything up front so validation and rendering agree.
    const read = (key: keyof typeof MAX_LEN) => {
      const raw = body[key]
      return typeof raw === 'string' ? raw.trim().slice(0, MAX_LEN[key]) : ''
    }
    const name = read('name')
    const email = read('email')
    const message = read('message')
    const linkedin = read('linkedin')
    const website = read('website')
    // Honeypot: real people leave this hidden field empty. Accept silently so
    // bots get a success response and don't retry.
    const honeypot = typeof body.company === 'string' ? body.company.trim() : ''
    if (honeypot) {
      return NextResponse.json({ success: true, message: 'Thank you for your inquiry. We will contact you soon.' })
    }

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('[contact] RESEND_API_KEY is not configured')
      return NextResponse.json(
        { error: 'Our contact form is temporarily unavailable. Please email us directly.' },
        { status: 500 }
      )
    }

    const resend = new Resend(process.env.RESEND_API_KEY)

    // `source` is what the client tells us; fall back to the old heuristic so
    // any client that hasn't been updated still labels itself sensibly.
    const source = body.source === 'contact-page' || body.source === 'homepage'
      ? body.source
      : message
        ? 'contact-page'
        : 'homepage'
    const sourceLabel = source === 'contact-page' ? 'contact page' : 'homepage'

    let emailContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
        <div style="background: #0019ff; padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 600;">New Website Inquiry</h1>
        </div>

        <div style="padding: 30px;">
          <div style="background: #f8f9fa; padding: 24px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #0019ff;">
            <h3 style="margin-top: 0; color: #333; font-size: 18px; font-weight: 600;">Contact Information</h3>
            ${field('Name', esc(name))}
            ${field('Email', `<a href="mailto:${esc(email)}" style="color: #0019ff; text-decoration: none;">${esc(email)}</a>`)}`

    if (linkedin) emailContent += linkField('LinkedIn', linkedin)
    if (website) emailContent += linkField('Website', website)

    emailContent += `</div>`

    if (message) {
      emailContent += `
        <div style="background: #f8f9fa; padding: 24px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #0019ff;">
          <h3 style="margin-top: 0; color: #333; font-size: 18px; font-weight: 600;">Message</h3>
          <p style="margin: 8px 0; color: #555; line-height: 1.6; white-space: pre-wrap;">${esc(message)}</p>
        </div>`
    }

    emailContent += `
          <div style="text-align: center; margin: 30px 0;">
            <a href="mailto:${esc(email)}" style="background: #0019ff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 500; display: inline-block;">Reply to ${esc(name)}</a>
          </div>
        </div>

        <div style="background: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #eee;">
          <p style="color: #999; font-size: 14px; margin: 0;">
            This inquiry was submitted through the Caldera Agency website ${sourceLabel} form.
          </p>
        </div>
      </div>`

    const { data, error } = await resend.emails.send({
      from: FROM,
      to: TO,
      // Hitting reply in the inbox answers the lead directly.
      replyTo: email,
      subject: `New Website Inquiry from ${name} (${source === 'contact-page' ? 'Contact Form' : 'Homepage Form'})`,
      html: emailContent,
    })

    if (error) {
      // Log the provider's reason (bad sender domain, rate limit, ...) but never
      // leak it to the browser.
      console.error('[contact] Resend rejected the send:', error)
      return NextResponse.json(
        { error: 'We could not send your message. Please email us directly at contact@caldera.agency.' },
        { status: 502 }
      )
    }

    console.log('[contact] sent', data?.id, 'from', sourceLabel, 'form')

    return NextResponse.json({
      success: true,
      message: 'Thank you for your inquiry. We will contact you soon.',
    })
  } catch (error) {
    console.error('[contact] unexpected error:', error)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again or email us at contact@caldera.agency.' },
      { status: 500 }
    )
  }
}
