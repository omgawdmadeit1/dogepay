'use client';

import { useState } from 'react';

export default function CreateLink() {
  const [form, setForm] = useState({
    address: '',
    amount: '',
    description: '',
    successUrl: '',
  });
  const [link, setLink] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // v1: Generate simple ID (replace with real DB later)
    const id = Math.random().toString(36).substring(2, 12);
    const paymentLink = `${window.location.origin}/pay/${id}`;
    
    // TODO: Save to DB / localStorage
    localStorage.setItem(`dogepay_${id}`, JSON.stringify({
      ...form,
      id,
      createdAt: new Date().toISOString(),
    }));
    
    setLink(paymentLink);
  };

  return (
    <div className="max-w-lg mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight mb-8">Create DOGE Payment Link</h1>

      {!link ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm mb-2 text-zinc-400">Your DOGE Address</label>
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
            <label className="block text-sm mb-2 text-zinc-400">Amount (DOGE)</label>
            <input 
              type="number" 
              step="0.01" 
              className="input" 
              placeholder="10"
              value={form.amount}
              onChange={(e) => setForm({...form, amount: e.target.value})}
              required 
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-zinc-400">Description</label>
            <input 
              type="text" 
              className="input" 
              placeholder="Consulting fee / Digital product"
              value={form.description}
              onChange={(e) => setForm({...form, description: e.target.value})}
              required 
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-zinc-400">Success Redirect (optional)</label>
            <input 
              type="url" 
              className="input" 
              placeholder="https://yoursite.com/thanks"
              value={form.successUrl}
              onChange={(e) => setForm({...form, successUrl: e.target.value})}
            />
          </div>

          <button type="submit" className="btn btn-primary w-full text-lg py-4 mt-4">
            Create Payment Link
          </button>
        </form>
      ) : (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
          <div className="text-green-400 mb-2 text-sm font-medium">LINK CREATED</div>
          <div className="text-xl font-mono break-all mb-6">{link}</div>
          
          <a href={link} target="_blank" className="btn btn-primary block text-center mb-3">
            View Checkout Page
          </a>
          
          <button 
            onClick={() => {navigator.clipboard.writeText(link); alert('Copied!');}}
            className="btn btn-secondary w-full"
          >
            Copy Link
          </button>
        </div>
      )}
    </div>
  );
}
