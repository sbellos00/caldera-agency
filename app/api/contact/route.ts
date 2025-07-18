import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, message, linkedin, website } = body
    
    // Debug logging
    console.log('=== Contact Form Debug ===')
    console.log('RESEND_API_KEY exists:', !!process.env.RESEND_API_KEY)
    console.log('CONTACT_EMAIL:', process.env.CONTACT_EMAIL)
    console.log('Form data received:', { name, email, hasMessage: !!message, hasLinkedIn: !!linkedin, hasWebsite: !!website })
    
    // Validate required fields (name and email are always required)
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured')
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      )
    }

    // Determine form type based on which fields are present
    const isContactPageForm = message !== undefined
    const isHomepageForm = linkedin !== undefined || website !== undefined

    // Build the email content based on form type
    let emailContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
        <div style="background: #0019ff; padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 600;">New Website Inquiry</h1>
        </div>
        
        <div style="padding: 30px;">
          <div style="background: #f8f9fa; padding: 24px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #0019ff;">
            <h3 style="margin-top: 0; color: #333; font-size: 18px; font-weight: 600;">Contact Information</h3>
            <p style="margin: 8px 0; color: #555;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 8px 0; color: #555;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #0019ff; text-decoration: none;">${email}</a></p>`

    if (linkedin) {
      emailContent += `<p style="margin: 8px 0; color: #555;"><strong>LinkedIn:</strong> <a href="${linkedin}" style="color: #0019ff; text-decoration: none;" target="_blank">${linkedin}</a></p>`
    }

    if (website) {
      emailContent += `<p style="margin: 8px 0; color: #555;"><strong>Website:</strong> <a href="${website}" style="color: #0019ff; text-decoration: none;" target="_blank">${website}</a></p>`
    }

    emailContent += `</div>`

    if (message) {
      emailContent += `
        <div style="background: #f8f9fa; padding: 24px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #0019ff;">
          <h3 style="margin-top: 0; color: #333; font-size: 18px; font-weight: 600;">Message</h3>
          <p style="margin: 8px 0; color: #555; line-height: 1.6; white-space: pre-wrap;">${message}</p>
        </div>`
    }

    emailContent += `
          <div style="text-align: center; margin: 30px 0;">
            <a href="mailto:${email}" style="background: #0019ff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 500; display: inline-block;">Reply to ${name}</a>
          </div>
        </div>
        
        <div style="background: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #eee;">
          <p style="color: #999; font-size: 14px; margin: 0;">
            This inquiry was submitted through the Caldera Agency website ${isContactPageForm ? 'contact page' : 'homepage'} form.
          </p>
        </div>
      </div>`

    // Send only notification email to you (no confirmation email)
    console.log('Attempting to send email via Resend...')
    
    try {
      const notificationEmail = await resend.emails.send({
        from: 'Caldera Agency <onboarding@resend.dev>', // Using Resend sandbox domain for testing
        to: process.env.CONTACT_EMAIL || 'hello@caldera.agency',
        subject: `New Website Inquiry from ${name}${isContactPageForm ? ' (Contact Form)' : ' (Homepage Form)'}`,
        html: emailContent
      })

      console.log('Resend response:', notificationEmail)
      console.log('Email sent successfully:', notificationEmail.data?.id)
      
      if (notificationEmail.error) {
        console.error('Resend error:', notificationEmail.error)
        return NextResponse.json(
          { error: 'Failed to send email: ' + notificationEmail.error.message },
          { status: 500 }
        )
      }
      
    } catch (emailError) {
      console.error('Email sending error:', emailError)
      return NextResponse.json(
        { error: 'Failed to send email. Please check your email configuration.' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Thank you for your inquiry. We will contact you soon.' 
    })
    
  } catch (error) {
    console.error('Contact form error:', error)
    
    // Return different error messages based on the error type
    if (error instanceof Error && error.message.includes('API key')) {
      return NextResponse.json(
        { error: 'Email service configuration error' },
        { status: 500 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to send message. Please try again or contact us directly.' },
      { status: 500 }
    )
  }
}