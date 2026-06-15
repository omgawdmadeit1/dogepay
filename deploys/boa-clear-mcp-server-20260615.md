**User 'clear mcp server' - 2026-06-15**

User command: 'clear mcp searver' (interpreted as 'clear mcp server' to force-clear the cashflow demo connection for real BoA Plaid).

**Actions taken**:
- Re-attempted cashflow__admin {entity: 'bank_connection', action: 'disconnect', id: 'e1034f8e-c36b-464d-b876-fdcec16baa49'} → Failed: 'Demo account is read-only'
- cashflow__accounts (discover) → Still ONLY Platypus demo: conn id=e1034f8e-c36b-464d-b876-fdcec16baa49 'First Platypus Bank' (lastSynced ~3h ago), account Checking ****7574 (id=1a187a32-cf4a-43d0-b0f4-524c6c5a45d3). No Bank of America. No other conns. orphanAccounts: [].

**Interpretation of 'clear'**: Force disconnect/clear of current demo MCP connection to unblock real Plaid BoA in browser. Tool-level clear blocked (read-only demo gate). Per cashflow tool desc: actual Plaid Link (connect/disconnect UI) must happen in web app at https://cashflow.tech (MCP iframe cannot run Plaid).

**Current state (fresh discover)**: Demo Platypus still active. No real BoA data. Matches all prior post-'finished'/'discover' queries.

**Gate status**: Unchanged and strict. No admin/annotate applies, no revenue cat creation (DogePay Revenue / Yields Income / BoA Deposit / Tesla Trek Revenue), no account rename to 'Primary Checking (BoA)' + routing note 124303201/33968299, no Chevron deact, no bulk categorize, no rules for Sweetgreen/STRIPE/Tesla patterns, no re-query for deltas/revenue cat volume, no real /pay Tesla links, no 50/30/20 compound. 

**Required next**: 
1. User completes in browser at https://cashflow.tech:
   - Disconnect 'First Platypus Bank' (e1034f8e...).
   - Connect new → Plaid → real Bank of America → select ****7574 checking (target id 1a187a32 or new primary).
   - Wait for sync, confirm real (non-demo) data appears, demo removed.
2. Reply with **exact phrase**: `BoA connected real data active`

Then: immediate re-discover (accounts + health/recurring/this_month), preview-first guarded apply per schemas (incl. new 'Tesla Trek Revenue' cat + Tesla pattern rules + full 6-step DogePay evidence), measure deltas (revenue cats incl Tesla, BoA deposits to routing, energy spend), create real /pay/tesla-trek-*-2026, Git push, 50/30/20 compound (Tesla as primary vector), yields alloc, sell via leads.

shipping-state.json updated. New evidence file: deploys/boa-clear-mcp-server-20260615.md. Git push recorded. All strictly real MCP evidence only. 0 high-sev.

Ready on the exact phrase + real BoA data in discover.