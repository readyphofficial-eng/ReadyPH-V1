import { lsGet, lsSet, getShopItems } from './storage';

export interface Product {
  id: string;
  logo: string;
  logoImg: string;
  title: string;
  desc: string;
  subDesc: string;
  link: string;
  price: number | null;
}

export interface CartLine {
  id: string;
  qty: number;
}

export interface OrderRecord {
  id: string;
  date: string;
  total: number;
  name: string;
  address: string;
  payment: string;
  lines: { id: string; title: string; qty: number; price: number }[];
}

export const MAX_QTY = 99;

export const SAMPLE_PRODUCTS: Product[] = [
  { id: 'sample-workbook', logo: '📘', logoImg: '', title: 'Math Workbook', desc: 'Fun practice pages for grades 1–3.', subDesc: 'Bestseller', link: '', price: 149 },
  { id: 'sample-crayons', logo: '🖍️', logoImg: '', title: 'Jumbo Crayons (24)', desc: 'Bright, non-toxic crayons for little hands.', subDesc: 'Art', link: '', price: 89 },
  { id: 'sample-flashcards', logo: '🃏', logoImg: '', title: 'ABC Flash Cards', desc: 'Learn letters and words with pictures.', subDesc: 'Kinder', link: '', price: 120 },
  { id: 'sample-backpack', logo: '🎒', logoImg: '', title: 'Ready PH Backpack', desc: 'Lightweight and roomy school bag.', subDesc: 'New', link: '', price: 599 },
  { id: 'sample-tumbler', logo: '🥤', logoImg: '', title: 'Kids Tumbler', desc: 'Spill-proof 500ml water bottle.', subDesc: '', link: '', price: 199 },
  { id: 'sample-globe', logo: '🌏', logoImg: '', title: 'Mini World Globe', desc: 'Explore countries and oceans.', subDesc: 'Geography', link: '', price: 349 },
];

export function parsePrice(text: string): number | null {
  const m = text.match(/(?:₱|php|p)\s*(\d[\d,]*(?:\.\d+)?)/i);
  if (!m) return null;
  const n = parseFloat(m[1].replace(/,/g, ''));
  return Number.isFinite(n) ? n : null;
}

export function formatPrice(n: number): string {
  return `₱${n.toLocaleString('en-PH', { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 })}`;
}

export function getProducts(): Product[] {
  const items = getShopItems();
  if (items.length === 0) return SAMPLE_PRODUCTS;
  return items.map((s, i) => ({
    id: `shop-${i}-${s.title}`,
    logo: s.logo,
    logoImg: s.logoImg,
    title: s.title,
    desc: s.desc,
    subDesc: s.subDesc,
    link: s.link,
    price: parsePrice(`${s.subDesc} ${s.desc}`),
  }));
}

export function getCart(): CartLine[] {
  const raw = lsGet<CartLine[]>('shopCart', []);
  return Array.isArray(raw)
    ? raw.filter(l => l && typeof l.id === 'string' && Number.isInteger(l.qty) && l.qty > 0)
    : [];
}

export function saveCart(cart: CartLine[]): void {
  lsSet('shopCart', cart);
}

export function setQty(cart: CartLine[], id: string, qty: number): CartLine[] {
  const q = Math.min(MAX_QTY, Math.floor(qty));
  if (q <= 0) return cart.filter(l => l.id !== id);
  if (cart.some(l => l.id === id)) return cart.map(l => (l.id === id ? { ...l, qty: q } : l));
  return [...cart, { id, qty: q }];
}

export function cartCount(cart: CartLine[]): number {
  return cart.reduce((n, l) => n + l.qty, 0);
}

export function cartTotal(cart: CartLine[], products: Product[]): number {
  return cart.reduce((sum, l) => sum + (products.find(p => p.id === l.id)?.price ?? 0) * l.qty, 0);
}

export function getOrders(): OrderRecord[] {
  return lsGet<OrderRecord[]>('shopOrders', []);
}

export function saveOrder(order: OrderRecord): void {
  lsSet('shopOrders', [order, ...getOrders()].slice(0, 20));
}
