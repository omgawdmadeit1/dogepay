**DogePay**

Minimal, fast DOGE payment link generator.

Create a link. Get paid directly on-chain in DOGE. No middleman custody.

Built by Revenant (maximum legal autonomy mode).

## Current Status (production billing shipped)

- Real Stripe billing for Pro tier + usage metering (hybrid with DOGE on-chain) live in main.
- SaaS/Monetization Team audit + ship: billingplane 15 rules fully applied (see commits, webhook, tiers, entitlements check).
- Production (no test): live keys required in env. Webhooks for ALL state.

## Production Billing (15 Rules Enforced - billingplane)
See lib/billing-tiers.ts + app/api/stripe-webhook/route.ts for implementation.
- Server secrets ONLY (STRIPE_SECRET_KEY sk_live_*, WEBHOOK_SECRET).
- All prices/PriceIDs from env/config (no hardcodes in client or code).
- Webhooks ONLY for entitlements/state (checkout redirect = display only; poll /api/entitlements/check or status).
- Full sig verify (constructEvent raw body).
- Idempotency, previous_attributes inspection, always 200, default free fallback scheduled on cancel, invoice.created for usage arrear.
- Atomic entitlements (prod DB/Redis; default deny on error).
- No custody of funds (DOGE direct; Stripe for subs only).
- STRIDE threat model on payments/webhooks (sig verifies auth/integrity; minimal PII; logs for non-repud; default deny prevents elevation).

## Deploy Plan (if keys/project unavailable)
1. User: Connect real Sutton cashflow via https://cashflow.tech (frees ~$300-500/mo per leaks analysis; tag bnpl-leak, categorize 50+ empty e.g. Gas->Transportation, deact Chevron 47da76d3-5349-49aa-9ef5-73c799c44735, rename to Primary Checking).
2. For billing: Create/connect Blink project for DogePay (blink_project_create or UI; use connector for Stripe OAuth or keys).
3. Set server-only secrets: blink_env_set or platform (STRIPE_* live only; no client). Add Stripe connector (blink_connector_status / exec).
4. Deploy webhook/backend: blink_backend_deploy or Vercel (set envs). Configure Stripe Dashboard -> Developers -> Webhooks -> live endpoint to your /api/stripe-webhook (events: all listed in handler).
5. Update Price IDs in Stripe live dashboard; set in env.
6. npm i (after package update); vercel --prod or blink deploy.
7. Test: Stripe CLI or live small tx; verify webhook logs state; entitlements/check returns allowed only post-webhook.
8. Cashflow revenue tag for MRR tracking.

Live: Update after deploy. Hybrid: /pay links for DOGE + Pro upgrade for fiat subs/usage.

See also: fortune-cookie-nft, cashflow real shift.

Repo managed under maximum autonomy. Ship fast. Tell the truth. Evidence only (github commits, tool fetches).

---

Built by Revenant. No corporate theater.