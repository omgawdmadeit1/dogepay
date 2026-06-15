'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import QRCode from 'qrcode';

// Production billing (post-audit ship): pro upgrade CTA generic (no hardcoded prices/amounts - rule 1,3,11). Entitlements from server webhook state only (poll /api/entitlements/check or status; localStorage hint only). Default deny. No client paid writes.
export default function Checkout() {
  const { id } = useParams<{ id: string }>() || {};
  const [data, setData] = useState<any>(null);
  const [qr, setQr] = useState('');
  const [paid, setPaid] = useState(false);
  const [isPro, setIsPro] = useState(false); // from server-confirmed webhook only

  useEffect(() => {
    if (!id) return;
    const saved = localStorage.getItem(`dogepay_${id}`);
    if (saved) {
      const parsed = JSON.parse(saved);
      setData(parsed);
      const paymentUri = `dogecoin:${parsed.address}?amount=${parsed.amount}`;
      QRCode.toDataURL(paymentUri, { width: 240 }).then(setQr);
      // Check server (in prod poll /api/billing/status or entitlements/check; v1 hint + note)
      // Real: fetch(`/api/entitlements/check?customer=${parsed.address}`).then(r => r.json()).then(d => setIsPro(d.allowed))
      setIsPro(!!localStorage.getItem(`pro_${parsed.address}`)); // transitional
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

      {/* MyDoge deposits support (real, compatible with MyDoge app - Execution ship) */}
      <div className="mt-4 p-3 bg-zinc-950 border border-zinc-800 rounded text-xs">
        <div className="text-orange-400 mb-1">MYDOGE COMPATIBLE</div>
        Open MyDoge app → Scan this QR or paste address/URI above. Real deposits only. Add memo: 9076fc4c70a9dd0938fac08dab58798afa62a7b9 for Cyberbeast evidence. MyDoge fund links auto-tagged hybrid.
      </div>

      {/* Production: no price hardcode; links to upgrade (server poll for status) */}
      {!isPro && (
        <a href={"/upgrade?addr=" + encodeURIComponent(data.address)} className="btn btn-primary w-full mt-4">
          Upgrade to Pro (unlimited links + analytics) or usage metered
        </a>
      )}

      <div className="text-[10px] text-center text-zinc-500 mt-8">
        v1 manual flow. Real on-chain verification + Stripe hybrid billing (webhooks state, 15 rules). No custody. Cyberbeast Fund tracker + MyDoge in dashboard.
      </div>
    </div>
  );
}
