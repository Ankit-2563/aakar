// ─────────────────────────────────────────────────────────────
// SEO & GEO — Production Configuration
// Covers: Classic SEO, Open Graph, Twitter Cards, JSON-LD,
//         GEO (Generative Engine Optimization for LLMs),
//         Local SEO, Breadcrumbs, and Rich Results.
// ─────────────────────────────────────────────────────────────

export const NEXT_PUBLIC_SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://aakar.in";

// ─── Firm Details (single source of truth) ───────────────────
export const FIRM = {
  name: "Aakar",
  legalName: "Aakar Architecture & Interior Design",
  tagline: "Premium Architecture & Sustainable Interior Design, India",
  description:
    "Aakar is a premier architecture and interior design firm based in India, co-founded by Pratham Mewada and Tripti Singh. We specialise in sustainable architecture, modern interior décor, space planning, and premium commercial and residential development.",
  url: NEXT_PUBLIC_SITE_URL,
  email: "teamaakarofficial@gmail.com",
  telephone: {
    pratham: "+91-77382-83814",
    tripti: "+91-99200-36244",
  },
  address: {
    country: "IN",
    addressLocality: "India",
    addressRegion: "India",
  },
  socials: {
    instagram: "https://www.instagram.com/aakar.in_/",
    linkedin: "https://linkedin.com/company/aakar",
  },
  founders: [
    {
      name: "Pratham Mewada",
      role: "Co-Founder, Operation Head",
      jobTitle: "Co-Founder & Operations Director",
      phone: "+91-77382-83814",
      linkedin: "https://www.linkedin.com/in/pratham-mewada",
    },
    {
      name: "Tripti Singh",
      role: "Co-Founder, Design Head",
      jobTitle: "Co-Founder & Principal Designer",
      phone: "+91-99200-36244",
      linkedin: "https://www.linkedin.com/in/tripti-singh",
    },
  ],
  services: [
    "Premium Architecture",
    "Sustainable Design",
    "Modern Interior Décor",
    "Space Planning",
    "Commercial Development",
    "Residential Development",
  ],
  foundingYear: "2022",
} as const;

// ─── Keyword Strategy ────────────────────────────────────────
// Tier 1 → high-intent, transactional
// Tier 2 → informational, discoverable
// Tier 3 → branded / people-entity (GEO signals)
export const SEO_KEYWORDS = [
  // Tier 1
  "architecture firm India",
  "interior design firm India",
  "premium interior design",
  "sustainable architecture India",
  "modern interior décor",
  "residential architect India",
  "commercial interior design India",
  "space planning India",
  // Tier 2
  "contemporary architecture",
  "eco-friendly architecture",
  "luxury home design",
  "office interior design",
  "biophilic design",
  // Tier 3 — People / Brand entities (critical for GEO)
  "Pratham Mewada architect",
  "Tripti Singh interior designer",
  "Aakar design firm",
  "Aakar architecture India",
];

// ─── Site-level Metadata Config ──────────────────────────────
export const SEO_CONFIG = {
  title: {
    default: "Aakar | Premium Architecture & Interior Design, India",
    template: "%s | Aakar",
  },
  description: FIRM.description,
  url: FIRM.url,
  keywords: SEO_KEYWORDS,
  locale: "en_IN",
  type: "website" as const,
  ogImage: {
    url: `${FIRM.url}/assets/og-image.png`,
    width: 1200,
    height: 630,
    alt: "Aakar — Premium Architecture & Interior Design",
  },
} as const;

// ─────────────────────────────────────────────────────────────
// JSON-LD STRUCTURED DATA GENERATORS
// Each schema targets a specific Google Rich Result type and
// also provides explicit entity signals for LLM/GEO indexing.
// ─────────────────────────────────────────────────────────────

