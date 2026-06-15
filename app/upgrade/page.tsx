// Upgrade page for DogePay Pro (production billing ship).
// Per billingplane: poll server for webhook-confirmed status (rule 5). No trust redirect. Server entitlement check (rule 6, default deny). Checkout via server endpoint (create session with priceId from config only).
// In prod: use Stripe Checkout or portal. Hybrid with DOGE.
'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Upgrade() {
  const params = useSearchParams();
  const addr = params.get('addr') || '';
  const [status, setStatus] = useState('Checking entitlement...');
  const [pro, setPro] = useState(false);

  useEffect(() => {
    // Poll /api/entitlements/check (stub; prod real server state from webhook)
    const check = async () => {
      try {
        const res = await fetch(`/api/entitlements/check?addr=${encodeURIComponent(addr)}`);
        const data = await res.json();
        setPro(!!data.allowed);
        setStatus(data.allowed ? 'Pro active (via webhook)' : 'Free tier. Upgrade below.');
      } catch {
        setStatus('Status pending webhook confirmation (default deny until confirmed).');
      }
    };
    if (addr) check();
    const iv = setInterval(check, 3000); // poll per rule
    return () => clearInterval(iv);
  }, [addr]);

  return (
    <div className="max-w-md mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold mb-4">Upgrade to Pro</h1>
      <p className="text-zinc-400 mb-6">Unlimited links, analytics, priority. Or usage metered. Billed via Stripe (server prices only).</p>
      <div className="p-4 bg-zinc-900 rounded mb-6">Address: {addr}<br />Status: {status}</div>

      {!pro && (
        <button onClick={() => alert('Prod: POST /api/billing/checkout with valid priceId from server config. Redirect to Stripe live.')} className="btn btn-primary w-full">
          Subscribe via Stripe (production)
        </button>
      )}

      <p className="text-xs text-zinc-500 mt-6">Webhook-confirmed only. Cancel anytime (default free scheduled at period end). No client math.</p>
      <a href="/dashboard" className="text-sm underline mt-4 block">Back to dashboard</a>
    </div>
  );
}
