const products = [
    {id:1,name:'Figura - Gengar',price:6990,category:'Figuras',img:'img/productos/figuras/f_gengar.jpg'},
    {id:2,name:'Figura - Godzilla',price:6990,category:'Figuras',img:'img/productos/figuras/f_godzilla.jpg'},
    {id:3,name:'Figura - Goku',price:6990,category:'Figuras',img:'img/productos/figuras/f_goku.jpg'},
    {id:4,name:'Figura - Luffy',price:6990,category:'Figuras',img:'img/productos/figuras/f_luffy.jpg'},
    {id:5,name:'Figura - Solo Leveling',price:6990,category:'Figuras',img:'img/productos/figuras/f_Sungjinwoo.jpg'},
    {id:6,name:'Accesorios - Aros',price:1290,category:'Accesorios',img:'img/productos/accesorios/a_aros.jpg'},
    {id:7,name:'Accesorios - Collar',price:1590,category:'Accesorios',img:'img/productos/accesorios/a_collaresnaruto.jpg'},
    {id:8,name:'Accesorios - Pulsera',price:1990,category:'Accesorios',img:'img/productos/accesorios/a_pulseras.jpg'},
    {id:9,name:'Accesorios - Llaveros',price:1590,category:'Accesorios',img:'img/productos/accesorios/a_llaverosPokemon.jpg'},
    {id:10,name:'Accesorios - Pines',price:990,category:'Accesorios',img:'img/productos/accesorios/a_pines.jpg'},
    {id:11,name:'Comics - Avengers',price:2990,category:'Comics',img:'img/productos/comics/c_avengers.jpg'},
    {id:12,name:'Comics - Batman',price:2990,category:'Comics',img:'img/productos/comics/c_batman.jpg'},
    {id:13,name:'Comics - Spiderman',price:2990,category:'Comics',img:'img/productos/comics/c_spiderman.jpg'},
    {id:14,name:'Comics - deadpool',price:2990,category:'Comics',img:'img/productos/comics/c_deadpool.jpg'},
    {id:15,name:'Comics - young justice',price:2990,category:'Comics',img:'img/productos/comics/c_youngjustice.jpg'},
    {id:16,name:'Mangas - Naruto',price:2990,category:'Mangas',img:'img/productos/mangas/m_naruto.jpg'},
    {id:17,name:'Mangas - One Piece',price:2990,category:'Mangas',img:'img/productos/mangas/m_onepiece.jpg'},
    {id:18,name:'Mangas - Kimetsu no Yaiba',price:2990,category:'Mangas',img:'img/productos/mangas/m_kimetsu.jpg'},
    {id:19,name:'Mangas - Black Clover',price:2990,category:'Mangas',img:'img/productos/mangas/m_blackclover.jpg'},
    {id:20,name:'Mangas - Jujutsu Kaisen',price:2990,category:'Mangas',img:'img/productos/mangas/m_jujutsu.jpg'},
  ];
  
  const state = {cart:{}};
  const el = id => document.getElementById(id);
  const money = v => '$' + Number(v).toLocaleString('es-AR');
  
  // Categorías
  const categorySet = new Set(products.map(p=>p.category));
  categorySet.forEach(c=>{
    const opt = document.createElement('option');
    opt.value=c; opt.textContent=c;
    el('categoryFilter').appendChild(opt);
  });
  
  // Render productos
  function renderProducts(list){
    const grid = el('productGrid');
    grid.innerHTML='';
    list.forEach(p=>{
      const col = document.createElement('div');
      col.className='col-sm-6 col-md-4 col-lg-3';
      col.innerHTML=`
        <div class="product-card h-100 d-flex flex-column">
          <img src="${p.img}" class="img-fluid rounded mb-2">
          <div class="d-flex justify-content-between align-items-center mb-1">
            <small class="badge-cat">${p.category}</small>
            <span class="price">${money(p.price)}</span>
          </div>
          <h6>${p.name}</h6>
          <button class="btn btn-sm btn-outline-light mt-auto addToCart" data-id="${p.id}"><i class="bi bi-cart-plus"></i> Agregar</button>
        </div>`;
      grid.appendChild(col);
    });
  }
  renderProducts(products);
  
  // 🛒 Carrito
  function updateCartDisplay(){
    const cart = state.cart;
    const count = Object.values(cart).reduce((a,b)=>a+b.qty,0);
    const total = Object.values(cart).reduce((a,b)=>a+b.qty*b.price,0);
    el('cartCount').textContent=count;
    el('cartTotal').textContent=money(total);
    const container = el('cartItems');
    container.innerHTML='';
    if(count===0){container.innerHTML='<p class="text-muted">Carrito vacío</p>';return;}
    for(const id in cart){
      const item = cart[id];
      const div = document.createElement('div');
      div.className='d-flex justify-content-between align-items-center mb-2';
      div.innerHTML=`
        <div>${item.name} <small class="text-muted">x${item.qty}</small></div>
        <div>
          <span>${money(item.qty*item.price)}</span>
          <button class="btn btn-sm btn-link text-danger p-0 ms-2 removeItem" data-id="${id}"><i class="bi bi-x-circle"></i></button>
        </div>`;
      container.appendChild(div);
    }
  }
  
  // Eventos
  document.addEventListener('click',e=>{
    if(e.target.closest('.addToCart')){
      const id = e.target.closest('.addToCart').dataset.id;
      const prod = products.find(p=>p.id==id);
      if(!state.cart[id]) state.cart[id]={...prod,qty:1}; else state.cart[id].qty++;
      updateCartDisplay();
    }
    if(e.target.closest('.removeItem')){
      const id = e.target.closest('.removeItem').dataset.id;
      delete state.cart[id];
      updateCartDisplay();
    }
  });
  
  el('search').addEventListener('input',filterProducts);
  el('categoryFilter').addEventListener('change',filterProducts);
  el('clearFilters').addEventListener('click',()=>{
    el('search').value=''; el('categoryFilter').value=''; renderProducts(products);
  });
  
  function filterProducts(){
    const q = el('search').value.toLowerCase();
    const cat = el('categoryFilter').value;
    const filtered = products.filter(p=>(!cat||p.category===cat)&&(!q||p.name.toLowerCase().includes(q)));
    renderProducts(filtered);
  }
  
   // 🌐 Navegación por la barra superior
