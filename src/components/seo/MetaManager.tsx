import React, { useEffect } from 'react';
import { CalculatorDefinition } from '../../types';

interface MetaManagerProps {
  title?: string;
  description?: string;
  calculator?: CalculatorDefinition;
  path: string;
}

export const MetaManager: React.FC<MetaManagerProps> = ({
  title,
  description,
  calculator,
  path
}) => {
  useEffect(() => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://hesapkutu.com';
    const canonicalUrl = `${origin}${path}`;

    const finalTitle =
      calculator?.seoTitle ||
      title ||
      'HesapKutu – Ücretsiz Çevrimiçi Hesaplama Araçları';

    const finalDesc =
      calculator?.metaDescription ||
      description ||
      'Yüzde, KDV, kâr marjı, iskonto, metrekare, yakıt, hisse maliyet ve yapay zeka destekli tüm hesaplamalarınızı anında yapın.';

    // Update document title
    document.title = finalTitle;

    // Helper to set or create meta
    const setMeta = (attrName: string, attrVal: string, content: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrVal);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Standard meta tags
    setMeta('name', 'description', finalDesc);
    setMeta('property', 'og:title', finalTitle);
    setMeta('property', 'og:description', finalDesc);
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('property', 'og:type', calculator ? 'article' : 'website');
    setMeta('property', 'og:site_name', 'HesapKutu');
    setMeta('name', 'twitter:title', finalTitle);
    setMeta('name', 'twitter:description', finalDesc);

    // Canonical link tag
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonicalUrl);

    // Schema.org JSON-LD structured data
    let scriptTag = document.getElementById('schema-ld-json') as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'schema-ld-json';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    const schemas: any[] = [];

    // 1. WebSite schema
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      'name': 'HesapKutu',
      'url': origin,
      'potentialAction': {
        '@type': 'SearchAction',
        'target': `${origin}/?q={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    });

    if (calculator) {
      // 2. WebApplication schema
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        'name': calculator.title,
        'applicationCategory': 'UtilitiesApplication',
        'operatingSystem': 'All',
        'url': canonicalUrl,
        'description': calculator.metaDescription,
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'TRY'
        }
      });

      // 3. BreadcrumbList schema
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Ana Sayfa',
            'item': origin
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': calculator.category,
            'item': `${origin}/?kategori=${calculator.categorySlug}`
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': calculator.title,
            'item': canonicalUrl
          }
        ]
      });

      // 4. FAQPage schema
      if (calculator.faqs && calculator.faqs.length > 0) {
        schemas.push({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          'mainEntity': calculator.faqs.map((faq) => ({
            '@type': 'Question',
            'name': faq.question,
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': faq.answer
            }
          }))
        });
      }
    }

    scriptTag.textContent = JSON.stringify(schemas);
  }, [title, description, calculator, path]);

  return null;
};
