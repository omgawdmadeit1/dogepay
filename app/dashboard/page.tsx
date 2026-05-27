'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const [links, setLinks] = useState<any[]>([]);

  useEffect(() => {
    const allLinks: any[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('dogepay_')) {
        allLinks.push(JSON.parse(localStorage.getItem(key)!));
      }
    }
    setLinks(allLinks.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight mb-8">Your Payment Links</h1>

      {links.length === 0 ? (
        <div className="text-zinc-400">
          No links yet. <Link href="/create" className="text-orange-400 underline">Create one</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {links.map((link) => (
            <div key={link.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <div className="font-medium mb-1">{link.description}</div>
              <div className="text-orange-400 text-sm mb-3">{link.amount} DOGE</div>
              
              <a 
                href={`/pay/${link.id}`} 
                target="_blank"
                className="text-sm underline break-all"
              >
                {window.location.origin}/pay/{link.id}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
