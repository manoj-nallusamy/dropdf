export function WebApplicationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "DropDF",
    "description": "Free PDF sharing service. Upload PDFs and get instant shareable links. No signup required.",
    "url": "https://dropdf.com",
    "applicationCategory": "BusinessApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "softwareVersion": "1.0",
    "operatingSystem": "Any",
    "permissions": "browser storage"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "DropDF",
    "url": "https://dropdf.com",
    "logo": "https://dropdf.com/icon-512.png",
    "sameAs": []
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How long do PDF links stay active?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Free tier links remain active for 7 days. After that, files are automatically deleted for your privacy. Pro and Business plans offer links that never expire."
        }
      },
      {
        "@type": "Question",
        "name": "Can I password protect my PDF?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Password protection is available on Pro and Business plans. You can secure your PDFs with password access control to ensure only authorized recipients can view them."
        }
      },
      {
        "@type": "Question",
        "name": "What happens to my PDF after I upload it?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Your PDF is stored securely in cloud storage. Only people with the exact link can access it. Free tier files are automatically deleted after 7 days for your privacy."
        }
      },
      {
        "@type": "Question",
        "name": "Can I track who views my PDF?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! View tracking and analytics are available on Pro and Business plans. You'll be able to see when and how many times your PDF was opened, along with detailed engagement metrics on Business plans."
        }
      },
      {
        "@type": "Question",
        "name": "Is there a file size limit?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Free tier supports files up to 5MB. Pro plan allows up to 50MB per file, and Business plan supports up to 100MB per file."
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
