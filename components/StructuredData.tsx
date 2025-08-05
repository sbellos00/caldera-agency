export default function StructuredData() {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Caldera Agency",
    "url": "https://caldera.agency",
    "logo": "https://caldera.agency/og-image.jpg",
    "description": "Custom website development for solo consultants. We combine deep research, strategic positioning, and hands-off delivery to create websites that demonstrate expertise and convert higher-value clients.",
    "foundingDate": "2024",
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "contact@caldera.agency",
      "contactType": "customer service"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    },
    "sameAs": [
      "https://caldera.agency"
    ]
  }

  const serviceData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Bespoke Authority-Building Websites for Solo Consultants",
    "description": "Custom website development for solo consultants. We combine deep research, strategic positioning, and hands-off delivery to create websites that demonstrate expertise and convert higher-value clients.",
    "provider": {
      "@type": "Organization",
      "name": "Caldera Agency",
      "url": "https://caldera.agency"
    },
    "serviceType": "Website Development",
    "areaServed": "Worldwide",
    "audience": {
      "@type": "Audience",
      "audienceType": "Solo Consultants"
    },
    "offers": {
      "@type": "Offer",
      "description": "All-In-One Website Package including custom website, copywriting, analytics integration, domain integration, mobile optimization, and hosting",
      "seller": {
        "@type": "Organization",
        "name": "Caldera Agency"
      }
    }
  }

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://caldera.agency"
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
    </>
  )
}