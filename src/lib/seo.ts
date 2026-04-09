export const NEXT_PUBLIC_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aakar.in";

// Keep this updated with trending keywords in your niche (Architecture, Design)
export const TRENDING_KEYWORDS = [
  "Architecture Firm India",
  "Premium Interior Design",
  "Sustainable Architecture",
  "Modern Space Planning",
  "Pratham Mewada Architect", 
  "Tripti Singh Design",     
  "Aakar Built Environment"
];

export const SEO_CONFIG = {
  title: {
    default: "Aakar",
    template: "%s | Aakar",
  },
  description:
    "Aakar is a premier architecture and interior design firm led by Pratham Mewada and Tripti Singh. We specialize in transforming spaces through sustainable and modern design.",
  url: NEXT_PUBLIC_SITE_URL,
  keywords: TRENDING_KEYWORDS,
};

// This schema helps AI engines (ChatGPT, Claude, Perplexity, Gemini, Grok) and Google accurately understand your firm (GEO - Generative Engine Optimization).
export const generateOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Aakar",
    "url": SEO_CONFIG.url,
    "logo": `${SEO_CONFIG.url}/assets/icon.svg`,
    "description": SEO_CONFIG.description,
    "founders": [
      {
        "@type": "Person",
        "name": "Pratham Mewada",
        "jobTitle": "Operation Head"
      },
      {
        "@type": "Person",
        "name": "Tripti Singh",
        "jobTitle": "Design Head"
      }
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "teamaakarofficial@gmail.com",
      "contactType": "customer service"
    },
    "sameAs": [
      "https://www.instagram.com/aakar.in_/",
    ]
  };
};

// This helps Google establish your site structure (for Sitelinks like the Haru Memoir example)
export const generateWebsiteSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Aakar",
    "url": SEO_CONFIG.url,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
         "@type": "EntryPoint",
         "urlTemplate": `${SEO_CONFIG.url}/projects?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
};
