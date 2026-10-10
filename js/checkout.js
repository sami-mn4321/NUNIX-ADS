"use strict";
const cart = window.NunixCart;
const catalogue = window.NunixCatalog;
const form = document.getElementById("checkout-form");
const result = document.getElementById("checkout-result");
const preview = document.getElementById("checkout-preview");
const whatsappLink = document.getElementById("whatsapp-request");
const copyButton = document.getElementById("copy-request");
document.getElementById("copyright-year").textContent = new Date().getFullYear();
let preparedRequest = "";
function displaySummary() {
  const fragment = document.createDocumentFragment();
  for (const p of cart.items()) {
    const line = document.createElement("div"); line.className = "summary-row";
    const label = document.createElement("span"); label.textContent = `${p.qty} × ${p.name}`;
    const amount = document.createElement("strong"); amount.textContent = catalogue.money(p.price * p.qty);
    line.append(label, amount); fragment.append(line);
  }
  document.getElementById("checkout-lines").replaceChildren(fragment);
  document.getElementById("checkout-subtotal").textContent = catalogue.money(cart.subtotal());
  const empty = cart.count() === 0;
  document.getElementById("checkout-empty").hidden = !empty;
  form.hidden = empty;
  if (empty) result.hidden = true;
}
function validKenyanNumber(value) {
  return /^(?:\+254|254|0)[71]\d{8}$/.test(value.replace(/[\s-]/g, ""));
}
form.addEventListener("submit", event => {
  event.preventDefault();
  if (!form.reportValidity() || cart.count() === 0) return;
  const phone = document.getElementById("customer-phone").value.trim();
  if (!validKenyanNumber(phone)) {
    const input = document.getElementById("customer-phone");
    input.setCustomValidity("Enter a Kenyan mobile number, for example 07XXXXXXXX or +2547XXXXXXXX.");
    input.reportValidity(); return;
  }
  const fullName = document.getElementById("customer-name").value.trim();
  const county = document.getElementById("customer-county").value.trim();
  const town = document.getElementById("customer-town").value.trim();
  if (!fullName || !county || !town) { alert("Enter your name, county and town."); return; }
  const email = document.getElementById("customer-email").value.trim();
  const notes = document.getElementById("delivery-notes").value.trim();
  const method = form.querySelector('input[name="payment"]:checked').value;
  const list = cart.items().map(p => `- ${p.name} | Qty ${p.qty} | Example ${catalogue.money(p.qty * p.price)}`).join("\n");
  preparedRequest = [
    "NUNIX ADS — ORDER REQUEST (NOT YET CONFIRMED)",
    "", "Customer: " + fullName, "Phone: " + phone,
    ...(email ? ["Email: " + email] : []),
    "Delivery county: " + county, "Town / area: " + town,
    ...(notes ? ["Notes: " + notes] : []),
    "Payment preference: " + method,
    "", "ITEMS:", list,
    "", `Example subtotal: ${catalogue.money(cart.subtotal())}`,
    "Delivery charge: to be confirmed",
    "Please confirm actual product availability, final prices, delivery fee and payment instructions."
  ].join("\n");
  preview.textContent = preparedRequest;
  result.hidden = false;
  const businessNumber = catalogue.businessWhatsapp.replace(/\D/g, "");
  if (/^254[71]\d{8}$/.test(businessNumber)) {
    whatsappLink.href = `https://wa.me/${businessNumber}?text=${encodeURIComponent(preparedRequest)}`;
    whatsappLink.hidden = false;
  } else whatsappLink.hidden = true;
  document.getElementById("checkout-feedback").textContent = businessNumber ? "" : "Business WhatsApp number isn't configured yet. Copy the request to share manually.";
  result.scrollIntoView({ behavior: "smooth", block: "start" });
});
document.getElementById("customer-phone").addEventListener("input", event => event.target.setCustomValidity(""));
copyButton.addEventListener("click", async () => {
  if (!preparedRequest) return;
  try {
    await navigator.clipboard.writeText(preparedRequest);
    document.getElementById("checkout-feedback").textContent = "Order request copied. No order has been submitted yet.";
  } catch (error) {
    document.getElementById("checkout-feedback").textContent = "Copy was blocked by the browser. Select the request text above and copy it manually.";
  }
});
document.addEventListener("nunix:cart-change", () => {
  result.hidden = true;
  preparedRequest = "";
  displaySummary();
});
displaySummary();
