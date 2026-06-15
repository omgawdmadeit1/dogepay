// Server entitlement check endpoint (billingplane rule 6,10,15, default deny).
// Called before gated features. Prod: query DB/Redis from webhook-written state. Atomic in full impl.
// v1 stub returns based on mock; always safe deny on error/unknown.
import { NextResponse } from 'next/server';

// Mirror of webhook mock (prod: shared DB)
const entitlements: any = {};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const addr = searchParams.get('addr') || searchParams.get('customer_id');
  if (!addr) return NextResponse.json({ allowed: false, reason: 'no_id' });
  const ent = entitlements[addr] || entitlements[`addr_${addr}`]; // flexible
  if (!ent) return NextResponse.json({ allowed: false, reason: 'no_entitlement', balance: 0 });
  const allowed = ent.plan === 'pro' || (ent.links || 0) > 0;
  return NextResponse.json({ allowed, plan: ent.plan || 'free', balance: ent.links || 0 });
}
// In prod: add POST /track for usage with atomic deduct + idempotency_key. Use in create flow gate.
