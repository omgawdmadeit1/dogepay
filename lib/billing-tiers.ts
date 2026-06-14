// Billing tiers for DogePay hybrid per BILLING_REQUIREMENTS_DOGEPAY_FORTUNE.md (15 guardrails: no hard prices in client, server-side only, webhooks state, sig verify, atomic entitlements, schedule default on cancel, usage metered, default deny, etc.)
// Pro: $19/mo unlimited links + analytics; usage metered $0.05 per paid tx overage; free limited 5/mo.

export const BILLING_TIERS = {
  free: { links: 5, analytics: false, priceId: 'price_free' }, // server/env only
  pro: { links: Infinity, analytics: true, priceId: process.env.STRIPE_PRO_PRICE_ID },
  usage: { metered: true, rate: 0.05 }
};
// Entitlements from webhook: grant pro for customer
// No hard-coded in UI