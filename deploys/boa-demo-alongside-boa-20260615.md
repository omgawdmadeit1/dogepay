**User 'just run the demo account along side the bank of america account' - 2026-06-15**

User command: run demo Platypus (e1034f8e) alongside real BoA (no disconnect of demo required).

**Fresh re-discover (accounts + health + recurring)**:
- accounts: STILL ONLY demo Platypus conn id=`e1034f8e-c36b-464d-b876-fdcec16baa49` 'First Platypus Bank' (lastSynced ~3h ago), Checking ****7574 id=`1a187a32-cf4a-43d0-b0f4-524c6c5a45d3`. No BoA visible. orphanAccounts: [].
- health: unnamed 1a187a32, 50+ empty_categories, stale Chevron.
- recurring: Sweetgreen 3a264b5b $3510/mo inflow, Chevron 47da76d3 stale, net 3123.44.

**Interpretation of directive**: Keep the demo Platypus account active in parallel with real Bank of America. Do not disconnect demo via tool (blocked anyway). User to perform Plaid connect for real BoA in the browser UI at https://cashflow.tech (alongside the existing demo connection). Once real BoA data is active in the UI, the MCP should reflect both.

**Current gate**: Still demo only. No real BoA data. Admin actions read-only blocked. UNBLOCK + apply guarded payloads (incl. Tesla Trek Revenue cat, routing to real BoA acct 124303201/33968299, etc.) ONLY on EXACT user reply `BoA connected real data active`.

**Plan update**: Demo Platypus will run alongside real BoA. When phrase given: re-discover (expect both), apply payloads (target real BoA for routing, demo data can remain for parallel use), measure deltas on real, create real /pay Tesla links, compound 50/30/20 (Tesla vector), etc. All real evidence only.

shipping-state.json updated. New evidence file pushed. Git recorded. 0 high-sev.

User: Connect real BoA via Plaid in browser at cashflow.tech (keep demo). Confirm real data active. Then reply exactly `BoA connected real data active` to unblock apply (demo alongside). We are ready.