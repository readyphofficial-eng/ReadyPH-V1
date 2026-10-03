import { useState, useEffect, useMemo } from 'react';
import { ShoppingBasket, ShoppingCart, Search, Plus, Minus, Trash2, ExternalLink, CheckCircle2 } from 'lucide-react';
import { Modal } from '@/components/Modal';
import { Confetti } from '@/components/Confetti';
import { PartnersRow } from '@/pages/MiscPages';
import { t } from '@/lib/i18n';
import {
  getProducts, getCart, saveCart, setQty, cartTotal, formatPrice, saveOrder, getOrders,
  type Product, type CartLine, type OrderRecord,
} from '@/lib/cart';

type View = 'cart' | 'checkout' | 'done' | null;

function ProductThumb({ p, size }: { p: Product; size: string }) {
  return (
    <div className={`${size} rounded-xl bg-gray-50 shadow-inner flex items-center justify-center overflow-hidden flex-shrink-0`}>
      {p.logoImg ? <img src={p.logoImg} alt={p.title} className="w-full h-full object-cover" /> : <span className="text-4xl">{p.logo || '🛒'}</span>}
    </div>
  );
}

function QtyStepper({ qty, onChange }: { qty: number; onChange: (q: number) => void }) {
  return (
    <div className="flex items-center gap-2 bg-gray-100 rounded-full px-1 py-0.5">
      <button aria-label="Decrease quantity" onClick={() => onChange(qty - 1)} className="w-7 h-7 rounded-full bg-white shadow flex items-center justify-center active:scale-90 transition"><Minus size={14} /></button>
      <span className="font-bold text-sm w-5 text-center">{qty}</span>
      <button aria-label="Increase quantity" onClick={() => onChange(qty + 1)} className="w-7 h-7 rounded-full bg-white shadow flex items-center justify-center active:scale-90 transition"><Plus size={14} /></button>
    </div>
  );
}

