import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { linkedin, email } = body

    if (!linkedin || !email) {
      return NextResponse.json(
        { error: 'LinkedIn URL and email are required' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured')
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      )
    }

    const resend = new Resend(process.env.RESEND_API_KEY)

    const emailContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
        <div style="background: #0019ff; padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 600;">New Prototype Request</h1>
        </div>
        <div style="padding: 30px;">
          <div style="background: #f8f9fa; padding: 24px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #0019ff;">
            <h3 style="margin-top: 0; color: #333; font-size: 18px; font-weight: 600;">Request Details</h3>
            <p style="margin: 8px 0; color: #555;"><strong>LinkedIn:</strong> <a href="${linkedin}" style="color: #0019ff; text-decoration: none;" target="_blank">${linkedin}</a></p>
            <p style="margin: 8px 0; color: #555;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #0019ff; text-decoration: none;">${email}</a></p>
          </div>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${linkedin}" style="background: #0019ff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 500; display: inline-block; margin-right: 8px;">View LinkedIn</a>
            <a href="mailto:${email}" style="background: #333; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 500; display: inline-block;">Reply</a>
          </div>
        </div>
        <div style="background: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #eee;">
          <p style="color: #999; font-size: 14px; margin: 0;">
            This request was submitted through the Caldera Agency prototype form.
          </p>
        </div>
      </div>`

    const result = await resend.emails.send({
      from: 'Caldera Agency <onboarding@resend.dev>',
      to: process.env.CONTACT_EMAIL || 'hello@caldera.agency',
      subject: `New Prototype Request`,
      html: emailContent,
    })

    if (result.error) {
      console.error('Resend error:', result.error)
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Prototype request received.',
    })
  } catch (error) {
    console.error('Prototype request error:', error)
    return NextResponse.json(
      { error: 'Failed to process request. Please try again.' },
      { status: 500 }
    )
  }
}
