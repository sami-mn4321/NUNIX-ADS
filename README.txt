NUNIX ADS — Product Catalogue + Cart + Checkout (DEMO)
====================================================

INSTALL INTO EXISTING PROJECT:
Copy the entire CONTENTS of this folder into your existing NUNIX-ADS folder.
Merge css/, js/, and assets/images/ folders. Do not delete or replace index.html,
style.css, or three-scene.js. The new products.html and products.css should
replace their older counterparts.

Expected folder structure:
  NUNIX-ADS/
    index.html                          (your existing homepage)
    products.html                       (new)
    cart.html                           (new)
    checkout.html                       (new)
    css/style.css                       (your existing stylesheet)
    css/products.css                    (new)
    js/three-scene.js                   (existing 3D models)
    js/catalog-data.js                  (new; EDIT PRODUCTS HERE)
    js/cart-store.js                    (new)
    js/products.js                      (new)
    js/cart-page.js                     (new)
    js/checkout.js                      (new)
    assets/images/*.svg                 (18 demo appliance illustrations)

Run with VS Code Live Server. Open index.html and click Products.
For a direct test, open products.html?category=gas-stoves — you should see TWO items.
Click Add to Cart, then Cart, then Proceed to Checkout.

DEMO / SAFETY:
- All 18 example product descriptions and prices are fictional placeholders.
- Images are SVG illustrations, not real appliance photographs.
- The cart is saved in the browser's localStorage; it is not linked to a server.
- No real payments or orders are processed.
- Checkout prepares a request and can COPY it, but doesn't submit orders.
- To offer WhatsApp requests, configure your VERIFIED business number
  in js/catalog-data.js: businessWhatsapp: "2547XXXXXXXX" (your actual number).
- Cash on delivery is only a REQUEST subject to seller approval, not a promise.
- Delivery charges are not included; confirm with the buyer before accepting an order.
- Before publishing, add real inventory/photographs/prices, secure backend,
  order management, privacy policies, and a server-side M-Pesa integration.

OPTIONAL HOMEPAGE CART LINK:
Add <a href="cart.html">Cart</a> to the nav-links in index.html.

FOR REAL PRODUCT PHOTOS:
Copy your .jpg / .webp images to assets/images/, then update each
product's image path and price/description in js/catalog-data.js.
