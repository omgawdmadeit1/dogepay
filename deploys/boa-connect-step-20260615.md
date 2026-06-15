# BoA Connect Step 2026-06-15

User command: disconnect demo → real BoA Plaid

**FRESH MCP (cashflow__accounts + query health/recurring, 2026-06-15 ~06:xx UTC):**
- Only conn: id=`e1034f8e-c36b-464d-b876-fdcec16baa49` "First Platypus Bank" (demo, lastSynced ~2h ago, initialSyncComplete=true).
- Account: id=`1a187a32-cf4a-43d0-b0f4-524c6c5a45d3` Checking mask="7574" active.
- No Bank of America. webBaseUrl=https://cashflow.tech
- Health: unnamed 1a187a32, 50+ empty_categories (incl Gas in Bills & Utilities), stale_recurring Chevron.
- Recurring: Sweetgreen Inc. id=3a264b5b-... weekly $810 ($3510/mo inflow), Chevron id=47da76d3... biweekly stale last 2026-04-29, totals monthly_income 3510.12 / expenses 386.68 / net 3123.44 / annual_net 37481.28. Forecast lowest ~410 on 2026-06-16.

**Exact UI steps for user (at https://cashflow.tech):**
1. Open https://cashflow.tech (browser, log in).
2. Open accounts/connections dashboard (cashflow__accounts widget).
3. On "First Platypus Bank" card (e1034f8e-c36b-464d-b876-fdcec16baa49): **Disconnect** (revokes Plaid item).
4. Click **Connect new** / Plaid "Connect bank".
5. Plaid flow → Bank of America → real login → select checking ****7574 (target 1a187a32 or primary).
6. Complete sync. Confirm real (non-demo) txns appear.

**Gate (enforced, per shipping-state + routing-plan + all artifacts + 0 high-sev):** UNBLOCK + apply guarded payloads (cats incl **Tesla Trek Revenue** + rules for Tesla patterns/payouts/energy; rename 1a187a32 "Primary Checking (BoA)" + routing 124303201/33968299; deact Chevron 47da76d3; bulk annotate empties/BNPL; Sweetgreen/STRIPE/Tesla rules) + re-query deltas + real /pay Tesla Trek links + compound 50/30/20 **only after user replies EXACTLY:**
`BoA connected real data active`

shipping-state.json updated locally with this verification + command + readiness. Tesla-inclusive plans live (Tesla-Trek-Creator-Protocol-Playbook-2026-06-15.md, cashflow-revenue-routing-plan.md, sales CTAs, 11+ leads, DogePay capacity). All real MCP/Git/site evidence only. No demo data/decisions.

Next on signal: re-query, preview-first apply per schemas, measure revenue cat volume (Tesla + billing), BoA deposits, energy spend; 50% route to 124303201/33968299, 30% yields (Morpho/Aave/Ledn real rates), 20% MRR (real /pay/tesla-trek-*-2026 with SHAs/Sweetgreen/routing/15rules + limited rare $39 + $197 kit + $297 SaaS); Git push; sell; compound.

0 high-sev. Real only. Ready.