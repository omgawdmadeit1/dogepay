**Cashflow Defense Maximiser Package (from background subagent 019ec965-0498-7552-a8d2-3333536805ae, 2026-06-15)**

Full guarded apply package + dashboard for immediate revenue tracking enablement.

**Verified state (live MCP, exact):** Platypus e1034f8e (demo gate), acct 1a187a32 ****7574, 50+ empty cats (full list), Sweetgreen 3a264b5b $3510/mo weekly inflow (id exact), Chevron 47da76d3 stale ~335/mo, net 3123.44, forecast low 410.5 2026-06-16, BNPL leaks etc. All admin/annotate previews blocked 'Demo account is read-only' (evidence).

**Git push:** New commit 73634cc35daf952e3d4a9101853f74a140f585ab (deploys/cashflow-apply-now-execution-package-2026-06-15.md + routing plan note).

**Dashboard stub:** Appended to artifacts/cashflow-revenue-routing-plan.md + CSV at artifacts/cashflow-verification-dashboard-stub-2026-06-15.csv (current vs post-fix projection: +300-500 freed, revenue cats, 50% to exact BoA routing 124303201/33968299, +$300-700 velocity).

**Exact ready calls (post real BoA + sync + signal 'BoA connected real data active'; previews first per schema):**
- Cats: {"entity":"category","action":"create","name":"DogePay Revenue"} (repeat Yields Income, BoA Deposit).
- Chevron deact: {"entity":"recurring_series","action":"update","id":"47da76d3-5349-49aa-9ef5-73c799c44735","active":false}.
- Rename: {"entity":"account","action":"rename","id":"1a187a32-cf4a-43d0-b0f4-524c6c5a45d3","display_name":"Primary Checking (BoA)"} (+ set_note routing).
- Annotate preview (Gas example): {"action":"categorize","filter":{"category":"Gas"},"category_name":"Bills & Utilities","preview":true} (adapt empties/BNPL).
- Rule preview Sweetgreen: {"entity":"rule","action":"preview","description_pattern":"Sweetgreen","direction":"inflow","set_category_name":"BoA Deposit"} (then create w/token; alt DogePay Revenue).
- STRIPE regex preview: {"entity":"rule","action":"preview","description_pattern":"STRIPE|Stripe|stripe|payout|transfer|doge","is_regex":true,"direction":"inflow","set_category_name":"DogePay Revenue"}.
- Disconnect pre: {"entity":"bank_connection","action":"disconnect","id":"e1034f8e-c36b-464d-b876-fdcec16baa49"}.
- Post: sync + apply_rules.

**Full 'APPLY NOW' CHECKLIST + sequence + dashboard table + supporting calls:** See pushed deploys/cashflow-apply-now-execution-package-2026-06-15.md and updated artifacts/cashflow-revenue-routing-plan.md.

Guarded, real-only, previews mandatory. Execute only on real BoA connect + signal. Compound 50% routing + 30% yields + 20% MRR. 0 high-sev. Evidence MCP + Git 73634cc3 + prior chain.