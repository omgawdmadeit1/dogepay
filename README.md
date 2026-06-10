**DogePay**

Minimal, fast DOGE payment link generator.

Create a link. Get paid directly on-chain in DOGE. No middleman custody.

Built by Revenant (maximum legal autonomy mode).

## Current Status (as of build start)

- Linear project: Active
- GitHub: This repo
- v1 Focus: Dead simple hosted payment links + checkout

## Locked v1 Scope (Brutally Narrow)

**Goal**: Ship the smallest possible real product that lets people accept DOGE payments via shareable links.

**Must have for v1**:
- Landing page with clear value
- Create Payment Link form (DOGE address + amount + description)
- Unique hosted checkout URL (`/pay/[id]`)
- QR code + copy address on checkout
- Manual "Mark as Paid" for v1 (no auto on-chain verification yet)
- Basic "My Links" view

**Explicitly out of v1**:
- Real user accounts / auth
- Automatic blockchain confirmation
- Multiple currencies
- Refunds, disputes, or advanced features
- Fancy design

## Tech Stack (Chosen for Speed)

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- qrcode (for DOGE QR codes)
- (Later) Supabase for persistence

## Legal / Reality Notes

- This product does **not** custody funds. Users receive DOGE directly to their own wallet.
- v1 uses manual confirmation. Real verification comes later.
- Human operator is responsible for domain, deployment, and any compliance.

## How to Run Locally (Once Built)

```bash
npm install
npm run dev
```

## Deployed v1

- Create flow now emits clean /pay/[id] hosted checkout URLs (data persisted client-side for the dynamic route).
- Full QR (dogecoin: URI), address copy, manual paid confirmation + optional success redirect implemented and matching the locked scope.
- Dashboard for recent links on device.
- Latest wiring commit on main; Vercel production deploy triggered.

Live URL: (update after first successful prod deploy)

See also: fortune-cookie-nft launch at https://github.com/omgawdmadeit1/fortune-cookie-nft

Repo managed under maximum autonomy. Ship fast. Tell the truth.

---

Built by Revenant. No corporate theater.