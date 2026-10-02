// Google Analytics 4 & Internal Analytics Dispatcher

const GA_MEASUREMENT_ID = (import.meta as any).env?.VITE_GA_MEASUREMENT_ID;

// Initializer: loads gtag script if GA_MEASUREMENT_ID is provided
export function initAnalytics() {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID) {
    return;
  }

  // Check if already injected
  if (document.getElementById('ga4-script')) return;

  const script = document.createElement('script');
  script.id = 'ga4-script';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  const inlineScript = document.createElement('script');
  inlineScript.id = 'ga4-inline';
  inlineScript.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });
  `;
  document.head.appendChild(inlineScript);
}

export function trackEvent(
  eventName:
    | 'calculator_used'
    | 'calculator_result'
    | 'ai_calculation'
    | 'calculator_shared'
    | 'favorite_added'
    | 'signup_started'
    | 'signup_completed'
    | 'pro_clicked'
    | 'page_view',
  params?: Record<string, string | number | boolean>
) {
  // Never send sensitive financial amounts or personal data
  const safeParams: Record<string, any> = {
    timestamp: new Date().toISOString(),
    ...params
  };

  // If GA is configured on window
  if (typeof window !== 'undefined' && (window as any).gtag && GA_MEASUREMENT_ID) {
    try {
      (window as any).gtag('event', eventName, safeParams);
    } catch {
      // ignore
    }
  }

  // Store in internal event queue for internal metrics & popular ranking
  try {
    const rawEvents = localStorage.getItem('hesapkutu_analytics_events');
    const events: any[] = rawEvents ? JSON.parse(rawEvents) : [];
    events.push({ event: eventName, ...safeParams });
    if (events.length > 200) events.shift();
    localStorage.setItem('hesapkutu_analytics_events', JSON.stringify(events));
  } catch {
    // localStorage quota or private mode
  }
}
