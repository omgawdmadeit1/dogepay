'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const [links, setLinks] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('dogepay_recent');
    if (saved) {
      setLinks(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight mb-2">Recent Links</h1>
      <p className="text-zinc-400 text-sm mb-8">Only shows links you created on this device (no database yet)</p>

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
    </div>
  );
}
