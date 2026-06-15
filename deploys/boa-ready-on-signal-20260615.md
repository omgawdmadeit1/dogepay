**User 'ready on sgnal' (ready on signal) - 2026-06-15**

User command: 'ready on sgnal' (typo for 'ready on signal').

**Fresh re-discover (post all prior commands)**:
- cashflow__accounts: STILL ONLY Platypus demo conn id=`e1034f8e-c36b-464d-b876-fdcec16baa49` 'First Platypus Bank' (lastSynced ~3h ago), account Checking mask=`7574` id=`1a187a32-cf4a-43d0-b0f4-524c6c5a45d3` active. No BoA. orphanAccounts: [].
- health: unnamed 1a187a32, 50+ empty_categories (exact prior list), stale_recurring Chevron.
- recurring: Sweetgreen id=`3a264b5b-...` weekly $810 ($3510/mo inflow), Chevron id=`47da76d3-...` biweekly stale (last 2026-04-29), totals monthly_income 3510.12 / expenses 386.68 / net 3123.44.

**Interpretation**: User signals readiness for the post-BoA-apply phase (payloads, deltas, /pay Tesla links, compound) once the signal is received.

**Gate status (unchanged, strictly enforced per all states/routing-plan/Tesla-playbook)**: 
- No routing applies (no cats incl 'Tesla Trek Revenue', no rename 1a187a32 to 'Primary Checking (BoA)' + routing note 124303201/33968299, no Chevron deact 47da76d3, no bulk annotate empties/BNPL, no Sweetgreen/STRIPE/Tesla rules).
- No re-queries for revenue cat volume / BoA deposits / energy spend deltas.
- No real /pay/tesla-trek-*-2026 creation (evidence descs w/ SHAs/Sweetgreen/routing/15 rules/live site/Tesla features).
- No 50/30/20 compound, yields alloc, sales on leads.

**Required for unblock**: User completes in browser at https://cashflow.tech:
1. Disconnect 'First Platypus Bank' (e1034f8e...).
2. Connect new via Plaid → real Bank of America → link ****7574 checking (target 1a187a32 or primary).
3. Wait for sync, confirm real (non-demo) data active in UI.
4. Reply **exactly**: `BoA connected real data active`

Then: immediate re-discover (confirm real BoA), preview-first guarded apply per schemas (Tesla Trek Revenue cat + rules, rename acct w/ routing, deact Chevron, annotate, etc.), measure deltas, create real DogePay /pay Tesla links (6-step w/ full evidence), Git push, 50/30/20 compound (Tesla as primary vector + bundles), etc.

shipping-state.json updated with 'ready on sgnal' + current demo state. New evidence: deploys/boa-ready-on-signal-20260615.md. Git push recorded. All real MCP evidence only. 0 high-sev.

We are ready on the signal. Complete the browser UI steps, then send the exact phrase.