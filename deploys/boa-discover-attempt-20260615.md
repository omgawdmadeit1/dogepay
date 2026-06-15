**User 'try now with discover' - 2026-06-15**

After user 'finished' signal, explicit request to 'try now with discover'.

**Action taken**: Called cashflow__accounts (the 'discover' / dashboard widget for connected banks) + cashflow__query health, and cashflow__admin {entity:'bank_connection', action:'list'}.

**Discover results (cashflow__accounts)**:
{
  "items": [{
    "id": "e1034f8e-c36b-464d-b876-fdcec16baa49",
    "institution": "First Platypus Bank",
    "lastSyncedAt": "2026-06-15T04:00:52.580Z",
    "lastSyncedRelative": "about 3 hours ago",
    "accounts": [{
      "id": "1a187a32-cf4a-43d0-b0f4-524c6c5a45d3",
      "name": "Checking",
      "type": "checking",
      "mask": "7574",
      "active": true
    }]
  }],
  "orphanAccounts": [],
  "webBaseUrl": "https://cashflow.tech"
}

No Bank of America. Still demo only.

**Admin list bank_connection**: Failed "Demo account is read-only" (full admin blocked on demo).

**Health query**: Same unnamed account, 50+ empty_categories, stale Chevron.

**Conclusion**: The browser UI steps the user performed (or is performing) at https://cashflow.tech for disconnect demo Platypus + Plaid real BoA connect (target ****7574) have not yet updated the backend/MCP data. Demo connection e1034f8e remains active. Real BoA not discovered/connected in the system yet.

**Gate status**: Fully enforced. No routing payloads applied (no cats including Tesla Trek Revenue, no rename to Primary Checking (BoA) with 124303201/33968299, no Chevron deact, no annotate, no rules for Sweetgreen/STRIPE/Tesla). No re-queries for deltas or revenue cat volume. Awaiting **exact** user confirmation phrase after successful browser Plaid real BoA connect and sync: `BoA connected real data active`

Then: immediate re-discover, preview-first apply of guarded payloads (per routing-plan.md and Tesla playbook), measure (revenue cats, BoA deposits, energy spend), create real /pay Tesla links, Git updates, 50/30/20 compound (Tesla as vector), etc.

shipping-state.json updated with this discover attempt + results. All real MCP evidence only. 0 high-sev.

User: Please ensure the full disconnect + real BoA Plaid connect is completed in the cashflow.tech browser UI (Plaid Link flow), wait for sync to show real BoA data and the demo removed, then reply with the exact phrase above.