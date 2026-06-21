import type { Metadata } from 'next'
import Link from 'next/link'
import ArticleShell from '@/components/ArticleShell'
import { Band, Accent, ALead, AP, AH2, FeatureCard } from '@/components/blocks'
import { getPost } from '@/lib/posts'

const post = getPost('the-authority-paradox')!
const link = 'text-[var(--primary-blue)] underline underline-offset-4 hover:text-[var(--blue-dark)] font-medium'

export const metadata: Metadata = {
  title: "The Authority Paradox: Why Technical Expertise Alone Won't Win Premium Clients",
  description:
    "Discover why being the smartest person in the room isn't enough to attract high-value consulting clients, and learn the counterintuitive approach that actually works.",
  keywords: [
    'consultant authority',
    'premium consulting clients',
    'consultant positioning',
    'consulting expertise',
    'authority building',
    'consultant credibility',
    'high-value clients',
    'consulting business development',
  ],
  alternates: { canonical: `/blog/${post.slug}` },
  openGraph: {
    type: 'article',
    url: `/blog/${post.slug}`,
    title: "The Authority Paradox: Why Technical Expertise Alone Won't Win Premium Clients",
    description:
      "Discover why being the smartest person in the room isn't enough to attract high-value consulting clients, and learn the counterintuitive approach that actually works.",
    siteName: 'Caldera Agency',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: post.title }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "The Authority Paradox: Why Technical Expertise Alone Won't Win Premium Clients",
    description:
      "Discover why being the smartest person in the room isn't enough to attract high-value consulting clients, and learn the counterintuitive approach that actually works.",
    images: ['/og-image.jpg'],
  },
}

const truths = [
  {
    h: 'Perception precedes capability',
    b: 'Clients decide whether you are qualified before they understand what you actually do.',
  },
  {
    h: 'Authority is borrowed, not earned',
    b: 'You build credibility by association, positioning, and social proof, not just by results.',
  },
  {
    h: 'Premium clients buy confidence, not competence',
    b: 'They want to know you have solved their exact problem before, for companies like theirs.',
  },
]

export default function Page() {
  return (
    <ArticleShell
      slug={post.slug}
      titleNode={<>The authority <Accent>paradox</Accent>: why technical expertise alone won&rsquo;t win premium clients</>}
      standfirst="Why being the smartest person in the room isn't enough to attract high-value consulting clients, and the counterintuitive approach that actually works."
    >
      {/* Opening, white */}
      <Band tone="white" innerClassName="max-w-screen-md mx-auto">
        <ALead>
          Last week, I had coffee with a brilliant consultant who had been struggling to land the premium clients he
          deserved. He had two decades of experience, multiple certifications, and could solve problems that stumped
          entire teams.
        </ALead>
        <AP>Yet he was competing on price with consultants half his age, and charging a fraction of what his expertise was worth.</AP>
        <AP>His story is not unique. It is the authority paradox that plagues thousands of exceptional consultants.</AP>
      </Band>

      {/* Key message, blue */}
      <Band tone="blue" className="py-16 md:py-20" innerClassName="max-w-screen-md mx-auto text-center">
        <p className="text-[clamp(22px,3vw,34px)] font-light leading-snug tracking-tight text-white">
          Being the smartest person in the room means nothing if the room does not know you are{' '}
          <span className="font-serif italic">there</span>.
        </p>
      </Band>

      {/* The Expertise Trap, white */}
      <Band tone="white" innerClassName="max-w-screen-md mx-auto">
        <AH2>The expertise <Accent>trap</Accent></AH2>
        <AP>
          Here is what most consultants believe. If you are really good at what you do, clients will naturally find you
          and pay premium rates for your expertise.
        </AP>
        <AP>This belief is not just wrong. It is backwards.</AP>
        <AP>
          The marketplace does not reward the most knowledgeable consultant. It rewards the consultant who best
          communicates their knowledge, builds trust before the first meeting, and positions themselves as the obvious
          choice for high-stakes projects.
        </AP>
      </Band>

      {/* Three truths, cream feature cards */}
      <Band tone="cream" innerClassName="max-w-screen-xl mx-auto">
        <AH2>Three truths about <Accent>premium consulting</Accent></AH2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
          {truths.map((t) => (
            <FeatureCard key={t.h} title={t.h} body={t.b} />
          ))}
        </div>
      </Band>

      {/* Formula + website, white */}
      <Band tone="white" innerClassName="max-w-screen-md mx-auto">
        <AH2>The <Accent>real</Accent> authority formula</AH2>
        <AP>
          Authority is not about being the smartest person in the room. It is about being the most obvious choice when
          that room needs to solve a specific problem.
        </AP>
        <AP>
          The consultants who command premium rates understand this distinction. They do not just have expertise. They
          have positioned expertise.
        </AP>
        <AP>
          This means three things. Clarity about who they serve, proof that they have solved similar problems before,
          and a professional presence that signals premium quality before a word is spoken.
        </AP>

        <AH2>Why your website <Accent>matters</Accent> more than you think</AH2>
        <AP>Your website is not a digital business card. It is your credibility filter.</AP>
        <AP>
          Every potential client will visit your website before they decide to take your call. They are not just looking
          for information. They are making a snap judgment about whether you operate at their level.
        </AP>
        <AP>
          A poorly designed website signals that you do not understand the importance of first impressions. A generic
          website suggests you serve everyone, which means you specialize in nothing. A professional, tailored website
          communicates that you operate at the same level as your premium clients.
        </AP>
        <AP>
          That is the whole game: positioned expertise, made obvious. For the full playbook, read{' '}
          <Link href="/consultant-websites" className={link}>the complete guide to consultant websites</Link>, or see
          why consultants choose the{' '}
          <Link href="/best-website-agency-for-consultants" className={link}>best website agency for consultants</Link>.
        </AP>
      </Band>
    </ArticleShell>
  )
}
