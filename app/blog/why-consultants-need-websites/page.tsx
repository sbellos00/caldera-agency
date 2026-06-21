import type { Metadata } from 'next'
import Link from 'next/link'
import ArticleShell from '@/components/ArticleShell'
import { Band, Accent, ALead, AP, AH2, PullQuote, CalloutCard, NumberedCard, DefinitionCard } from '@/components/blocks'
import { getPost } from '@/lib/posts'

const post = getPost('why-consultants-need-websites')!
const link = 'text-[var(--primary-blue)] underline underline-offset-4 hover:text-[var(--blue-dark)] font-medium'

export const metadata: Metadata = {
  title: 'Why Every Consultant Needs a Website (Even When LinkedIn Is Working)',
  description:
    "Discover why LinkedIn alone isn't enough for consultants who want to command premium rates and win high-value clients.",
  keywords: [
    'consultant website',
    'LinkedIn consulting',
    'consultant positioning',
    'consulting credibility',
    'authority building',
    'consultant marketing',
    'premium consulting clients',
    'consulting business development',
  ],
  alternates: { canonical: `/blog/${post.slug}` },
  openGraph: {
    type: 'article',
    url: `/blog/${post.slug}`,
    title: 'Why Every Consultant Needs a Website (Even When LinkedIn Is Working)',
    description:
      "Discover why LinkedIn alone isn't enough for consultants who want to command premium rates and win high-value clients.",
    siteName: 'Caldera Agency',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: post.title }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why Every Consultant Needs a Website (Even When LinkedIn Is Working)',
    description:
      "Discover why LinkedIn alone isn't enough for consultants who want to command premium rates and win high-value clients.",
    images: ['/og-image.jpg'],
  },
}

