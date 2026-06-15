// lib/dogepay.ts - DogePay helpers (production-first, real only per 15 rules)
// No client prices, default deny, no custody. Real on-chain for tracker.

export const CYBERBEAST_FUND_ADDRESS = 'DREPLACE_WITH_REAL_MYDOGE_DOGE_ADDR'; // e.g. from @OmgawdMadeit MyDoge. Real verified address only.

export const CYBERBEAST_TARGET_DOGE = 1250000; // 1.25M DOGE for Cyberbeast

// Generate fund-specific pay link (hybrid: direct DOGE to fund addr)
export function generateCyberbeastFundDogePayLink(amountDOGE: string, description = 'Cyberbeast Fund deposit') {
  // v1: uses create flow; prod: server generate + persist
  const id = 'cyberbeast-' + Date.now().toString(36);
  // In real: POST /api/create-link with fundTag: 'cyberbeast'
  return {
    id,
    link: `/pay/${id}`,
    address: CYBERBEAST_FUND_ADDRESS,
    amount: amountDOGE,
    description,
    fundTag: 'cyberbeast' as const,
  };
}

// Hybrid velocity compute (MRR from Stripe + direct DOGE tagged from cashflow Plaid)
export function computeHybridVelocity(dogeReceipts30d: number, mrrEst: number) {
  return {
    dogeDirect: dogeReceipts30d,
    mrrStripeEst: mrrEst,
    totalMonthly: dogeReceipts30d + mrrEst, // DOGE + USD equiv; convert via price feed in prod
  };
}

// Real balance fetch for tracker (public explorer, client transitional - move to /api in prod per rules)
export async function fetchCyberbeastFundBalance(address = CYBERBEAST_FUND_ADDRESS): Promise<number> {
  if (!address || address.includes('REPLACE')) return 0;
  try {
    // Blockcypher DOGE (real, no key for basic balance)
    const res = await fetch(`https://api.blockcypher.com/v1/doge/main/addrs/${address}/balance`);
    if (!res.ok) throw new Error('Explorer error');
    const data = await res.json();
    return (data.balance || 0) / 1e8; // sat to DOGE
  } catch (e) {
    console.warn('Real fetch failed (use server in prod):', e);
    return 0; // Real only: 0 on fail, no mock
  }
}

// MyDoge deposit helper: returns instructions + URI for MyDoge app (real deposits)
export function getMyDogeDepositInstructions(address: string, amount: string, memoSha: string) {
  const uri = `dogecoin:${address}?amount=${amount}`;
  return {
    uri,
    memo: `CYBERBEAST OR DONT EAT LFG deposit ${amount} DOGE. Git evidence: ${memoSha}. Real only. MyDoge scan or paste.`,
    steps: [
      'Open MyDoge app (real wallet)',
      'Send or Scan QR/URI',
      'Paste address or use dogecoin: link from DogePay',
      'Add memo/SHA for evidence',
      'Report txid for Git append + tracker update',
    ],
  };
}