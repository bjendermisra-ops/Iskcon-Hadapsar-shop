# ISKCON Hadapsar · Bhakti Store

Responsive, buildless storefront with product filters, search, price sorting, product variants, persistent shopping bag, checkout validation and WhatsApp enquiry review. No payment gateway, account system, database or server-side order storage.

## Run

Serve this folder over HTTP (`python3 -m http.server 8080`) and open localhost:8080. Do not open index.html using file:// because browser ES modules need HTTP. Run `npm test` for checkout and catalog checks. No npm install is needed.

## Update from GitHub on a phone

- `config.js`: WhatsApp number (digits including 91), location text, pickup instructions.
- `catalog.js`: all 38 products, sample prices, language/size variants, descriptions and enabled flag. Set `enabled: false` to hide a product. IDs must remain unique and stable.
- `assets/`: generated representative category images, compressed as WebP. Replace with actual product photos when available. Set each product's `image` to the filename without `.webp`.
- `styles.css`: colours, spacing and responsive layout.

The current catalog is illustrative, not a stock declaration. Books share representative scripture artwork, and accessories share category imagery. Generated images do not depict actual book editions or specific shop packaging. All prices and language options are unverified placeholders chosen for preview. Confirm real prices, variants and inventory before promoting the shop. Hindi button currently translates selected homepage headings only; checkout and catalog remain in English.

## Order behaviour

1. User picks items and variants, then pickup or delivery.
2. Temple pickup has a zero fee and does not require a delivery address. Exact location/time must be agreed on WhatsApp.
3. Delivery requires address, city and six-digit PIN. No service area or free delivery is assumed from 411028. Charges and eligibility are quoted by the shop.
4. Message preview includes items, variants, quantities, estimated subtotal and customer details. User opens WhatsApp and must press Send there.
5. There is no automatic confirmation, payment collection, delivery charge calculation or WhatsApp sending. Cart is deliberately retained because the website cannot observe whether a message was sent.

Personal checkout fields live in page memory only; they are not persisted in localStorage or sent to GitHub. Cart stores only product/variant IDs and quantities. Opening WhatsApp shares the message through its URL. Shared-device users should close the checkout after use. Fonts load from Google Fonts with system fallbacks.

## Hosting

For GitHub Pages: repository Settings → Pages → Deploy from a branch → main → /(root) → Save. The site uses relative paths and works on a repository subpath. No backend, secrets, API keys or build are needed. Publishing GitHub Pages is separate from committing these source files.

## Assets

Hero, scripture, mala, puja and ghee artwork were generated for this prototype with the built-in image-generation tool. Prompt direction: photorealistic cream-linen ecommerce product photography, warm light, restrained forest-green/gold accents; representative products without certification claims. WebP derivatives preserve the full composition. Use your actual verified product images before treating this as a precise visual catalog.
