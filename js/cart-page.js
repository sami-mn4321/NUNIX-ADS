"use strict";
const cart = window.NunixCart;
const { money } = window.NunixCatalog;
const itemList = document.getElementById("cart-items");
document.getElementById("copyright-year").textContent = new Date().getFullYear();
function make(tag, className, content) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (content !== undefined) el.textContent = String(content);
  return el;
}
function render() {
  const rows = cart.items();
  const fragment = document.createDocumentFragment();
  rows.forEach(p => {
    const row = make("article", "cart-row");
    const image = make("img", "cart-row-image"); image.src = p.image; image.alt = `Demo illustration: ${p.name}`;
    const content = make("div", "cart-row-info");
    content.append(make("h3", "", p.name));
    content.append(make("p", "cart-line-price", `${money(p.price)} each · example price`));
    const controls = make("div", "cart-row-controls");
    const label = make("label", "cart-qty-label", "Quantity");
    const qty = make("input", "cart-quantity");
    qty.type = "number"; qty.min = "1"; qty.max = "20"; qty.value = String(p.qty); qty.setAttribute("aria-label", `Quantity of ${p.name}`);
    qty.addEventListener("change", () => {
      const number = Number(qty.value);
      if (Number.isInteger(number) && number >= 1 && number <= 20) cart.setQty(p.id, number);
      else { qty.value = String(p.qty); }
    });
    const remove = make("button", "cart-remove", "Remove"); remove.type = "button";
    remove.addEventListener("click", () => cart.remove(p.id));
    controls.append(label, qty, remove);
    content.append(controls);
    const cost = make("strong", "cart-row-total", money(p.price * p.qty));
    row.append(image, content, cost);
    fragment.append(row);
  });
  itemList.replaceChildren(fragment);
  document.getElementById("cart-empty").hidden = rows.length !== 0;
  document.getElementById("summary-count").textContent = String(cart.count());
  document.getElementById("summary-subtotal").textContent = money(cart.subtotal());
  const button = document.getElementById("checkout-link");
  button.classList.toggle("disabled-link", !rows.length);
  button.setAttribute("aria-disabled", String(!rows.length));
  if (!rows.length) button.setAttribute("tabindex", "-1"); else button.removeAttribute("tabindex");
}
document.getElementById("checkout-link").addEventListener("click", event => {
  if (cart.count() === 0) event.preventDefault();
});
document.addEventListener("nunix:cart-change", render);
render();
