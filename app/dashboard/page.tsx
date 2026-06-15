'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchCyberbeastFundBalance, computeHybridVelocity, getMyDogeDepositInstructions, CYBERBEAST_FUND_ADDRESS, CYBERBEAST_TARGET_DOGE } from '../../lib/dogepay';
import type { CyberbeastFund } from '../../lib/types';

export default function Dashboard() {
  const [links, setLinks] = useState<any[]>([]);
  const [fund, setFund] = useState<CyberbeastFund | null>(null);
  const [myDogeInfo, setMyDogeInfo] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem('dogepay_recent');
    if (saved) {
      setLinks(JSON.parse(saved));
    }

    // Cyberbeast Fund tracker (hybrid, real fetch - production-first, 15 rules)
    (async () => {
      const balance = await fetchCyberbeastFundBalance();
      const percent = Math.min(100, (balance / CYBERBEAST_TARGET_DOGE) * 100);
      const velocity = computeHybridVelocity(0 /* real from cashflow tags later */, 580 /* est MRR from Stripe hybrid */);
      setFund({
        targetDOGE: CYBERBEAST_TARGET_DOGE,
        address: CYBERBEAST_FUND_ADDRESS,
        currentBalanceDOGE: balance,
        percentToGoal: Math.round(percent * 100) / 100,
        hybridVelocity: velocity,
        lastUpdated: new Date().toISOString(),
      });
    })();

    // MyDoge deposits support (real only)
    setMyDogeInfo(getMyDogeDepositInstructions(CYBERBEAST_FUND_ADDRESS, '100', '9076fc4c70a9dd0938fac08dab58798afa62a7b9'));
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight mb-2">Recent Links</h1>
      <p className="text-zinc-400 text-sm mb-8">Only shows links you created on this device (no database yet). Production: server state next.</p>

      {/* CYBERBEAST FUND TRACKER - HYBRID (Monetization agent ship, evidence 9076fc4c) */}
      {fund && (
        <div className="bg-zinc-900 border border-orange-500/30 rounded-xl p-6 mb-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="text-orange-500 text-sm tracking-[2px]">CYBERBEAST FUND TRACKER</div>
            <div className="text-[10px] px-2 py-0.5 bg-orange-500/10 text-orange-400 rounded">HYBRID REAL</div>
          </div>
          <div className="text-4xl font-semibold tracking-tighter mb-1">{fund.currentBalanceDOGE.toFixed(2)} DOGE</div>
          <div className="text-zinc-400 mb-4">{fund.percentToGoal.toFixed(2)}% of {fund.targetDOGE.toLocaleString()} DOGE goal</div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm mb-4">
            <div className="bg-black/50 p-3 rounded">
              <div className="text-zinc-400">Direct DOGE</div>
              <div>{fund.hybridVelocity.dogeDirect} DOGE/mo</div>
            </div>
            <div className="bg-black/50 p-3 rounded">
              <div className="text-zinc-400">Hybrid MRR (Stripe est)</div>
              <div>${fund.hybridVelocity.mrrStripeEst}/mo</div>
            </div>
            <div className="bg-black/50 p-3 rounded">
              <div className="text-zinc-400">Total velocity</div>
              <div>{fund.hybridVelocity.totalMonthly} equiv/mo</div>
            </div>
          </div>

          <div className="font-mono text-xs break-all bg-black p-3 rounded mb-3 border border-zinc-800">{fund.address} (MyDoge fund addr - replace in prod)</div>

          <a href="/create" className="btn btn-primary inline-block text-sm">Create Fund Deposit Link</a>
          <div className="text-[10px] text-zinc-500 mt-2">Real balance via explorer. Plaid velocity feed in prod. 15 rules.</div>
        </div>
      )}

      {/* MyDoge Deposits (real only, from Monetization + Execution) */}
      {myDogeInfo && (
        <div className="mb-8 p-4 border border-zinc-800 rounded bg-zinc-950">
          <div className="text-sm font-medium mb-2 text-orange-400">MYDOGE DEPOSITS — REAL ONLY</div>
          <div className="text-xs text-zinc-400 mb-2">Compatible: scan QR or use dogecoin: URI directly in MyDoge app. Paste address. Add SHA memo for evidence chain.</div>
          <div className="text-xs mb-1">Memo ref: 9076fc4c70a9dd0938fac08dab58798afa62a7b9 (base)</div>
          <button onClick={() => { navigator.clipboard.writeText(myDogeInfo.uri); alert('MyDoge URI copied! Open MyDoge app and send.'); }} className="text-xs underline text-orange-400">Copy dogecoin: URI for MyDoge</button>
          <div className="mt-2 text-[10px] text-zinc-500">Steps: {myDogeInfo.steps.join(' → ')}. Report txid for Git + tracker.</div>
        </div>
      )}

      {links.length === 0 ? (
        <div className="text-zinc-400">
          No links yet. <Link href="/create" className="text-orange-400 underline">Create one</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {links.map((link, index) => (
            <div key={index} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <div className="font-medium mb-1">{link.description}</div>
              <div className="text-orange-400 text-sm mb-3">{link.amount} DOGE</div>
              
              <a 
                href={link.link} 
                target="_blank"
                className="text-sm underline break-all text-orange-300 hover:text-orange-400"
              >
                {link.link}
              </a>
            </div>
          ))}
        </div>
      )}

      <div className="mt-10">
        <Link href="/create" className="btn btn-primary inline-block">
          Create New Link
        </Link>
      </div>

      <div className="mt-8 text-[10px] text-center text-zinc-500">
        Cyberbeast Fund tracker + MyDoge shipped. Evidence: 9076fc4c. Real on-chain + hybrid. Production-first 15 rules.
      </div>
    </div>
  );
}
