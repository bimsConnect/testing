import { siteConfig } from "@/config/site"

export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        logo: {
          "@type": "ImageObject",
          "@id": `${siteConfig.url}/#logo`,
          inLanguage: "id-ID",
          url: `${siteConfig.url}/logo.png`,
          contentUrl: `${siteConfig.url}/logo.png`,
          width: 512,
          height: 512,
          caption: siteConfig.name,
        },
        image: {
          "@id": `${siteConfig.url}/#logo`,
        },
        email: siteConfig.contactEmail,
        telephone: siteConfig.contactPhone,
        address: {
          "@type": "PostalAddress",
          streetAddress: siteConfig.address,
          addressLocality: "Jakarta",
          addressRegion: "DKI Jakarta",
          postalCode: "10110",
          addressCountry: "ID",
        },
        sameAs: [siteConfig.links.twitter, siteConfig.links.linkedin, siteConfig.links.github],
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        publisher: {
          "@id": `${siteConfig.url}/#organization`,
        },
        inLanguage: "id-ID",
      },
      {
        "@type": "WebPage",
        "@id": `${siteConfig.url}/#webpage`,
        url: siteConfig.url,
        name: siteConfig.name,
        isPartOf: {
          "@id": `${siteConfig.url}/#website`,
        },
        about: {
          "@id": `${siteConfig.url}/#organization`,
        },
        description: siteConfig.description,
        inLanguage: "id-ID",
      },
    ],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

