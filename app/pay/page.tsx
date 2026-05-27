'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import QRCode from 'qrcode';

export default function PayPage() {
  const searchParams = useSearchParams();
  const [data, setData] = useState<any>(null);
  const [qr, setQr] = useState('');
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    const addr = searchParams.get('addr');
    const amt = searchParams.get('amt');
    const desc = searchParams.get('desc');
    const success = searchParams.get('success');

    if (addr && amt && desc) {
      const paymentData = {
        address: addr,
        amount: amt,
        description: desc,
        successUrl: success || null,
      };
      setData(paymentData);

      // Generate DOGE URI for QR
      const uri = `dogecoin:${addr}?amount=${amt}`;
      QRCode.toDataURL(uri, { width: 260, margin: 1 }).then(setQr);
    }
  }, [searchParams]);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <div className="text-2xl mb-2">Invalid payment link</div>
          <p className="text-zinc-400">This link is missing information.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-6 py-12">
      <div className="text-center mb-8">
        <div className="text-orange-500 text-xs tracking-[3px] mb-2">PAY WITH DOGE</div>
        <div className="text-5xl font-semibold tracking-tighter mb-1">{data.amount} DOGE</div>
        <div className="text-lg text-zinc-300">{data.description}</div>
      </div>

      {qr && (
        <div className="flex justify-center mb-8">
          <img src={qr} alt="Scan with Dogecoin wallet" className="rounded-2xl border border-zinc-800" />
        </div>
      )}

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 mb-6">
        <div className="text-[10px] text-zinc-500 mb-2">SEND TO THIS ADDRESS</div>
        <div className="font-mono text-sm break-all leading-snug">
          {data.address}
        </div>
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
            className="btn btn-primary w-full py-4 text-lg"
          >
            I sent the payment
          </button>
        ) : (
          <div className="text-center py-5 bg-zinc-900 rounded-2xl border border-green-900/50">
            <div className="text-green-400 font-medium mb-1">Payment marked as sent</div>
            <div className="text-xs text-zinc-400">Thank you. The recipient will check their wallet.</div>
            
            {data.successUrl && (
              <a href={data.successUrl} className="inline-block mt-4 text-sm underline">
                Return to site
              </a>
            )}
          </div>
        )}
      </div>

      <div className="text-center mt-8 text-[10px] text-zinc-500">
        Manual confirmation • v1
      </div>
    </div>
  );
}
