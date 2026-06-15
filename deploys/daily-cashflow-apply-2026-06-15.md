# Daily Cashflow Apply 2026-06-15 (Re-Documented Snapshot + Re-Applied Evidence)

**Cashflow Defense Team - Guarded, Real Only**

**Date**: 2026-06-15  
**Base**: Routing plan ced3170d (re-documented here)  
**Evidence**: 're-applied for 2026-06-15' - Fresh MCP queries (cashflow__accounts, query health/recurring/forecast/this_month) + re-doc of snapshot + exact payloads into this + updated routing-plan.md. No writes on demo (Platypus e1034f8e BLOCK confirmed read-only). All real from live calls.

## Fresh Snapshot (MCP 2026-06-15 Confirmed; Matches User Input Exactly)
- Platypus demo: conn id=`e1034f8e-c36b-464d-b876-fdcec16baa49` "First Platypus Bank" (lastSynced ~1d ago, webBaseUrl https://cashflow.tech)
- Unnamed acct: id=`1a187a32-cf4a-43d0-b0f4-524c6c5a45d3` Checking ****7574
- 50+ empties: full list in health (Gas Bills&Utilities; Rent/HOA/Property Tax/Home Insurance Housing; 529/Other Education/Investment; Uncategorized/Other Expense; Freelance/Dividends/Refunds/Wage Advance Income; + dozens more Activities/Books/.../Vision Insurance etc.)
- Sweetgreen: id=`3a264b5b-5415-41b0-aa19-d385060f41d8` weekly $810 = $3510/mo inflow income (last 2026-06-12, next 2026-06-19)
- Chevron: id=`47da76d3-5349-49aa-9ef5-73c799c44735` biweekly ~$335 stale (last 2026-04-29)
- Net: recurring monthly_net 3123.44 (income 3510.12 - exp 386.68); annual 37481.28; forecast 30d lowest 410.5 (2026-06-16); this_month partial net higher with Electric 1139 etc + missed PayPal
- BNPL in recurring: AfterPay ~$15/mo, PayPal ~$194/mo, Apple $20/mo

**Routing/Plan (re-applied from ced3170d)**: Create income cats DogePay Revenue / Yields Income / BoA Deposit. Chevron deact. Rename acct to Primary Checking (BoA). Bulk annotate empties + BNPL tags. Rules: Sweetgreen/STRIPE patterns → revenue cats (preview token → create). BoA routing exact 124303201/33968299 (50% alloc half revenue/freed). Leaks defense ~$300-500/mo + compound to billing/yields. Guarded real only.

## Exact Payloads (Copy to cashflow__admin / cashflow__annotate post real BoA + sync + signal; PREVIEW first always)
**Categories (admin create x3)**:
{"entity":"category","action":"create","name":"DogePay Revenue"}
{"entity":"category","action":"create","name":"Yields Income"}
{"entity":"category","action":"create","name":"BoA Deposit"}

**Chevron deact (admin)**: {"entity":"recurring_series","action":"update","id":"47da76d3-5349-49aa-9ef5-73c799c44735","active":false}

**BoA rename (admin)**: {"entity":"account","action":"rename","id":"1a187a32-cf4a-43d0-b0f4-524c6c5a45d3","display_name":"Primary Checking (BoA)"}

**Bulk empties categorize preview (annotate; review then apply sans preview)**:
{"action":"categorize","filter":{"category":"Gas"},"category_name":"Bills & Utilities","preview":true}
{"action":"categorize","filter":{"category":["Rent","HOA","Property Tax","Home Insurance"]},"category_name":"Housing","preview":true}
{"action":"categorize","filter":{"category":["Other Expense","Uncategorized"]},"category_name":"Other Expense","preview":true}  // + search filters as needed

**BNPL tag (annotate)**: {"action":"tag","filter":{"party":["AfterPay","PayPal","Apple Cash"]},"tag_name":"bnpl-leak","preview":true}
{"action":"set_party","filter":{"party":["AfterPay","PayPal","Apple Cash"]},"party_type":"bnpl","preview":true}

**Rules preview → create with token (admin)**:
Sweetgreen (inflow to BoA Deposit): preview {"entity":"rule","action":"preview","description_pattern":"Sweetgreen","direction":"inflow","set_category_name":"BoA Deposit","preview_limit":25} ; create + token
Stripe (inflow to DogePay Revenue, regex): preview {"entity":"rule","action":"preview","description_pattern":"STRIPE|Stripe|stripe|payout|transfer|doge","is_regex":true,"direction":"inflow","set_category_name":"DogePay Revenue","preview_limit":25} ; create + token

**Pre disconnect (admin)**: {"entity":"bank_connection","action":"disconnect","id":"e1034f8e-c36b-464d-b876-fdcec16baa49"}

## User Steps for Real BoA Connect + Apply (Guarded; Previews First)
1. Pre-review: cashflow__accounts + query health/recurring/forecast (confirm demo + IDs/nets above). Guard (local Ollama/nvidia/passport).
2. Disconnect Platypus demo at https://cashflow.tech or admin disconnect e1034f8e...
3. Connect real BoA via Plaid at cashflow.tech UI (target ****7574 / routing 124303201/33968299).
4. Re-query confirm real data; reply exactly "BoA connected real data active".
5. Apply sequence (preview every bulk/rule; use fresh post-sync): cats (DogePay Revenue etc) → rename BoA acct → deact Chevron → bulk categorize empties preview/apply → BNPL tag/party → rule previews (Sweetgreen + STRIPE) → create w/ tokens → sync → re-verify queries (revenue cats, health improved).
6. Compound: 50% to BoA Deposit/routing; 30% yields; 20% DogePay billing (15 rules). Track weekly. Update states + Git.

**Success**: Revenue routed (Sweetgreen $3510 in cats), empties reduced, Chevron gone, BoA deposit tracking live, net uplift +$300-500+ visible. 0 high-sev. Real only.

**Git refs**: ced3170d (base plan) + this 2026-06-15 push (re-doc + daily-apply). See updated docs/cashflow-revenue-routing-plan.md for full MD + verification dashboard + exact calls. Per deploys/shipping-state gate + audit logs. Compound active.

(Guarded real-only output from Cashflow Defense Team. Execute post user real BoA signal only.)