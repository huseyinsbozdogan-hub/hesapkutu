export type CalculatorCategory =
  | 'Matematik & Temel'
  | 'Para & Finans'
  | 'Ticaret & E-Ticaret'
  | 'İnşaat & Üretim'
  | 'Otomotiv & Seyahat'
  | 'Yatırım & Borsa';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface CalculatorDefinition {
  id: string;
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  category: CalculatorCategory;
  categorySlug: string;
  shortDescription: string;
  iconName: string;
  formula: string;
  howItWorks: string[];
  example: {
    scenario: string;
    calculation: string;
    result: string;
  };
  faqs: FAQItem[];
  relatedSlugs: string[];
  isPopular?: boolean;
  defaultInputs: Record<string, any>;
  affiliateInfo?: {
    enabled: boolean;
    title?: string;
    partnerName?: string;
    description?: string;
    affiliateLink?: string;
  };
}

export interface CalculationRecord {
  id: string;
  toolSlug: string;
  toolTitle: string;
  title: string;
  inputs: Record<string, any>;
  results: Record<string, any>;
  summary: string;
  createdAt: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  isPro: boolean;
  proExpiresAt?: string;
  role: 'user' | 'admin';
  companyProfile?: {
    companyName: string;
    logoUrl?: string;
    taxNumber?: string;
    taxOffice?: string;
    phone?: string;
    address?: string;
    iban?: string;
  };
}

export interface QuoteItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  discountPercent: number;
  taxPercent: number;
}

export interface Quote {
  id: string;
  quoteNumber: string;
  clientName: string;
  clientCompany?: string;
  clientEmail?: string;
  clientPhone?: string;
  date: string;
  validUntil: string;
  notes?: string;
  items: QuoteItem[];
  subtotal: number;
  totalDiscount: number;
  totalTax: number;
  grandTotal: number;
}

export interface AnalyticsEvent {
  name:
    | 'calculator_used'
    | 'calculator_result'
    | 'ai_calculation'
    | 'calculator_shared'
    | 'favorite_added'
    | 'signup_started'
    | 'signup_completed'
    | 'pro_clicked';
  params?: Record<string, any>;
}
