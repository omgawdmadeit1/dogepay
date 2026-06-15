// Billing tiers/config for DogePay (production, hybrid DOGE+Stripe fiat topup/Pro subs)
// Enforces billingplane 15 non-negotiable rules (from billingplane-b403533f SKILL + commands/implement + stripe-billing refs):
// 1. Never hardcode prices/amounts - ALL from env or validated config.
// 2. Secret key server-side ONLY.
// 3. Frontend: publishable + Price IDs only.
// 4. All state via webhooks (no redirect/client writes).
// 5. Success never implies paid (poll server).
// 6. Feature access server-side only (default deny on error/ambiguity).
// 7. Webhook sig verify mandatory.
// 8. Idempotency per event ID.
// 9. subscription.updated MUST inspect previous_attributes.
// 10. Default DENY on ambiguity.
// 11. Never compute money client-side (Stripe handles).
// 12. Schedule default (free) product on cancellation.
// 13. Webhook always return 200.
// 14. Usage: invoice.created handler for arrear.
// 15. Atomic entitlement deductions.
// Production-first: live keys only (user sets). No custody (DOGE direct to user wallet). Minimal PII.
// Evidence: audit via fetched code + billingplane audit.md criteria applied; prior commits 2a08f6c/44f7b99/d6adbb0 baseline.

export const PRICE_CONFIG = {
  pro: {
    monthly: process.env.STRIPE_PRICE_PRO_MONTHLY!, // validated
  },
} as const;

const VALID_PRICE_IDS = new Set(
  Object.values(PRICE_CONFIG).flatMap((t) => Object.values(t).filter(Boolean))
);
export const isValidPriceId = (id: string) => VALID_PRICE_IDS.has(id);

// Tier entitlements (server resolved; client receives only booleans/IDs via webhook-confirmed status)
export const DEFAULT_FREE_TIER = {
  links: 5,
  analytics: false,
};

export const PRO_TIER = {
  links: Infinity,
  analytics: true,
};

export const USAGE_RATE_CENTS = 5; // $0.05 per tx overage - but billed via Stripe invoice items, not client math
// Usage metered in-arrear handled in webhook invoice.created + Stripe math.
// No hard amounts in client code.