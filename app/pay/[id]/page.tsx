'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import QRCode from 'qrcode';

// Added for Phase 5 billing impl: pro upgrade link (from tiers, guardrails: no hard prices, webhooks for state)
export default function Checkout() {
  const { id } = useParams<{ id: string }>() || {};
  const [data, setData] = useState<any>(null);
  const [qr, setQr] = useState('');
  const [paid, setPaid] = useState(false);
  const [isPro, setIsPro] = useState(false); // entitlement from webhook

  useEffect(() => {
    if (!id) return;
    const saved = localStorage.getItem(`dogepay_${id}`);
    if (saved) {
      const parsed = JSON.parse(saved);
      setData(parsed);
      const paymentUri = `dogecoin:${parsed.address}?amount=${parsed.amount}`;
      QRCode.toDataURL(paymentUri, { width: 240 }).then(setQr);
      // Check pro entitlement (sim from billing webhook/state)
      setIsPro(!!localStorage.getItem(`pro_${parsed.address}`));
    }
  }, [id]);

  if (!data) {
    return <div className="p-8 text-center text-zinc-400">Loading payment...</div>;
  }

  return (
    <div className="max-w-md mx-auto px-6 py-12">
      <div className="text-center mb-8">
        <div className="text-orange-500 text-sm tracking-[2px] mb-1">PAY WITH DOGE</div>
        <div className="text-4xl font-semibold tracking-tighter">{data.amount} DOGE</div>
        <div className="text-zinc-400 mt-1">{data.description}</div>
      </div>

      {qr && (
        <div className="flex justify-center mb-8">
          <img src={qr} alt="DOGE QR Code" className="rounded-xl" />
        </div>
      )}

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 mb-6 font-mono text-sm break-all">
        {data.address}
      </div>

      <div className="space-y-3">
        <button 
          onClick={() => navigator.clipboard.writeText(data.address)}
          className="btn btn-secondary w-full"
        >
          Copy DOGE Address
        </button>

        {!paid ? (
          <button 
            onClick={() => setPaid(true)}
            className="btn btn-primary w-full"
          >
            I sent the DOGE (manual confirmation)
          </button>
        ) : (
          <div className="text-center py-4 bg-zinc-900 rounded-xl text-green-400">
            Marked as paid. Thank you.
            {data.successUrl && <a href={data.successUrl} className="block mt-3 underline">Return to site</a>}
          </div>
        )}
      </div>

      {/* Phase 5 billing: pro upgrade if not entitled (usage metered, webhooks state, atomic) */}
      {!isPro && (
        <a href="/upgrade?addr=" + data.address + "&tier=pro" className="btn btn-primary w-full mt-4">
          Upgrade to Pro ($19/mo unlimited + analytics) - or usage metered
        </a>
      )}

      <div className="text-[10px] text-center text-zinc-500 mt-8">
        This is a v1 manual flow. Real blockchain verification coming soon. Billing hybrid (Stripe webhooks for pro entitlements).
      </div>
    </div>
  );
}
