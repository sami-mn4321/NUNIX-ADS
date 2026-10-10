"use strict";
// Product catalogue / category filters, details, and Add to Cart.
const { products, categories, money } = window.NunixCatalog;
const cart = window.NunixCart;
const params = new URLSearchParams(location.search);
const requestedCategory = params.get("category");
const category = categories.find(x => x.slug === requestedCategory);
const invalidCategory = requestedCategory !== null && !category;

const grid = document.getElementById("product-grid");
const categoryNav = document.getElementById("category-list");
const search = document.getElementById("product-search");
const sort = document.getElementById("product-sort");
const dialog = document.getElementById("product-dialog");
const toast = document.getElementById("shop-toast");
let toastTimer;
let activeProductId = null;

function element(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text !== undefined) el.textContent = String(text);
  return el;
}
function notify(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}
function categoryName(slug) {
  return categories.find(c => c.slug === slug)?.name ?? "Appliances";
}
function appendCategoryLink(title, link, selected) {
  const anchor = element("a", "", title);
  anchor.href = link;
  if (selected) anchor.setAttribute("aria-current", "page");
  categoryNav.append(anchor);
}
appendCategoryLink("All Products", "products.html", requestedCategory === null);
for (const item of categories) {
  appendCategoryLink(item.name, `products.html?category=${item.slug}`, item.slug === requestedCategory);
}
const title = invalidCategory ? "Unknown Category" : category ? category.name : "All Products";
document.title = `${title} | NUNIX ADS`;
document.getElementById("page-title").textContent = title;
document.getElementById("results-title").textContent = invalidCategory ? "Invalid category" : category ? `${category.name} Products` : "All Products";
document.getElementById("copyright-year").textContent = new Date().getFullYear();

function showDetails(product) {
  activeProductId = product.id;
  document.getElementById("dialog-image").src = product.image;
  document.getElementById("dialog-image").alt = `Demo illustration: ${product.name}`;
  document.getElementById("dialog-category").textContent = categoryName(product.category);
  document.getElementById("dialog-title").textContent = product.name;
  document.getElementById("dialog-description").textContent = product.description;
  document.getElementById("dialog-price").textContent = `Example price: ${money(product.price)}`;
  dialog.showModal();
}
document.getElementById("close-dialog").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });
document.getElementById("dialog-add").addEventListener("click", () => {
  if (activeProductId && cart.add(activeProductId)) {
    notify("Added to cart"); dialog.close();
  }
});

function createCard(product) {
  const article = element("article", "shop-product");
  const illustration = element("div", "shop-product-art");
  const img = element("img");
  img.src = product.image;
  img.alt = `Demo illustration of ${product.name}`;
  img.loading = "lazy";
  illustration.append(img);

  const details = element("div", "shop-product-body");
  details.append(element("p", "shop-product-category", categoryName(product.category)));
  details.append(element("h3", "", product.name));
  details.append(element("p", "shop-product-description", product.description));
  details.append(element("p", "shop-product-price", money(product.price)));
  details.append(element("p", "shop-product-status", "Example price · Demo product"));

  const buttons = element("div", "shop-product-actions");
  const view = element("button", "shop-details-button shop-outline-button", "View Details");
  view.type = "button";
  view.addEventListener("click", () => showDetails(product));
  const add = element("button", "shop-details-button", "+ Add to Cart");
  add.type = "button";
  add.addEventListener("click", () => {
    cart.add(product.id);
    notify(`${product.name} added · ${cart.count()} item(s) in cart`);
  });
  buttons.append(view, add);
  details.append(buttons);
  article.append(illustration, details);
  return article;
}
function render() {
  const query = search.value.trim().toLowerCase();
  let result = products.filter(p => {
    const matchesCategory = !invalidCategory && (!category || p.category === category.slug);
    const matchesQuery = `${p.name} ${p.description} ${categoryName(p.category)}`.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });
  const option = sort.value;
  if (option === "az") result.sort((a, b) => a.name.localeCompare(b.name));
  if (option === "za") result.sort((a, b) => b.name.localeCompare(a.name));
  if (option === "low") result.sort((a, b) => a.price - b.price);
  if (option === "high") result.sort((a, b) => b.price - a.price);
  grid.replaceChildren(...result.map(createCard));
  document.getElementById("results-count").textContent = `${result.length} demo product${result.length === 1 ? "" : "s"} found`;
  document.getElementById("empty-state").hidden = result.length !== 0;
}
search.addEventListener("input", render);
sort.addEventListener("change", render);
render();
