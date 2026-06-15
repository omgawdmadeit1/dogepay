**cashflow__admin disconnect attempt (user explicit request) - 2026-06-15**

Call executed:
```
use_tool cashflow__admin
{
  "entity": "bank_connection",
  "action": "disconnect",
  "id": "e1034f8e-c36b-464d-b876-fdcec16baa49"
}
```

**Result**: Failed to call admin: Demo account is read-only

**Post-attempt verification** (cashflow__accounts):
- Still exactly one connection: id=`e1034f8e-c36b-464d-b876-fdcec16baa49` "First Platypus Bank" (demo).
- Account: id=`1a187a32-cf4a-43d0-b0f4-524c6c5a45d3` Checking ****7574 active.
- No change. Demo read-only BLOCK intact (matches every prior admin/annotate attempt and the documented gate).

**Implication**: MCP admin path for disconnect is blocked on this Platypus demo (e1034f8e). Per cashflow tool docs and prior states, full Plaid item revocation + clean state for real connect requires the browser UI (Plaid Link cannot run in MCP/iframe).

**Required user action**:
1. Go to https://cashflow.tech in browser.
2. In accounts dashboard: Disconnect "First Platypus Bank" (e1034f8e...).
3. Immediately: Connect new → Plaid → Bank of America (real login) → select ****7574 checking (target 1a187a32 or new primary).
4. Wait for real sync + real transactions visible.
5. Reply **exactly**: `BoA connected real data active`

**Gate status**: Still active. No routing payloads, no Tesla Trek Revenue cat apply, no re-apply, no revenue cat deltas, no /pay creation, no compound execution until the exact phrase.

shipping-state.json updated with this attempt + failure + browser reminder. All real MCP evidence only. 0 high-sev.

Next (on phrase): fresh re-queries + preview-first guarded apply (incl. new Tesla Trek Revenue cat + Tesla pattern rules + rename to Primary Checking (BoA) + routing 124303201/33968299 + Chevron deact + empties/BNPL tidy) + measure + 50/30/20 compound.