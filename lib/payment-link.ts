export type PaymentLinkPayload = {
  address: string;
  amount: string;
  description: string;
  successUrl?: string;
};

/**
 * Checkout payload must live in the URL. localStorage is origin-private, so a
 * /pay/[id] link that only stores data on the creator's device never loads
 * for the payer.
 */
export function buildShareablePaymentPath(
  data: PaymentLinkPayload,
  id?: string,
): string {
  const params = new URLSearchParams();
  params.set("addr", data.address.trim());
  params.set("amt", String(data.amount).trim());
  params.set("desc", data.description);
  const success = data.successUrl?.trim();
  if (success) params.set("success", success);
  const base = id ? `/pay/${encodeURIComponent(id)}` : "/pay";
  return `${base}?${params.toString()}`;
}

export function paymentFromSearchParams(
  params: Pick<URLSearchParams, "get">,
): PaymentLinkPayload | null {
  const address = params.get("addr")?.trim() ?? "";
  const amount = params.get("amt")?.trim() ?? "";
  const description = params.get("desc") ?? "";
  if (!address || !amount || !description) return null;
  const successUrl = params.get("success")?.trim();
  return {
    address,
    amount,
    description,
    ...(successUrl ? { successUrl } : {}),
  };
}
