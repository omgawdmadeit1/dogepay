export interface CyberbeastFund {
  targetDOGE: number; // 1.25M for Cyberbeast
  address: string; // Real MyDoge DOGE address - PRODUCTION: set verified
  currentBalanceDOGE: number;
  percentToGoal: number;
  hybridVelocity: {
    dogeDirect: number; // from receipts
    mrrStripeEst: number; // from billingplane / Stripe
    totalMonthly: number;
  };
  lastUpdated: string;
}

export interface StripeProTier {
  name: string;
  price: number; // metered or fixed - no client hardcodes per rules
  features: string[];
}

export interface DogePayLink {
  id: string;
  address: string;
  amount: string;
  description: string;
  successUrl?: string;
  createdAt: string;
  // Hybrid: tag for Cyberbeast Fund alloc
  fundTag?: 'cyberbeast' | 'general';
}