export function normalizeCart(raw,products){
 if(!Array.isArray(raw))return [];
 const clean=[];
 for(const row of raw){
  if(!row||typeof row!=='object')continue;
  const p=products.find(p=>p.id===row.product&&p.enabled);
  const v=p?.variants.find(v=>v.id===row.variant);
  if(!v||!Number.isFinite(row.quantity))continue;
  const quantity=Math.min(99,Math.max(1,Math.trunc(row.quantity)));
  const prev=clean.find(x=>x.product===p.id&&x.variant===v.id);
  if(prev)prev.quantity=Math.min(99,prev.quantity+quantity);
  else clean.push({product:p.id,variant:v.id,quantity});
 }
 return clean;
}
export function cartLines(cart,products){return normalizeCart(cart,products).map(row=>{
 const product=products.find(p=>p.id===row.product),variant=product.variants.find(v=>v.id===row.variant);
 return {...row,name:product.name,label:variant.label,price:variant.price,total:variant.price*row.quantity};
});}
export function orderMessage(cart,products,customer,config){
 const lines=cartLines(cart,products);if(!lines.length)throw Error('Your cart is empty.');
 if(!customer.name?.trim()||!/^\d{10}$/.test(customer.phone))throw Error('Enter your name and a 10-digit mobile number.');
 if(!['pickup','delivery'].includes(customer.mode))throw Error('Choose pickup or delivery.');
 if(customer.mode==='delivery'&&(!customer.address?.trim()||!customer.city?.trim()||!/^\d{6}$/.test(customer.pin)))throw Error('Enter your full delivery address, city and 6-digit PIN.');
 const subtotal=lines.reduce((n,l)=>n+l.total,0);
 return ['Hare Krishna! Order enquiry — '+config.name+' '+config.shopName,'',
 ...lines.map((l,i)=>`${i+1}. ${l.name} — ${l.label}\n   ${l.quantity} × ₹${l.price} = ₹${l.total}`),'',
 `Product subtotal: ₹${subtotal}`,customer.mode==='pickup'?'Temple pickup: ₹0\nEstimated total: ₹'+subtotal:'Delivery: charge to be confirmed\nEstimated total: ₹'+subtotal+' + delivery',
 config.sampleCatalog?'Sample catalog prices — please confirm actual prices and availability.':'Please confirm prices and availability.','',
 'Name: '+customer.name.trim(),'Mobile: '+customer.phone,'Method: '+(customer.mode==='pickup'?'Temple pickup':'Delivery'),
 ...(customer.mode==='delivery'?['Address: '+customer.address.trim(),'City: '+customer.city.trim(),'PIN: '+customer.pin]:[config.pickupNote]),
 ...(customer.note?.trim()?['Note: '+customer.note.trim()]:[]),'','Please confirm availability, final amount and payment instructions. This is an enquiry, not a confirmed order.'].join('\n');
}
