// Simple event tracking utility
// In production, you can integrate with Google Analytics, Meta Pixel, etc.

export function track(eventName: string, properties?: Record<string, any>) {
  if (typeof window === "undefined") return;
  
  // Log to console in development
  if (import.meta.env.DEV) {
    console.log("[Track Event]", eventName, properties);
  }
  
  // Here you can add GA4 or Meta Pixel tracking
  // Example: window.gtag?.('event', eventName, properties);
}
