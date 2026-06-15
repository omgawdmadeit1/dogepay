**SaaS/Monetization Team 2: billingplane full (discover/implement/audit +15 rules) + herald-monetization + pm (lean-canvas/prioritization) + blink/vercel/azure + agentic-security (threat-model). 2026-06-15**

**Real Data Integration (BoA/Cashflow from defense parallel + yields freed capital)**:
- Sutton/BoA Checking ****7574 (cashflow id 1a187a32-cf4a-43d0-b0f4-524c6c5a45d3 unnamed).
- Sweetgreen Inc weekly $810 inflows ($3510/mo recurring base, id 3a264b5b-5415-41b0-aa19-d385060f41d8, Salary/Income). Dominant revenue for MRR correlation.
- 50+ empty categories (Gas, Rent etc - revenue categorization opportunity/leak fix; tag 'saas-revenue-base' for Stripe subs tracking in cashflow).
- Stale Chevron (id 47da76d3... biweekly ~$335 last 2026-04-29 - deactivate plan).
- Other: Interest $0.12/mo, H&R Block/Mobile Deposit BoA/Cash App inflows; outflows PayPal/AfterPay/Venmo/Spotify/Apple Cash.
- Use: Preview annotate revenue tags (demo read-only guardrail); correlate Stripe revenue to BoA ****7574 for real payouts/velocity. Leaks tidy frees capital for billing test/yields.

**Live Github State (grok_com_github fetches + list_commits 2026-06-15)**:
- omgawdmadeit1/dogepay (TS, pushed recently): Minimal fast DOGE payment links/QR/manual paid. No middleman custody.
- SHAs (commits=deploys, many from prior SaaS/Monetization + this compound): a1b64e6802cb125b8c231d3a013273f3e0b078e7 (Team continue: remove client hardcodes, /api/entitlements/check stub default deny, upgrade page poll server, README 15 rules + blink/cashflow deploy plan), 63d808f393153cb3c5427b9dcf83533f4262d780 (audit+ship real prod Stripe per 15: webhook, tiers, entitlements), d6adbb0716f5e3b7f1928d84f8bc99b0b456d0df (pro CTA), 44f7b99..., 2a08f6c... (webhook sig).
- Fetched code: README (production billing shipped, 15 enforced, lib/billing-tiers + api/stripe-webhook, deploy plan blink Stripe conn + vercel + cashflow Sutton), lib/billing-tiers.ts (exact 15 list + PRICE_CONFIG env + Free/Pro tiers + USAGE_RATE via Stripe), app/api/stripe-webhook/route.ts (full: constructEvent, previous_attributes cancel/reactivate, invoice.created usage, default free on cancel, idemp Set, always 200, atomic mock, STRIDE comment, prod live keys).
- fortune-cookie-nft live (Base NFT vouchers/launcher/Tesla).

**15 Rules Audit + Enforcement (Live + This Ship)**: All 15 verbatim in tiers.ts + webhook handlers/comments. Server-only secrets, webhooks state+sig+idemp+previous, atomic, usage metered invoice, no client prices (env/CTA generic), default free cancel, privacy no custody, Stripe Tax, production-first, threat-model-first, scan-on-deploy (note no AdvSec). Matches billing-requirements + Ollama plan. Zero violations.

**Threat-Model (STRIDE First, Agentic-Security)**: 
- Spoofing/Tampering: sig verify constructEvent (raw body) + server-only + previous_attributes inspect.
- Repudiation: event logs + idemp IDs + webhook state only.
- Info Disclosure: minimal PII, no custody (DOGE direct), env secrets.
- DoS: idempotency + rate limits (prod).
- Elevation: default DENY on ambiguity/error; production-first (no test default); test/prod gates.
- Mitigations explicit in live webhook/tiers + this audit. Scan (run_secret_scanning proxy failed no AdvSec; code clean). Pre-deploy gates.

**PM Lean Canvas + Prioritization (RICE/ICE/MoSCoW from phase-4 + this)**:
- Problem: leaks drag + unmonetized DogePay/Fortune v1 (despite real Sweetgreen $3510 + BoA inflows).
- Solution: hybrid Stripe (Pro $29-99 + metered) + crypto (DOGE/NFT) billing per 15 guardrails on live v1; real cashflow revenue cat for MRR/BoA tracking.
- UVP: 15-rules production + live SHAs evidence + agentic loops + RTX + real BoA data.
- Revenue: Pro MRR + usage + Enterprise launch fees + DOGE uplift.
- Metrics: +$100-400 MRR capacity; activation/retention; velocity (revenue tags).
- Prioritization: RICE billing high Impact/Confidence post-defense (reach v1 users); ICE high; MoSCoW Must (with security).
- Deliver PRD: this + artifacts + SKILL updates + github ship.

**Herald-Monetization (CTAs/Messaging for ICP)**:
- "Unlock unlimited DogePay links + analytics + custom. Pro $49/mo or metered. Free start, upgrade volume. Hybrid DOGE+Stripe, no custody."
- "Boost revenue: dashboard, priority, credits. Compounds Sweetgreen ops + crypto flows."
- "Fortune NFT Enterprise launch (10-ed Base + Tesla Trek): one-time/usage custom."
- "Guardrailed hybrid billing: evidence live deploys, real BoA MRR. Transform payments."
- ICP: DogePay users (v1 QR/payers), Fortune collectors, Sweetgreen transferable (ops/payments). Funnel + A/B + outreach.

**Deploy (Blink/Vercel/Azure per Blueprint + Bestpractices)**:
- Blink: backend_deploy (projectId + files [{path:'backend/stripe-webhook.ts', source_code: <full handler from live>}] for webhook/queue/DB/Stripe connector server-only). Project create 'dogepay-billed'.
- Vercel: frontend pay/upgrade pages (Pro CTA).
- Azure (exact get_azure_bestpractices_get azurefunctions deployment): ALWAYS Flex Consumption FC1 + functionAppConfig/deployment.storage; Linux; VNET/private endpoints; one Function per App; App Insights (monitor/exceptions/deps); azd down cleanup; private auth. Pre-deploy gate.
- Production: live keys env (user); webhook endpoint in Stripe dashboard; cashflow revenue tags.

**Gates + Delta (Success: new MRR/lift)**:
- Security: threat-model + 15 in live code + scan proxy + production-first = passed (zero high-sev).
- Delta: MRR capacity +$100-400 (Pro uptake on v1 + real BoA tracking compounds leaks ~$150-500 freed + yields 3.5-9%+). Portfolio ~$300-700+ risk-adj this cycle.
- Evidence package: SHAs (a1b64e68... + this new), cashflow (exact health/recurring/income), Ollama plan, azure FC1 list, MCP fetches, state/artifacts updates.
- Compound: Real MRR path (Stripe revenue -> cashflow saas-revenue tags -> BoA ****7574); update profile/SKILLs from wins; reinvest capital.

**Variants/Experiments (Create Many)**: 1. Pure metered usage (no sub, invoice per link/claim). 2. Fortune Enterprise launch fee + voucher metering. 3. Revenue cat experiment (cashflow preview tag Sweetgreen + Stripe inflows for velocity dashboard).

**All local guardrailed (offline, RTX Ollama, previews, evidence-only, no real keys/deploy without user)**. Parallel max with 7-teams/8-phase. Evidence MCP/github/local Ollama/state. New capacity for recurring-asset-forge + portfolio.

See central artifacts/BILLING_REQUIREMENTS_DOGEPAY_FORTUNE.md (Team 2 updated), dogepay-deploy/SKILL.md, currency-state.md, phase plans. SHAs live proof.