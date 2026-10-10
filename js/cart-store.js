"use strict";
/* Cart storage only. Customer name/phone/address are never saved in localStorage. */
(function () {
  const KEY = "nunix_ads_demo_cart_v1";
  const catalogue = window.NunixCatalog;
  const byId = new Map(catalogue.products.map(p => [p.id, p]));
  function read() {
    try {
      const raw = JSON.parse(localStorage.getItem(KEY) || "[]");
      if (!Array.isArray(raw)) return [];
      return raw.filter(row => row && byId.has(row.id) && Number.isInteger(row.qty) && row.qty > 0)
        .map(row => ({ id: row.id, qty: Math.min(row.qty, 20) }));
    } catch (error) { return []; }
  }
  let data = read();
  function update() {
    try { localStorage.setItem(KEY, JSON.stringify(data)); }
    catch (error) { console.warn("Browser storage is unavailable; cart remains in memory."); }
    document.dispatchEvent(new CustomEvent("nunix:cart-change"));
  }
  function count() { return data.reduce((sum, row) => sum + row.qty, 0); }
  function items() { return data.map(row => ({ ...byId.get(row.id), qty: row.qty })); }
  function subtotal() { return items().reduce((sum, p) => sum + p.qty * p.price, 0); }
  function add(id) {
    if (!byId.has(id)) return false;
    const row = data.find(p => p.id === id);
    if (row) row.qty = Math.min(20, row.qty + 1);
    else data.push({ id, qty: 1 });
    update(); return true;
  }
  function setQty(id, qty) {
    qty = Number(qty);
    if (!byId.has(id) || !Number.isInteger(qty)) return;
    if (qty <= 0) data = data.filter(p => p.id !== id);
    else {
      const row = data.find(p => p.id === id);
      if (row) row.qty = Math.min(20, qty);
    }
    update();
  }
  function remove(id) { data = data.filter(p => p.id !== id); update(); }
  function updateBadge() {
    document.querySelectorAll("[data-cart-count]").forEach(el => { el.textContent = String(count()); });
  }
  document.addEventListener("nunix:cart-change", updateBadge);
  window.addEventListener("storage", event => {
    if (event.key === KEY) { data = read(); document.dispatchEvent(new CustomEvent("nunix:cart-change")); }
  });
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", updateBadge);
  else updateBadge();
  window.NunixCart = { add, setQty, remove, items, count, subtotal };
})();
