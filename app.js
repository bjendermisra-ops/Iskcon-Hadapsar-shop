import {config} from './config.js';
import {products,categories} from './catalog.js';
import {normalizeCart,cartLines,orderMessage} from './core.js';
const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
const money=n=>'₹'+n.toLocaleString('en-IN');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const image=p=>`assets/${p.image}.webp`;
let cart=[],category='All',lang='en',message='',toastTimer;
try{cart=normalizeCart(JSON.parse(localStorage.getItem('bhakti-cart-v1')||'[]'),products);}catch{}
function toast(text){$('#toast').textContent=text;$('#toast').style.display='block';clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').style.display='none',2600);}
function persist(){cart=normalizeCart(cart,products);try{localStorage.setItem('bhakti-cart-v1',JSON.stringify(cart));}catch{toast('Bag works, but this browser cannot save it between visits.');}updateCounts();}
function updateCounts(){const count=cart.reduce((n,r)=>n+r.quantity,0);$$('.cart-count').forEach(e=>e.textContent=count);}
function openDialog(id){$$('dialog[open]').forEach(d=>d.close());$('#'+id).showModal();}
$$('[data-close]').forEach(b=>b.addEventListener('click',()=>$('#'+b.dataset.close).close()));
function filterTo(c){category=c;renderProducts();$('#collection').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});}
const catImages={Books:'books',Malas:'malas',Puja:'puja',Ghee:'ghee',Accessories:'bag'};
$('#category-tiles').innerHTML=categories.slice(1).map(c=>`<button class="category-tile" data-category="${c}"><img src="assets/${catImages[c]}.webp" alt="${c} category illustration" loading="lazy">${c}</button>`).join('');
$('#category-tiles').addEventListener('click',e=>{const b=e.target.closest('[data-category]');if(b)filterTo(b.dataset.category);});
function renderProducts(){
 const query=$('#search').value.trim().toLocaleLowerCase();
 let list=products.filter(p=>p.enabled&&(category==='All'||p.category===category)&&[p.name,p.category,...p.variants.map(v=>v.label)].join(' ').toLocaleLowerCase().includes(query));
 const min=p=>Math.min(...p.variants.map(v=>v.price));
 if($('#sort').value==='featured'){const order=['book-0','japa-tulsi','ghee','tilak','book-3','bag-cotton','diya','kanthi-single'];list.sort((a,b)=>(order.includes(a.id)?order.indexOf(a.id):999)-(order.includes(b.id)?order.indexOf(b.id):999));}
 if($('#sort').value==='low')list.sort((a,b)=>min(a)-min(b));
 if($('#sort').value==='high')list.sort((a,b)=>min(b)-min(a));
 if($('#sort').value==='name')list.sort((a,b)=>a.name.localeCompare(b.name));
 $('#filters').innerHTML=categories.map(c=>`<button class="chip ${c===category?'active':''}" aria-pressed="${c===category}" data-filter="${c}">${c}</button>`).join('');
 $('#result-count').textContent=list.length+' products';$('#collection-title').textContent=category==='All'?(lang==='hi'?'हमारा संग्रह':'The collection'):category;
 $('#products').innerHTML=list.map(p=>`<article class="product"><button class="product-image" data-product="${p.id}" aria-label="View ${esc(p.name)}"><img src="${image(p)}" alt="Representative ${esc(p.category.toLowerCase())} image" loading="lazy" width="400" height="400"></button><div class="product-body"><small>${p.category}</small><button class="product-name" data-product="${p.id}">${esc(p.name)}</button><div class="product-bottom"><div><span>${p.variants.length>1?'From · sample price':'Sample price'}</span><br><strong>${money(min(p))}</strong></div><button class="add-small" data-product="${p.id}" aria-label="Choose ${esc(p.name)}">+</button></div><p class="image-caption">Representative image</p></div></article>`).join('');
 $('#empty').hidden=list.length>0;
}
$('#filters').addEventListener('click',e=>{const b=e.target.closest('[data-filter]');if(b){category=b.dataset.filter;renderProducts();}});
$('#search').addEventListener('input',renderProducts);$('#sort').addEventListener('change',renderProducts);
$('#reset').onclick=()=>{category='All';$('#search').value='';renderProducts();};
$('#products').addEventListener('click',e=>{const b=e.target.closest('[data-product]');if(b)showProduct(b.dataset.product);});
function showProduct(id){
 const p=products.find(p=>p.id===id);if(!p)return;
 $('#product-detail').innerHTML=`<div class="detail"><img class="detail-image" src="${image(p)}" alt="Representative ${esc(p.category)} image"><p class="image-caption">Illustrative category image; actual item may differ.</p><h2>${esc(p.name)}</h2><p>${esc(p.description)}</p><label>Choose language / size<select id="variant">${p.variants.map(v=>`<option value="${v.id}">${esc(v.label)} — ${money(v.price)}</option>`).join('')}</select></label><div id="variant-price" class="detail-price">${money(p.variants[0].price)}</div><p class="muted">Sample price · availability and final amount confirmed on WhatsApp.</p><button id="add-product" class="primary full">Add to bag</button></div>`;
 $('#variant').onchange=()=>$('#variant-price').textContent=money(p.variants.find(v=>v.id===$('#variant').value).price);
 $('#add-product').onclick=()=>{const variant=$('#variant').value;const row=cart.find(r=>r.product===id&&r.variant===variant);if(row&&row.quantity>=99){toast('Maximum 99 per variant.');return;}if(row)row.quantity++;else cart.push({product:id,variant,quantity:1});persist();$('#product-dialog').close();toast('Added to your bag');};
 openDialog('product-dialog');
}
function totals(mode='pickup'){
 const total=cartLines(cart,products).reduce((n,r)=>n+r.total,0);
 return `<div><span>Products subtotal</span><b>${money(total)}</b></div><div><span>${mode==='pickup'?'Temple pickup':'Delivery charge'}</span><b>${mode==='pickup'?'₹0':'To be confirmed'}</b></div><div><span>Estimated total</span><strong>${money(total)}${mode==='delivery'?' + delivery':''}</strong></div><p>Sample prices. Final amount and availability confirmed by the shop.</p>`;
}
function renderCart(){
 const rows=cartLines(cart,products);
 $('#cart-content').innerHTML=rows.length?rows.map((r,i)=>`<div class="cart-row"><img src="${image(products.find(p=>p.id===r.product))}" alt="Representative product image"><div><h3>${esc(r.name)}</h3><p>${esc(r.label)} · ${money(r.price)} each</p><div class="cart-controls"><div class="stepper"><button data-step="-1" data-index="${i}" aria-label="Decrease ${esc(r.name)} quantity" ${r.quantity===1?'disabled':''}>−</button><span>${r.quantity}</span><button data-step="1" data-index="${i}" aria-label="Increase ${esc(r.name)} quantity" ${r.quantity===99?'disabled':''}>+</button></div><b>${money(r.total)}</b><button class="remove" data-remove="${i}">Remove</button></div></div></div>`).join('')+`<div class="summary">${totals()}</div><p class="muted">Delivery? Choose it at checkout for a separate quote.</p><button id="start-checkout" class="primary full">Continue to enquiry →</button>`:'<div class="empty"><h3>Your bag is waiting</h3><p>Add something for your daily devotion.</p><button id="continue-shopping" class="primary">Explore products</button></div>';
 if($('#start-checkout'))$('#start-checkout').onclick=()=>{updateCheckoutMode();openDialog('checkout-dialog');};
 if($('#continue-shopping'))$('#continue-shopping').onclick=()=>{$('#cart-dialog').close();filterTo('All');};
}
$$('[data-cart]').forEach(b=>b.onclick=()=>{renderCart();openDialog('cart-dialog');});
$('#cart-content').onclick=e=>{const step=e.target.closest('[data-step]'),remove=e.target.closest('[data-remove]');if(step){const row=cart[Number(step.dataset.index)];if(row)row.quantity=Math.max(1,Math.min(99,row.quantity+Number(step.dataset.step)));persist();renderCart();}if(remove){cart.splice(Number(remove.dataset.remove),1);persist();renderCart();}};
function updateCheckoutMode(){
 const mode=$('#checkout input[name="mode"]:checked').value,delivery=mode==='delivery';
 $('#delivery-fields').hidden=!delivery;
 ['address','city','pin'].forEach(n=>{$(`#checkout [name="${n}"]`).required=delivery;$(`#checkout [name="${n}"]`).disabled=!delivery;});
 $('#mode-note').textContent=delivery?config.deliveryNote:config.pickupNote;
 $('#checkout-total').innerHTML=totals(mode);
}
$$('input[name="mode"]').forEach(e=>e.onchange=updateCheckoutMode);
$('#checkout').onsubmit=e=>{
 e.preventDefault();$('#checkout-error').textContent='';
 try{message=orderMessage(cart,products,Object.fromEntries(new FormData(e.target)),config);$('#message-preview').textContent=message;$('#whatsapp-link').href=`https://wa.me/${config.whatsapp}?text=${encodeURIComponent(message)}`;$('#contact-number').textContent='+'+config.whatsapp;openDialog('review-dialog');}catch(error){$('#checkout-error').textContent=error.message;}
};
$('#copy-message').onclick=async()=>{try{await navigator.clipboard.writeText(message);$('#copy-message').textContent='Copied!';setTimeout(()=>$('#copy-message').textContent='Copy message',2000);}catch{const range=document.createRange();range.selectNodeContents($('#message-preview'));const selection=window.getSelection();selection.removeAllRanges();selection.addRange(range);$('#copy-message').textContent='Message selected — long press to copy';}};
function contact(){window.open(`https://wa.me/${config.whatsapp}?text=${encodeURIComponent('Hare Krishna! I would like to enquire about ISKCON Hadapsar Bhakti Store products and pickup details.')}`,'_blank','noopener,noreferrer');}
$('#contact').onclick=contact;$('#nav-contact').onclick=contact;
$('#help').onclick=contact;
if(!config.sampleCatalog)$$('.catalog-notice').forEach(e=>e.textContent='Images are representative. Product details, availability and final price will be confirmed on WhatsApp.');
updateCounts();renderProducts();
