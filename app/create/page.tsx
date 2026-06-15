'use client';

import { useState } from 'react';

// Generate a short unique id for /pay/[id] style links (v1)
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

// Create clean /pay/[id] link + persist data under that id for the checkout
function createPaymentLink(data: {
  address: string;
  amount: string;
  description: string;
  successUrl?: string;
}) {
  const id = generateId();
  const payload = { ...data, id, createdAt: new Date().toISOString() };

  // Persist for the hosted /pay/[id] checkout (used by the dynamic route)
  try {
    localStorage.setItem(`dogepay_${id}`, JSON.stringify(payload));
  } catch {}

  // Also keep lightweight recent list (for dashboard)
  const recent = JSON.parse(localStorage.getItem('dogepay_recent') || '[]');
  recent.unshift({
    ...data,
    id,
    createdAt: payload.createdAt,
    link: `${window.location.origin}/pay/${id}`,
  });
  try {
    localStorage.setItem('dogepay_recent', JSON.stringify(recent.slice(0, 20)));
  } catch {}

  return `${window.location.origin}/pay/${id}`;
}

export default function CreateLink() {
  const [form, setForm] = useState({
    address: '',
    amount: '',
    description: '',
    successUrl: '',
  });
  const [link, setLink] = useState<string | null>(null);
  const [createdId, setCreatedId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const paymentLink = createPaymentLink(form);
    // Extract id from the generated link for display
    const id = paymentLink.split('/pay/')[1] || null;
    setLink(paymentLink);
    setCreatedId(id);
  };

  return (
    <div className="max-w-lg mx-auto px-6 py-12">
      <div className="mb-8">
        <div className="text-orange-500 text-sm tracking-[2px] mb-1">FASTEST PATH</div>
        <h1 className="text-3xl font-semibold tracking-tight">Create DOGE Payment Link</h1>
        <p className="text-zinc-400 mt-2 text-sm">Data lives in the link. No account needed. v1 manual confirmation. MyDoge + Cyberbeast Fund links supported (real deposits).</p>
      </div>

      {!link ? (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm mb-1.5 text-zinc-400">Your DOGE Address</label>
            <input 
              type="text" 
              className="input" 
              placeholder="D..."
              value={form.address}
              onChange={(e) => setForm({...form, address: e.target.value})}
              required 
            />
          </div>

          <div>
            <label className="block text-sm mb-1.5 text-zinc-400">Amount (DOGE)</label>
            <input 
              type="number" step="0.01" className="input" placeholder="10"
              value={form.amount}
              onChange={(e) => setForm({...form, amount: e.target.value})}
              required 
            />
          </div>

          <div>
            <label className="block text-sm mb-1.5 text-zinc-400">What is this for?</label>
            <input 
              type="text" className="input" placeholder="Consulting / Digital product / Donation / Cyberbeast Fund"
              value={form.description}
              onChange={(e) => setForm({...form, description: e.target.value})}
              required 
            />
          </div>

          <div>
            <label className="block text-sm mb-1.5 text-zinc-400">Success Redirect (optional)</label>
            <input 
              type="url" className="input" placeholder="https://yoursite.com/thanks"
              value={form.successUrl}
              onChange={(e) => setForm({...form, successUrl: e.target.value})}
            />
          </div>

          <button type="submit" className="btn btn-primary w-full text-lg py-4 mt-2">
            Create Payment Link
          </button>
        </form>
      ) : (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
          <div className="text-green-400 text-sm mb-3">LINK READY — COPY &amp; SHARE</div>
          
          <div className="font-mono text-sm break-all bg-black p-4 rounded-xl mb-6 border border-zinc-800">
            {link}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => { if (link) { navigator.clipboard.writeText(link); alert('Link copied!'); } }}
              className="btn btn-primary"
            >
              Copy Link
            </button>
            
            <a href={link} target="_blank" className="btn btn-secondary text-center">
              Preview Checkout
            </a>
          </div>

          <div className="mt-4 text-xs text-zinc-500">
            Unique checkout at /pay/{createdId || 'id'}. MyDoge users: scan in app. Cyberbeast Fund links auto-hybrid tagged.
          </div>

          <button 
            onClick={() => {setLink(null); setCreatedId(null); setForm({address:'', amount:'', description:'', successUrl:''});}}
            className="text-xs text-zinc-500 hover:text-white mt-6 w-full"
          >
            Create another
          </button>
        </div>
      )}
    </div>
  );
}
