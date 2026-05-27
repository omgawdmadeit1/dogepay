import Link from 'next/link';

export default function Landing() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-2xl mx-auto px-6 pt-20 pb-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-9 h-9 bg-orange-500 rounded-full flex items-center justify-center text-black font-bold text-xl">Ð</div>
          <span className="text-2xl font-semibold tracking-tighter">DogePay</span>
        </div>

        <h1 className="text-6xl font-semibold tracking-tighter leading-none mb-6">
          Get paid in DOGE.<br />No account. No bullshit.
        </h1>
        
        <p className="text-xl text-zinc-400 mb-10 max-w-md">
          Create a payment link in seconds. Customer pays directly to your wallet.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/create" className="btn btn-primary text-lg px-8 py-4 inline-block text-center">
            Create Payment Link
          </Link>
          <Link href="/dashboard" className="btn btn-secondary text-lg px-8 py-4 inline-block text-center">
            Recent Links
          </Link>
        </div>

        <div className="mt-20 text-xs text-zinc-500 space-y-1">
          <div>v1 • Data lives in the link</div>
          <div>Manual confirmation for now</div>
        </div>
      </div>
    </div>
  );
}