export default function Page() {
  return (
    <ArticleShell
      slug={post.slug}
      titleNode={<>Why every consultant needs a <Accent>website</Accent></>}
      standfirst="LinkedIn alone isn't enough for consultants who want to command premium rates and win high-value clients. Here is why, and what a website is actually for."
    >
      {/* Opening, white */}
      <Band tone="white" innerClassName="max-w-screen-md mx-auto">
        <ALead>You are getting steady referrals through LinkedIn. Your DMs are active. So why would you need a website?</ALead>
        <AP>
          Here is what you might not realize. For every client who reaches out, there is another who researched you,
          compared you to competitors, and quietly chose someone else. You will never hear about these lost
          opportunities.
        </AP>
        <AP>
          As a consultant, your business lives and dies by your perceived credibility. When a potential client
          researches you, and they always do, they are asking themselves one thing.
        </AP>
      </Band>

      {/* Key question, blue */}
      <Band tone="blue" className="py-16 md:py-20" innerClassName="max-w-screen-md mx-auto text-center">
        <p className="text-[clamp(22px,3vw,34px)] font-light leading-snug tracking-tight text-white">
          Can I trust this person to solve my <span className="font-serif italic">problem</span>?
        </p>
      </Band>

      {/* Positioning + research, cream */}
      <Band tone="cream" innerClassName="max-w-screen-md mx-auto">
        <AP>
          The more effectively you communicate that you meet the project&rsquo;s requirements and deliver the value your
          client seeks, the better the opportunities you secure and the higher the fees you can command. This is where
          positioning becomes everything.
        </AP>
        <AP>
          Research confirms it. The 2023 Consulting Fees Study by Consulting Success, surveying nearly 1,000 consultants
          globally, found that:
        </AP>
        <CalloutCard
          items={[
            <><strong>Specialists consistently charge more.</strong> 52% of specialists reported charging at least $10,000 per project, versus just 18% for non-specialists.</>,
            <><strong>81% of consultants charging $20,000 to $50,000 per project were specialists.</strong></>,
            <><strong>Consultants with value-driven branding and clear positioning command 40% to 60% higher fees</strong> than those who rely on generalist profiles or a weak digital presence.</>,
          ]}
        />
        <AP>
          The key insight is not about websites. It is about positioning. Specialists who clearly communicate their
          expertise command premium rates. So the real question becomes: are you doing your best to prove to clients
          that you are the person they are looking for?
        </AP>
      </Band>

      {/* Table stakes + why LinkedIn isn't enough, white */}
      <Band tone="white" innerClassName="max-w-screen-md mx-auto">
        <AH2>Digital is now <Accent>table stakes</Accent> in consulting</AH2>
        <AP>
          The majority of selection and trust-building now happens online. More than 80% of client-consultant
          relationships start with digital research, not offline referrals.
        </AP>
        <AP>
          LinkedIn is phenomenal at what it does. It is the strongest lead generation tool for consultants. The question
          is no longer whether you need LinkedIn. You absolutely do. The real question is whether LinkedIn is enough.
        </AP>
        <AP>
          When clients find you, what do they see? You might be the perfect fit, but is that immediately clear to the
          person doing the research? For the vast majority of consultants who rely solely on LinkedIn, the answer is no.
          Here is why.
        </AP>

        <AH2>1. Positioning demands <Accent>differentiation</Accent></AH2>
        <PullQuote>LinkedIn forces you into a standardized template. Your unique approach becomes a generic headline.</PullQuote>
        <AP>
          On LinkedIn you have to fit your expertise into fixed fields. A headline, a bio, job titles. Even if your work
          is truly different, the platform compresses you into the same template as everyone else. The result: a
          prospect cannot tell the difference between a specialist with a unique approach and a consultant doing the
          bare minimum. Everyone looks like a &ldquo;Consultant helping X achieve Y.&rdquo;
        </AP>

        <AH2>2. Positioning relies on clear <Accent>proof</Accent></AH2>
        <PullQuote>LinkedIn scatters your best evidence. Case studies and methods get lost or buried in the feed.</PullQuote>
        <AP>
          Clients want to see how you solve problems and deliver value, but LinkedIn is built for short updates, not
          deep insight. Your case studies are buried in your activity or hidden in a Featured section. Posts disappear
          within days. You end up under-selling your value, and prospects never see the depth, structure, or proof that
          justifies a premium. That transformative case study you posted last month is already buried. Your proprietary
          framework sits in a PDF nobody opens.
        </AP>
      </Band>

      {/* Control the narrative, cream */}
      <Band tone="cream" innerClassName="max-w-screen-md mx-auto">
        <AH2>A website is your only shot at <Accent>controlling the narrative</Accent></AH2>
        <AP>A website is the only place you control the story. You can:</AP>
        <CalloutCard
          items={[
            'Publish deep case studies and frameworks, not just buzzwords and claims.',
            'Highlight your process, methodologies, and intellectual property.',
            'Show real client results, with space for detail and nuance.',
            'Sequence the narrative. The right proof, in the right order, for the right clients.',
          ]}
        />
        <AP>
          By making your expertise and authority clear, you win bigger deals, get included in more RFPs, and secure
          partnerships you might otherwise have lost. This is the shift from being found to being chosen.
        </AP>
      </Band>

      {/* LinkedIn brings leads, white */}
      <Band tone="white" innerClassName="max-w-screen-md mx-auto">
        <AH2>LinkedIn brings leads. Your website <Accent>closes</Accent> the deal</AH2>
        <AP>
          You are probably right that most of your visible leads come through LinkedIn. But that is only half the story.
          Just because leads find you there does not mean LinkedIn is doing the heavy lifting, or that you are not
          quietly losing out.
        </AP>
        <NumberedCard
          items={[
            <><strong>You never hear about the deals you lose.</strong> Prospects research you, just as they research your competition. If another candidate appears more credible, they quietly move on. There is no lost deal notification on LinkedIn.</>,
            <><strong>LinkedIn is a filter, not a foundation.</strong> It is where people find your name, but it undersells your expertise and makes it hard to stand out to high-value clients making decisions about trust and value.</>,
            <><strong>Your current success might be despite, not because of, a LinkedIn-only presence.</strong> How many more premium opportunities would you capture with both visibility and demonstrated credibility?</>,
          ]}
        />
        <AP>
          Here is what most consultants, and even agencies pitching websites, miss. A website&rsquo;s job is not lead
          generation. For a consultant, a professional website is a credibility tool. Its purpose is to prove your
          expertise, showcase your track record, and signal that you are a serious professional ready for serious
          clients. Its job is not to generate new leads. It is to stop you losing them.
        </AP>
      </Band>

      {/* Key message, blue */}
      <Band tone="blue" className="py-16 md:py-20" innerClassName="max-w-screen-md mx-auto text-center">
        <p className="text-[clamp(22px,3vw,34px)] font-light leading-snug tracking-tight text-white">
          LinkedIn makes you <span className="font-serif italic">visible</span>. Your website makes you{' '}
          <span className="font-serif italic">credible</span>.
        </p>
      </Band>

      {/* Additional benefits, cream */}
      <Band tone="cream" innerClassName="max-w-screen-md mx-auto">
        <AH2>The additional benefits a website <Accent>delivers</Accent></AH2>
        <AP>
          Everything above is about credibility and positioning, and that is the core reason your website exists. But
          here is what else happens when you build your own platform.
        </AP>
        <DefinitionCard
          items={[
            { h: 'A central reference point', b: 'Your website becomes the single, definitive link you send to clients, partners, event organizers, and referrers. No confusion, no profile-hunting, no algorithm deciding what they see. Your professional home base.' },
            { h: 'Professional depth and seriousness', b: 'A professional website sends a clear message that you take your work seriously. It shows depth beyond a resume and that you understand how to communicate value, which matters especially for independent consultants.' },
            { h: 'Personal brand building', b: 'Your site gives you complete creative freedom. Design, messaging, content, and proof all reflect your unique approach. You shape the narrative, the visual style, and the tone. LinkedIn cannot offer this.' },
            { h: 'Full control of your presence', b: 'LinkedIn owns your profile, your posts, and your data, and can change the rules anytime. Your own website puts you in control, immune to algorithm changes, paywalls, or sudden platform shifts.' },
            { h: 'A linkable asset for media and referrers', b: 'When podcasters, journalists, or referral partners want to feature you, they need somewhere to send their audience. A website gives them a professional destination. LinkedIn profiles do not carry the same weight in show notes or bylines.' },
            { h: 'Ready for scale when you need it', b: 'While the primary job is credibility, a website keeps you ready for growth. It opens your entire digital marketing toolkit when you want it: SEO for the problems you solve, targeted campaigns, and inbound funnels for scaling beyond referrals.' },
          ]}
        />
      </Band>

      {/* Path forward + Caldera, white */}
      <Band tone="white" innerClassName="max-w-screen-md mx-auto">
        <AH2>The <Accent>path</Accent> forward</AH2>
        <AP>
          In a market where every consultant has a LinkedIn profile, standing out is not about abandoning what works. It
          is about amplifying it. A professional website that clearly communicates your expertise is not a nice-to-have.
          It is the difference between being considered and being chosen.
        </AP>
        <AH2>How <Accent>Caldera</Accent> can help</AH2>
        <AP>
          If you are ready to move beyond LinkedIn and want a website that actually proves your expertise, Caldera builds
          professional, research-driven consultant websites.
        </AP>
        <CalloutCard
          items={[
            <><strong>End-to-end execution.</strong> We handle research, copywriting, design, and setup.</>,
            <><strong>Minimal time from you.</strong> We do the research, writing, design, and build. You share your vision and review what we create.</>,
            <><strong>Proof and positioning.</strong> We focus on clear case studies, methodologies, and structured proof, not marketing fluff.</>,
          ]}
        />
        <AP>
          You do not need to start from scratch, and you do not need another marketing pitch. If your priority is clear
          positioning and professional credibility, this is what we do. See{' '}
          <Link href="/best-website-agency-for-consultants" className={link}>why we are the best website agency for consultants</Link>,
          browse the <Link href="/work" className={link}>case studies</Link>, or read{' '}
          <Link href="/consultant-websites" className={link}>the complete guide to consultant websites</Link>.
        </AP>
      </Band>
    </ArticleShell>
  )
}