/** Organization schema — core entity definition for GEO & SEO */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ArchitectFirm", "LocalBusiness"],
    "@id": `${FIRM.url}/#organization`,
    name: FIRM.name,
    legalName: FIRM.legalName,
    alternateName: ["Aakar Design", "Aakar Architecture"],
    description: FIRM.description,
    url: FIRM.url,
    logo: {
      "@type": "ImageObject",
      url: `${FIRM.url}/assets/icon.svg`,
      width: 512,
      height: 512,
    },
    image: `${FIRM.url}/assets/og-image.png`,
    email: FIRM.email,
    telephone: FIRM.telephone.pratham,
    address: {
      "@type": "PostalAddress",
      addressCountry: FIRM.address.country,
      addressLocality: FIRM.address.addressLocality,
      addressRegion: FIRM.address.addressRegion,
    },
    foundingDate: FIRM.foundingYear,
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      minValue: 2,
      maxValue: 20,
    },
    founders: FIRM.founders.map((f) => ({
      "@type": "Person",
      "@id": `${FIRM.url}/#${f.name.toLowerCase().replace(/\s+/g, "-")}`,
      name: f.name,
      jobTitle: f.jobTitle,
      telephone: f.phone,
      email: FIRM.email,
      worksFor: { "@id": `${FIRM.url}/#organization` },
      sameAs: [f.linkedin],
    })),
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: FIRM.telephone.pratham,
        contactType: "customer support",
        email: FIRM.email,
        availableLanguage: ["English", "Hindi"],
      },
      {
        "@type": "ContactPoint",
        telephone: FIRM.telephone.tripti,
        contactType: "design enquiries",
        email: FIRM.email,
        availableLanguage: ["English", "Hindi"],
      },
    ],
    sameAs: [FIRM.socials.instagram, FIRM.socials.linkedin],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Architecture & Design Services",
      itemListElement: FIRM.services.map((service, i) => ({
        "@type": "Offer",
        position: i + 1,
        itemOffered: {
          "@type": "Service",
          name: service,
          provider: { "@id": `${FIRM.url}/#organization` },
        },
      })),
    },
    knowsAbout: [
      "Architecture",
      "Interior Design",
      "Sustainable Design",
      "Space Planning",
      "Commercial Architecture",
      "Residential Architecture",
      "Biophilic Design",
    ],
    areaServed: {
      "@type": "Country",
      name: "India",
    },
  };
}

/** WebSite schema — enables Sitelinks SearchBox in Google */
export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${FIRM.url}/#website`,
    name: FIRM.name,
    url: FIRM.url,
    description: FIRM.description,
    publisher: { "@id": `${FIRM.url}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${FIRM.url}/projects?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    inLanguage: "en-IN",
  };
}

/** WebPage schema — used per-page for precise metadata */
export function generateWebPageSchema({
  name,
  description,
  url,
  breadcrumb,
}: {
  name: string;
  description: string;
  url: string;
  breadcrumb?: Array<{ name: string; url: string }>;
}) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    name,
    description,
    url,
    isPartOf: { "@id": `${FIRM.url}/#website` },
    about: { "@id": `${FIRM.url}/#organization` },
    publisher: { "@id": `${FIRM.url}/#organization` },
    inLanguage: "en-IN",
    dateModified: new Date().toISOString(),
  };

  if (breadcrumb && breadcrumb.length > 0) {
    schema.breadcrumb = {
      "@type": "BreadcrumbList",
      itemListElement: breadcrumb.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        item: item.url,
      })),
    };
  }

  return schema;
}

/** FAQ schema — drives "People Also Ask" rich results */
export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/** Project / CreativeWork schema — used on individual project pages */
export function generateProjectSchema({
  name,
  description,
  url,
  image,
  dateCreated,
  locationName,
}: {
  name: string;
  description: string;
  url: string;
  image: string;
  dateCreated?: string;
  locationName?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${url}#project`,
    name,
    description,
    url,
    image,
    creator: { "@id": `${FIRM.url}/#organization` },
    ...(dateCreated && { dateCreated }),
    ...(locationName && {
      locationCreated: {
        "@type": "Place",
        name: locationName,
        address: { "@type": "PostalAddress", addressCountry: "IN" },
      },
    }),
  };
}

/** Home page FAQs — tune these to real user questions */
export const HOME_PAGE_FAQS = [
  {
    question: "What services does Aakar offer?",
    answer:
      "Aakar offers premium architecture, sustainable design, modern interior décor, space planning, and commercial and residential development across India.",
  },
  {
    question: "Who are the founders of Aakar?",
    answer:
      "Aakar was co-founded by Pratham Mewada (Operations Head) and Tripti Singh (Design Head), both passionate about transforming spaces through sustainable and modern design.",
  },
  {
    question: "Does Aakar work on residential projects?",
    answer:
      "Yes. Aakar handles both residential and commercial projects, from individual homes to large-scale office and retail developments.",
  },
  {
    question: "How can I contact Aakar for a design consultation?",
    answer: `You can reach Aakar by email at ${FIRM.email} or by phone at ${FIRM.telephone.pratham}. You can also reach out via Instagram at @aakar.in_.`,
  },
  {
    question: "Where is Aakar based?",
    answer:
      "Aakar is based in India and serves clients across the country, offering architecture and interior design solutions for diverse project types.",
  },
];
