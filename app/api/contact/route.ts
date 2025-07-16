import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { name, email, linkedin } = await request.json()
    
    // Validate required fields
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
    
    // In a real application, you would:
    // 1. Send email using a service like SendGrid, Mailgun, or Amazon SES
    // 2. Store in database
    // 3. Add to CRM
    
    // For now, we'll simulate email sending
    // You can integrate with your preferred email service here
    
    const emailData = {
      to: process.env.CONTACT_EMAIL || 'hello@calderaagency.com',
      from: 'noreply@calderaagency.com',
      subject: `New Website Inquiry from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0019ff;">New Website Inquiry</h2>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Contact Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${linkedin ? `<p><strong>LinkedIn:</strong> <a href="${linkedin}" target="_blank">${linkedin}</a></p>` : ''}
          </div>
          
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #666; font-size: 14px;">
              This inquiry was submitted through the Caldera Agency website contact form.
            </p>
          </div>
        </div>
      `
    }
    
    // TODO: Implement actual email sending
    // Example with SendGrid:
    // await sgMail.send(emailData)
    
    // Example with Mailgun:
    // await mailgun.messages.create(domain, emailData)
    
    // For now, we'll just log the email data
    console.log('New contact form submission:', emailData)
    
    // Also send confirmation email to the user
    const confirmationEmail = {
      to: email,
      from: 'hello@calderaagency.com',
      subject: 'Thank you for your interest - Caldera Agency',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #0019ff; padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0;">Caldera Agency</h1>
          </div>
          
          <div style="padding: 30px;">
            <h2 style="color: #333;">Thank you for your interest, ${name}!</h2>
            
            <p style="color: #666; line-height: 1.6;">
              We've received your inquiry and are excited to learn more about your project. 
              Our team will review your information and get back to you within 24 hours with:
            </p>
            
            <ul style="color: #666; line-height: 1.6;">
              <li>Project details tailored to your needs</li>
              <li>Transparent pricing information</li>
              <li>Next steps to get started</li>
              <li>Answers to any questions you might have</li>
            </ul>
            
            <p style="color: #666; line-height: 1.6;">
              In the meantime, feel free to reach out directly if you have any urgent questions:
            </p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; color: #666;">
                <strong>Email:</strong> hello@calderaagency.com<br>
                <strong>Phone:</strong> +1 (234) 567-8890
              </p>
            </div>
            
            <p style="color: #666; line-height: 1.6;">
              We look forward to helping you create an authority-building website that positions you as the obvious choice for your clients.
            </p>
            
            <p style="color: #666; line-height: 1.6;">
              Best regards,<br>
              <strong>The Caldera Agency Team</strong>
            </p>
          </div>
          
          <div style="background: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #eee;">
            <p style="color: #999; font-size: 14px; margin: 0;">
              This is an automated response. Please don't reply to this email.
            </p>
          </div>
        </div>
      `
    }
    
    console.log('Confirmation email:', confirmationEmail)
    
    return NextResponse.json({ 
      success: true, 
      message: 'Thank you for your inquiry. We will contact you soon.' 
    })
    
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}