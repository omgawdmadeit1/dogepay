## Cashflow Revenue Routing Plan (Real Evidence-Only, 2026-06-15)

**Sources (all real MCP + Git + artifacts; no demo/fake)**:
- cashflow__query (recurring + health): Sweetgreen id `3a264b5b-5415-41b0-aa19-d385060f41d8` weekly $810 = $3510/mo inflow income Checking last 2026-06-12. Chevron id `47da76d3-5349-49aa-9ef5-73c799c44735` biweekly ~$154.75 (mo 335) stale last 2026-04-29. BNPL: AfterPay id `e4b6aa28...` $7 bi, PayPal `7aafc4f3...` $89.5 bi, Apple Cash `3340fc59...` $20. Totals: monthly_income 3510.12 expenses 386.68 **net 3123.44** annual_net 37481.28. Forecast 30d: start 500 end 3280 lowest 410.5 2026-06-16. Missed PayPal.
- Health/accounts: unnamed `1a187a32-cf4a-43d0-b0f4-524c6c5a45d3` Checking ****7574. 50+ empty_categories (Gas Bills&Utilities; Rent/HOA/Property Tax/Home Insurance Housing; 529 Education/Investment; Uncategorized/Other Expense; Freelance/Dividends Income; plus dozens: Activities/Books/Business Meals/Car Insurance/Charitable/Childcare/Credit Card Payment/Rewards/Dental/Doctor/Health/Mental/Vision Insurance/Gifts/Hobbies/Home Security/Interest Charges/Kids Clothing/Late Fees/Legal/Life Insurance/Local/State Tax/Movies/News/Other Business/Education/Investment/Media/Transportation/Pet Care/Vet/Political/Religious/Professional Services/School/Shipping/Supplies/Trash/Tuition/Vacation/etc.). Platypus conn id `e1034f8e-c36b-464d-b876-fdcec16baa49` webBaseUrl https://cashflow.tech (demo).
- GitHub dogepay real (grok_com_github__list_commits): ce7e66ad... (compound: Sweetgreen 3510 id 3a264b5b net 3123 + Chevron 335 deact + 50+ empties + revenue cat plan DogePay Revenue/Yields/BoA Deposit + BoA routing 124303201/33968299 + guard read-only + velocity +300-700); a679556d (billingplane+15rules+real BoA+100-400MRR); 1f320aad (Team6 + 15rules refs + Platypus e1034f8e BLOCK); d2fdd938 (growth); 63d808f3 etc (15 rules ship).
- Artifacts: REAL-REVENUE-PLAYBOOK-2026-06-15.md, deploys/shipping-state.json + billing-deploy.json (BoA gate + routing + 15 rules + compound 50% BoA + 30% yields 3.5-9% + 20% MRR), audit/cashflow-defense-*/logs, loops/*/currency-state.md.

**Exact Guarded Payloads (preview-first per schema; execute ONLY after real BoA connect at cashflow.tech + sync. All read-only demo respected; no writes here.)**

**1. Categories (income type):**
```json
{ "entity": "category", "action": "create", "name": "DogePay Revenue" }
{ "entity": "category", "action": "create", "name": "Yields Income" }
{ "entity": "category", "action": "create", "name": "BoA Deposit" }
```
(Use cashflow__admin list first if needed to check groups.)

**2. Chevron deact (stale):**
```json
{ "entity": "recurring_series", "action": "update", "id": "47da76d3-5349-49aa-9ef5-73c799c44735", "active": false }
```

**3. Account rename (to BoA):**
```json
{ "entity": "account", "action": "rename", "id": "1a187a32-cf4a-43d0-b0f4-524c6c5a45d3", "display_name": "Primary Checking (BoA)" }
```

**4. Pre disconnect (if needed):**
```json
{ "entity": "bank_connection", "action": "disconnect", "id": "e1034f8e-c36b-464d-b876-fdcec16baa49" }
```

**5. Bulk categorize empties (preview:true first; review echoed range/matches; repeat for all 50+):**
```json
{ "action": "categorize", "filter": { "category": "Gas" }, "category_name": "Bills & Utilities", "preview": true }
{ "action": "categorize", "filter": { "category": ["Rent", "HOA", "Property Tax", "Home Insurance"] }, "category_name": "Housing", "preview": true }
{ "action": "categorize", "filter": { "category": ["Other Expense", "Uncategorized"] }, "category_name": "Other Expense", "preview": true }
{ "action": "categorize", "filter": { "category": ["529 Plan", "529 Plan Transfer"] }, "category_name": "Investment", "preview": true }
```
(For fuzzy: add "search": "gas|uber|shell" inside filter. Use annotate apply_rules after rules created.)

**6. BNPL tag + party (preview first):**
```json
{ "action": "tag", "filter": { "party": ["AfterPay", "PayPal", "Apple Cash"] }, "tag_name": "bnpl-leak", "preview": true }
{ "action": "set_party", "filter": { "party": ["AfterPay", "PayPal", "Apple Cash"] }, "party_type": "bnpl", "preview": true }
```

**7. Rules (Sweetgreen + Stripe patterns to revenue; preview -> token -> create; direction inflow):**
```json
// Sweetgreen preview (primary to BoA Deposit)
{ "entity": "rule", "action": "preview", "description_pattern": "Sweetgreen", "direction": "inflow", "set_category_name": "BoA Deposit", "preview_limit": 25 }

// Create (use token from preview response)
{ "entity": "rule", "action": "create", "description_pattern": "Sweetgreen", "direction": "inflow", "set_category_name": "BoA Deposit", "token": "<TOKEN_FROM_PREVIEW>" }

// Stripe/payout/transfer/doge (to DogePay Revenue; regex)
{ "entity": "rule", "action": "preview", "description_pattern": "STRIPE|Stripe|stripe|payout|transfer|doge", "is_regex": true, "direction": "inflow", "set_category_name": "DogePay Revenue", "preview_limit": 25 }
// Then create with token...
```

**Post-apply verification queries:**
- cashflow__query {"health":true,"recurring":true,"forecast":true,"account_summary":true}
- {"recurring":true,"is_active":true}
- {"category":["DogePay Revenue","BoA Deposit"],"period":"this_month"} or by=["category"]
- {"forecast":true,"forecast_days":30}
- cashflow__accounts {}

**Expected post-fix health (real BoA + sync + apply):** Empties reduced (bulk re-cats move txns out of 50+ mis/empty); revenue routed (Sweetgreen exact id + Stripe patterns hit DogePay Revenue/BoA Deposit cats); BoA deposit ready (renamed acct + income cats + routing 124303201/33968299 + rules live); Chevron deact (stale 0); bnpl tagged; health cleaner (unnamed fixed); forecast protected (lowest_bal lifted from freed capital); this_month unalloc % drop.

**Compound (per currency-teams + shipping + playbook):** Base Sweetgreen $3510/wk + net 3123. Leaks freed ~$300-500/mo (Chevron 335 + bnpl ~229 + 50+ tidy). Billing DogePay 15-rules capacity +$100-400/mo MRR (live Git a679556d/63d808f3 + growth d2fdd938). Allocation: 50% half revenue/freed direct to BoA Deposit (routing 124303201 acct 33968299 via cat/rule); 30% yields (3.5-9% Morpho/Aave USDC refs); 20% billing growth. Velocity uplift +$300-700+/mo path (personal base dominant + revenue tracking + compound). Annual proxy ~$43k+ with uplift. Success: 1+ real revenue signal (MRR volume in DogePay Revenue cat post-BoA or first playbook sale via DogePay link routed to BoA Deposit).

**User immediate actions (cashflow.tech UI or direct MCP after real BoA):**
1. Pre: cashflow__accounts + query health/recurring (confirm Platypus e1034f8e + exact IDs above).
2. Disconnect demo: UI or {entity:"bank_connection", action:"disconnect", id:"e1034f8e-c36b-464d-b876-fdcec16baa49"}.
3. Connect real BoA: UI "Connect new" -> Plaid BoA (target ****7574-equivalent). Complete sync.
4. Confirm: re-accounts/health (new BoA active, real data). Signal "BoA connected real data active".
5. Apply in order (previews first, review matches/range, then creates/updates with tokens from preview; post-sync only). Sync via admin/UI. Allocate half to BoA Deposit cat/routing.
6. Track/compound: re-query; Git push updates if needed; 20% MRR side (DogePay); 30% yields; scheduler repeats.

**Gates (strict, respected):** Previews/evidence-only (demo read-only confirmed on all admin/annotate attempts); real BoA for writes; all numbers/IDs/SHAs from live MCP (cashflow__query, grok_com_github__list_commits) + artifacts/Git; 0 high-sev (STRIDE in billing SHAs, production-first, billingplane 15, local guards). No demo decisions.

**Absolute paths (session):** C:\Users\Josep\.grok\artifacts\cashflow-revenue-routing-plan.md (this), REAL-REVENUE-PLAYBOOK-2026-06-15.md, deploys/shipping-state.json + billing-deploy.json, audit/cashflow-defense-team4/*.log + cashflow-unblock-*.log, loops/*/currency-state.md, commands/make-currency.md, skills/currency-teams/SKILL.md.

Ready for real BoA unblock + apply. Re-query post for deltas. Compound half to BoA + billing MRR + yields. Update states/Git. Positive gated evidence-based revenue tracking for DogePay billing.