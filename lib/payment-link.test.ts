import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  buildShareablePaymentPath,
  paymentFromSearchParams,
} from "./payment-link.ts";

describe("buildShareablePaymentPath", () => {
  it("puts address, amount, and description in the query string", () => {
    const path = buildShareablePaymentPath(
      {
        address: "D7nhs8FVsdVAKXcPz1vcufcQeNtSBdYgpS",
        amount: "10.5",
        description: "Consulting",
      },
      "abc123",
    );
    assert.match(path, /^\/pay\/abc123\?/);
    const q = new URLSearchParams(path.split("?")[1]);
    assert.equal(q.get("addr"), "D7nhs8FVsdVAKXcPz1vcufcQeNtSBdYgpS");
    assert.equal(q.get("amt"), "10.5");
    assert.equal(q.get("desc"), "Consulting");
    assert.equal(q.get("success"), null);
  });

  it("round-trips through paymentFromSearchParams for a payer on another device", () => {
    const path = buildShareablePaymentPath({
      address: "Dabc",
      amount: "3",
      description: "Donation",
      successUrl: "https://example.com/thanks",
    });
    const q = new URLSearchParams(path.split("?")[1]);
    assert.deepEqual(paymentFromSearchParams(q), {
      address: "Dabc",
      amount: "3",
      description: "Donation",
      successUrl: "https://example.com/thanks",
    });
  });
});