export function Shop() {
  const [products, setProducts] = useState<Product[]>(() => getProducts());
  const [cart, setCart] = useState<CartLine[]>(() => getCart());
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Product | null>(null);
  const [view, setView] = useState<View>(null);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [payment, setPayment] = useState('cod');
  const [error, setError] = useState('');
  const [confetti, setConfetti] = useState(0);
  const [order, setOrder] = useState<OrderRecord | null>(null);

  useEffect(() => {
    const handler = () => setProducts(getProducts());
    window.addEventListener('cloudSynced', handler);
    return () => window.removeEventListener('cloudSynced', handler);
  }, []);

  const update = (id: string, qty: number) => {
    setCart(prev => {
      const next = setQty(prev, id, qty);
      saveCart(next);
      return next;
    });
  };

  const q = query.trim().toLowerCase();
  const filtered = useMemo(
    () => products.filter(p => !q || `${p.title} ${p.desc} ${p.subDesc}`.toLowerCase().includes(q)),
    [products, q],
  );
  const qtyOf = (id: string) => cart.find(l => l.id === id)?.qty ?? 0;
  const cartLines = cart
    .map(l => ({ line: l, product: products.find(p => p.id === l.id) }))
    .filter((x): x is { line: CartLine; product: Product } => !!x.product && x.product.price !== null);
  const count = cartLines.reduce((n, x) => n + x.line.qty, 0);
  const total = cartTotal(cartLines.map(x => x.line), products);
  const badge = Math.min(count, 99);

  const placeOrder = () => {
    if (!name.trim() || !address.trim()) { setError('Please enter your name and delivery address.'); return; }
    const o: OrderRecord = {
      id: `RPH-${Date.now().toString(36).toUpperCase()}`,
      date: new Date().toISOString(),
      total,
      name: name.trim(),
      address: address.trim(),
      payment,
      lines: cartLines.map(x => ({ id: x.product.id, title: x.product.title, qty: x.line.qty, price: x.product.price ?? 0 })),
    };
    saveOrder(o);
    setOrder(o);
    setCart([]);
    saveCart([]);
    setError('');
    setView('done');
    setConfetti(c => c + 1);
  };

  const closeView = () => { setView(null); setError(''); };
  const paymentLabel = { cod: 'Cash on Delivery', gcash: 'GCash', card: 'Card' } as Record<string, string>;

  return (
    <div className="min-h-screen pb-28">
      <Confetti trigger={confetti} />
      <div className="bg-gradient-to-br from-candy-green to-candy-mint px-5 pt-10 pb-6 rounded-b-3xl shadow-lg">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2"><ShoppingBasket size={24} /> 🛒 {t('shop.title')}</h1>
            <p className="text-white/90 text-sm">{t('shop.subtitle')}</p>
          </div>
          <button aria-label="Open cart" onClick={() => setView('cart')} className="relative bg-white/30 rounded-full p-3 active:scale-95 transition">
            <ShoppingCart size={22} className="text-white" />
            {count > 0 && <span className="absolute -top-1 -right-1 bg-candy-pink text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] px-1 flex items-center justify-center">{badge}{count > 99 ? '+' : ''}</span>}
          </button>
        </div>
        <div className="mt-4 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search products..." className="w-full bg-white rounded-full pl-9 pr-4 py-2.5 text-sm outline-none shadow" />
        </div>
      </div>

      <div className="px-4 mt-4 space-y-3">
        <PartnersRow />
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 shadow text-center">
            <ShoppingBasket size={40} className="text-gray-300 mx-auto mb-2" />
            <p className="text-gray-400 text-sm">{products.length === 0 ? t('shop.empty') : 'No products match your search.'}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filtered.map(p => {
              const qty = qtyOf(p.id);
              return (
                <div key={p.id} className="bg-white rounded-2xl p-3 shadow animate-pop flex flex-col gap-2">
                  <button onClick={() => setSelected(p)} className="text-left flex flex-col gap-2">
                    <ProductThumb p={p} size="w-full h-24" />
                    <p className="font-bold text-gray-700 text-sm leading-tight line-clamp-2">{p.title}</p>
                  </button>
                  {p.subDesc && <span className="self-start bg-yellow-100 text-yellow-700 rounded-full px-2 py-0.5 text-[11px] font-bold">{p.subDesc}</span>}
                  <div className="mt-auto">
                    {p.price !== null && <p className="font-black text-candy-green text-base mb-1.5">{formatPrice(p.price)}</p>}
                    {p.price === null ? (
                      <button onClick={() => window.open(p.link, '_blank', 'noopener,noreferrer')} className="w-full bg-gradient-to-r from-candy-green to-candy-mint rounded-full py-2 text-xs font-bold text-white shadow active:scale-95 transition flex items-center justify-center gap-1">
                        <ExternalLink size={12} /> {t('shop.buy')}
                      </button>
                    ) : qty > 0 ? (
                      <div className="flex justify-center"><QtyStepper qty={qty} onChange={n => update(p.id, n)} /></div>
                    ) : (
                      <button onClick={() => update(p.id, 1)} className="w-full bg-gradient-to-r from-candy-green to-candy-mint rounded-full py-2 text-xs font-bold text-white shadow active:scale-95 transition flex items-center justify-center gap-1">
                        <ShoppingCart size={12} /> Add to cart
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {count > 0 && view === null && (
          <button onClick={() => setView('cart')} className="fixed left-4 right-4 bottom-24 z-40 max-w-lg mx-auto bg-gradient-to-r from-candy-green to-candy-mint text-white rounded-full py-3 px-5 font-bold shadow-xl flex items-center justify-between active:scale-95 transition">
            <span className="flex items-center gap-2"><ShoppingCart size={18} /> View cart ({count})</span>
            <span>{formatPrice(total)}</span>
          </button>
        )}
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)}>
        {selected && (
          <div className="space-y-3">
            <ProductThumb p={selected} size="w-full h-44" />
            <h2 className="text-xl font-bold text-gray-700 pr-8">{selected.title}</h2>
            {selected.subDesc && <span className="inline-block bg-yellow-100 text-yellow-700 rounded-full px-2 py-0.5 text-xs font-bold">{selected.subDesc}</span>}
            <p className="text-gray-500 text-sm">{selected.desc}</p>
            {selected.price !== null ? (
              <>
                <p className="font-black text-candy-green text-2xl">{formatPrice(selected.price)}</p>
                <button onClick={() => { update(selected.id, qtyOf(selected.id) + 1); setSelected(null); }} className="w-full bg-gradient-to-r from-candy-green to-candy-mint rounded-full py-3 font-bold text-white shadow active:scale-95 transition">Add to cart</button>
              </>
            ) : (
              <button onClick={() => window.open(selected.link, '_blank', 'noopener,noreferrer')} className="w-full bg-gradient-to-r from-candy-green to-candy-mint rounded-full py-3 font-bold text-white shadow active:scale-95 transition">{t('shop.buy_full')}</button>
            )}
          </div>
        )}
      </Modal>

      <Modal open={view === 'cart'} onClose={closeView} title="🛒 Your Cart">
        {cartLines.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-6">Your cart is empty.</p>
        ) : (
          <div className="space-y-3">
            {cartLines.map(({ line, product }) => (
              <div key={product.id} className="flex items-center gap-3">
                <ProductThumb p={product} size="w-14 h-14" />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-700 text-sm truncate">{product.title}</p>
                  <p className="text-candy-green font-bold text-sm">{formatPrice((product.price ?? 0) * line.qty)}</p>
                </div>
                <QtyStepper qty={line.qty} onChange={n => update(product.id, n)} />
                <button aria-label="Remove item" onClick={() => update(product.id, 0)}><Trash2 size={16} className="text-red-400" /></button>
              </div>
            ))}
            <div className="flex justify-between font-bold text-gray-700 border-t pt-3"><span>Total</span><span>{formatPrice(total)}</span></div>
            <button onClick={() => setView('checkout')} className="w-full bg-gradient-to-r from-candy-green to-candy-mint rounded-full py-3 font-bold text-white shadow active:scale-95 transition">Checkout</button>
          </div>
        )}
      </Modal>

      <Modal open={view === 'checkout'} onClose={closeView} title="Checkout">
        <div className="space-y-3">
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Full name" className="w-full bg-gray-100 rounded-xl px-3 py-2 text-sm outline-none" />
          <textarea value={address} onChange={e => setAddress(e.target.value)} placeholder="Delivery address" rows={2} className="w-full bg-gray-100 rounded-xl px-3 py-2 text-sm outline-none resize-none" />
          <div className="space-y-1.5">
            {Object.entries(paymentLabel).map(([k, label]) => (
              <label key={k} className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold cursor-pointer ${payment === k ? 'bg-candy-green/20 text-gray-700' : 'bg-gray-100 text-gray-500'}`}>
                <input type="radio" name="payment" checked={payment === k} onChange={() => setPayment(k)} /> {label}
              </label>
            ))}
          </div>
          <div className="flex justify-between font-bold text-gray-700 border-t pt-3"><span>Total ({count} items)</span><span>{formatPrice(total)}</span></div>
          {error && <p className="text-red-500 text-xs font-bold">{error}</p>}
          <p className="text-[11px] text-gray-400">Demo checkout: no payment is processed and the order is stored on this device only.</p>
          <button disabled={cartLines.length === 0} onClick={placeOrder} className="w-full bg-gradient-to-r from-candy-green to-candy-mint rounded-full py-3 font-bold text-white shadow active:scale-95 transition disabled:opacity-50">Place order</button>
        </div>
      </Modal>

      <Modal open={view === 'done'} onClose={closeView}>
        {order && (
          <div className="text-center space-y-2 py-2">
            <CheckCircle2 size={48} className="text-candy-green mx-auto" />
            <h2 className="text-xl font-bold text-gray-700">Order placed!</h2>
            <p className="text-gray-500 text-sm">Order <span className="font-bold">{order.id}</span> · {formatPrice(order.total)}</p>
            <p className="text-gray-400 text-xs">{paymentLabel[order.payment]} · {getOrders().length} order(s) on this device</p>
            <button onClick={closeView} className="w-full bg-gradient-to-r from-candy-green to-candy-mint rounded-full py-3 font-bold text-white shadow active:scale-95 transition">Continue shopping</button>
          </div>
        )}
      </Modal>
    </div>
  );
}
