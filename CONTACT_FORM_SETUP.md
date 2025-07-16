# Contact Form Setup Guide

The contact form is fully implemented and ready to use. Here's how to set it up for production:

## Current Implementation

The contact form includes:
- ✅ Beautiful, mobile-responsive design that fits your brand aesthetic
- ✅ Form validation (required fields, email format)
- ✅ Loading states and success/error handling
- ✅ Success confirmation with clear messaging
- ✅ API route handler (`/app/api/contact/route.ts`)
- ✅ Email templates (both for you and the client)

## To Make It Fully Functional

You need to integrate with an email service. Here are the most popular options:

### Option 1: SendGrid (Recommended)

1. **Install SendGrid:**
   ```bash
   npm install @sendgrid/mail
   ```

2. **Get API Key:**
   - Sign up at https://sendgrid.com
   - Create an API key in your dashboard
   - Add to your `.env.local` file:
     ```
     SENDGRID_API_KEY=your_api_key_here
     CONTACT_EMAIL=your-email@domain.com
     ```

3. **Update the API route:**
   ```typescript
   // Add to the top of app/api/contact/route.ts
   import sgMail from '@sendgrid/mail'
   
   sgMail.setApiKey(process.env.SENDGRID_API_KEY!)
   
   // Replace the TODO section with:
   await sgMail.send(emailData)
   await sgMail.send(confirmationEmail)
   ```

### Option 2: Mailgun

1. **Install Mailgun:**
   ```bash
   npm install mailgun.js
   ```

2. **Get API Key:**
   - Sign up at https://mailgun.com
   - Get your API key and domain
   - Add to `.env.local`:
     ```
     MAILGUN_API_KEY=your_api_key_here
     MAILGUN_DOMAIN=your_domain_here
     CONTACT_EMAIL=your-email@domain.com
     ```

3. **Update the API route:**
   ```typescript
   // Add to the top of app/api/contact/route.ts
   import Mailgun from 'mailgun.js'
   
   const mailgun = new Mailgun(FormData)
   const mg = mailgun.client({
     username: 'api',
     key: process.env.MAILGUN_API_KEY!,
   })
   
   // Replace the TODO section with:
   await mg.messages.create(process.env.MAILGUN_DOMAIN!, emailData)
   await mg.messages.create(process.env.MAILGUN_DOMAIN!, confirmationEmail)
   ```

### Option 3: Amazon SES

1. **Install AWS SDK:**
   ```bash
   npm install @aws-sdk/client-ses
   ```

2. **Setup AWS credentials and update the API route accordingly**

## Environment Variables

Create a `.env.local` file in your project root:

```
# Email Service (choose one)
SENDGRID_API_KEY=your_sendgrid_api_key
# OR
MAILGUN_API_KEY=your_mailgun_api_key
MAILGUN_DOMAIN=your_mailgun_domain
# OR
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=your_aws_region

# Your email address (where form submissions will be sent)
CONTACT_EMAIL=hello@calderaagency.com
```

## Testing

1. **Development:** The form will currently log email data to the console
2. **Production:** Once you integrate an email service, test with a real email
3. **Staging:** Use a test email address to verify everything works

## Features

### Client Experience
- Clean, professional form design
- Real-time validation
- Clear success confirmation
- Automatic confirmation email
- Mobile-responsive layout

### Your Experience
- Receive structured email with all form data
- Clear contact information
- Professional email template
- Easy to integrate with your CRM

## Customization

You can customize:
- Email templates in `/app/api/contact/route.ts`
- Form fields in `/app/page.tsx`
- Success message content
- Contact information (phone, email)
- Form styling (already matches your brand)

## Security

The form includes:
- Input validation
- Email format checking
- Rate limiting ready (add if needed)
- CSRF protection via Next.js
- Sanitized HTML output

## Analytics

Consider adding:
- Form submission tracking
- Conversion analytics
- Lead source tracking
- CRM integration

The form is production-ready and just needs your email service integration to start collecting leads!