el('navInicio').onclick = (e) => { e.preventDefault(); showPage('catalogPage'); };
el('navCheckout').onclick = (e) => { e.preventDefault(); showPage('checkoutPage'); renderCheckoutSummary(); };
el('navContacto').onclick = (e) => { e.preventDefault(); showPage('contactPage'); };
el('navHome').onclick = (e) => { e.preventDefault(); showPage('catalogPage'); };
// Navegación y checkout
  const offcanvas = new bootstrap.Offcanvas('#offcanvasCart');
  el('openCart').onclick=()=>offcanvas.show();
  el('goToCheckout').onclick=()=>{offcanvas.hide(); showPage('checkoutPage'); renderCheckoutSummary();};
  el('openCheckout').onclick=()=>showPage('checkoutPage');
  el('backToShop').onclick=()=>showPage('catalogPage');
  el('clearCart').onclick=()=>{state.cart={};updateCartDisplay();};
  el('openContact').onclick = () => showPage('contactPage');
el('backToShopFromContact').onclick = () => showPage('catalogPage');

el('contactForm').onsubmit = e => {
  e.preventDefault();
  const name = el('contactName').value.trim();
  const email = el('contactEmail').value.trim();
  const message = el('contactMessage').value.trim();
  if (!name || !email || !message) return alert('Por favor, completa todos los campos.');
  
  alert(`Gracias, ${name}! Tu mensaje fue enviado correctamente.`);
  e.target.reset();
  showPage('catalogPage');
};
  
  function renderCheckoutSummary(){
    const cart = state.cart;
    const container = el('checkoutSummary');
    container.innerHTML='';
    if(Object.keys(cart).length===0){container.innerHTML='<p>No hay productos.</p>';return;}
    let total=0;
    for(const id in cart){
      const i=cart[id];
      total+=i.qty*i.price;
      container.innerHTML+=`<div class="d-flex justify-content-between mb-1"><div>${i.name} x${i.qty}</div><div>${money(i.qty*i.price)}</div></div>`;
    }
    container.innerHTML+=`<hr><div class="d-flex justify-content-between"><strong>Total</strong><strong>${money(total)}</strong></div>`;
  }
  
  el('checkoutForm').onsubmit=e=>{
    e.preventDefault();
    if(Object.keys(state.cart).length===0){alert('Tu carrito está vacío');return;}
    const orderNum = 'AN-' + Math.floor(Math.random()*1000000);
    el('orderNumber').textContent = 'Número de pedido: ' + orderNum;
    showPage('successPage');
    state.cart={};
    updateCartDisplay();
    renderRecommendations();
  }
  
  el('continueShopping').onclick=()=>showPage('catalogPage');
  
  function renderRecommendations(){
    const rec = el('recommendations');
    rec.innerHTML='';
    const random = products.sort(()=>0.5-Math.random()).slice(0,4);
    random.forEach(p=>{
      const col=document.createElement('div');
      col.className='col-6 col-md-3';
      col.innerHTML=`<div class='rec-card p-2 rounded text-start' style='background:var(--glass)'><img src='${p.img}' class='img-fluid rounded mb-2'><h6>${p.name}</h6><small class='text-muted'>${money(p.price)}</small></div>`;
      rec.appendChild(col);
    });
  }
  
  function showPage(id){
    document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
    el(id).classList.add('active');
  }
 