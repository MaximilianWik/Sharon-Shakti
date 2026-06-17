import { kv } from "@vercel/kv";

// ---------------------------------------------------------------------------
// Schema
// Key: gc:<code>  (12-char alphanumeric)
// ---------------------------------------------------------------------------

export interface GiftCardRecord {
  code: string;
  amountSEK: number;
  buyerEmail: string;
  recipientName: string;
  message: string;
  createdAt: string; // ISO 8601
  redeemed: boolean;
  redeemedAt?: string; // ISO 8601
}

// ---------------------------------------------------------------------------
// Code generation — avoids visually ambiguous chars (0 O I 1)
// ---------------------------------------------------------------------------

export function generateGiftCardCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from(
    { length: 12 },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("");
}

// ---------------------------------------------------------------------------
// CRUD
// ---------------------------------------------------------------------------

export async function storeGiftCard(record: GiftCardRecord): Promise<void> {
  await kv.set(`gc:${record.code}`, record);
}

export async function getGiftCard(code: string): Promise<GiftCardRecord | null> {
  const record = await kv.get<GiftCardRecord>(`gc:${code.toUpperCase()}`);
  return record ?? null;
}

export async function redeemGiftCard(
  code: string
): Promise<GiftCardRecord | null> {
  const record = await getGiftCard(code);
  if (!record) return null;
  const updated: GiftCardRecord = {
    ...record,
    redeemed: true,
    redeemedAt: new Date().toISOString(),
  };
  await kv.set(`gc:${record.code}`, updated);
  return updated;
}
