//Productos
const products = [
    {id:1,name:'Figura - Gengar',price:6990,category:'Figuras',img:'img/productos/figuras/f_gengar.jpg', stock:8, initialStock:8},
    {id:2,name:'Figura - Godzilla',price:6990,category:'Figuras',img:'img/productos/figuras/f_godzilla.jpg', stock:5, initialStock:5},
    {id:3,name:'Figura - Goku',price:6990,category:'Figuras',img:'img/productos/figuras/f_goku.jpg', stock:10, initialStock:10},
    {id:4,name:'Figura - Luffy',price:6990,category:'Figuras',img:'img/productos/figuras/f_luffy.jpg', stock:4, initialStock:4},
    {id:5,name:'Figura - Solo Leveling',price:6990,category:'Figuras',img:'img/productos/figuras/f_Sungjinwoo.jpg', stock:3, initialStock:3},
    {id:6,name:'Accesorios - Aros',price:1290,category:'Accesorios',img:'img/productos/accesorios/a_aros.jpg', stock:15, initialStock:15},
    {id:7,name:'Accesorios - Collar',price:1590,category:'Accesorios',img:'img/productos/accesorios/a_collaresnaruto.jpg', stock:6, initialStock:6},
    {id:8,name:'Accesorios - Pulsera',price:1990,category:'Accesorios',img:'img/productos/accesorios/a_pulseras.jpg', stock:20, initialStock:20},
    {id:9,name:'Accesorios - Llaveros',price:1590,category:'Accesorios',img:'img/productos/accesorios/a_llaverosPokemon.jpg', stock:25, initialStock:25},
    {id:10,name:'Accesorios - Pines',price:990,category:'Accesorios',img:'img/productos/accesorios/a_pines.jpg', stock:50, initialStock:50},
    {id:11,name:'Comics - Avengers',price:2990,category:'Comics',img:'img/productos/comics/c_avengers.jpg', stock:7, initialStock:7},
    {id:12,name:'Comics - Batman',price:2990,category:'Comics',img:'img/productos/comics/c_batman.jpg', stock:7, initialStock:7},
    {id:13,name:'Comics - Spiderman',price:2990,category:'Comics',img:'img/productos/comics/c_spiderman.jpg', stock:7, initialStock:7},
    {id:14,name:'Comics - deadpool',price:2990,category:'Comics',img:'img/productos/comics/c_deadpool.jpg', stock:7, initialStock:7},
    {id:15,name:'Comics - young justice',price:2990,category:'Comics',img:'img/productos/comics/c_youngjustice.jpg', stock:7, initialStock:7},
    {id:16,name:'Mangas - Naruto',price:2990,category:'Mangas',img:'img/productos/mangas/m_naruto.jpg', stock:12, initialStock:12},
    {id:17,name:'Mangas - One Piece',price:2990,category:'Mangas',img:'img/productos/mangas/m_onepiece.jpg', stock:12, initialStock:12},
    {id:18,name:'Mangas - Kimetsu no Yaiba',price:2990,category:'Mangas',img:'img/productos/mangas/m_kimetsu.jpg', stock:12, initialStock:12},
    {id:19,name:'Mangas - Black Clover',price:2990,category:'Mangas',img:'img/productos/mangas/m_blackclover.jpg', stock:12, initialStock:12},
    {id:20,name:'Mangas - Jujutsu Kaisen',price:2990,category:'Mangas',img:'img/productos/mangas/m_jujutsu.jpg', stock:12, initialStock:12},
    {id:21,name:'Juegos - Catan',price:5990,category:'Juegos',img:'img/productos/juegos de mesa/j_catan.jpg', stock:4, initialStock:4},
    {id:22,name:'Juegos - La Mansion de la Locura',price:8990,category:'Juegos',img:'img/productos/juegos de mesa/j_lamansiondelalocura.jpg', stock:2, initialStock:2},
    {id:23,name:'Juegos - Nemesis',price:7990,category:'Juegos',img:'img/productos/juegos de mesa/j_nemesis.jpg', stock:0, initialStock:0},
    {id:24,name:'Juegos - Zombicide',price:6990,category:'Juegos',img:'img/productos/juegos de mesa/j_zombicide.jpg', stock:8, initialStock:8},
    {id:25,name:'Juegos - Rebellion Star Wars',price:10990,category:'Juegos',img:'img/productos/juegos de mesa/j_rebellionstarwars.jpg', stock:1, initialStock:1},
];

const state = {cart:{}};
const el = id => document.getElementById(id);
const money = v => '$' + Number(v).toLocaleString('es-AR');
// Al iniciar la app, cargamos el carrito guardado
loadCart();


// Categorías
const categorySet = new Set(products.map(p=>p.category));
categorySet.forEach(c=>{
  const opt = document.createElement('option');
  opt.value=c; opt.textContent=c;
  el('categoryFilter').appendChild(opt);
});

// ⭐ NUEVO: GENERAR MENSAJE DE STOCK
function getStockMessage(p) {
  if (p.stock <= 0) {
    return `<span class="text-danger fw-bold">Sin stock</span>`;
  }
  if (p.stock <= 3) {
    return `<span class="text-warning fw-bold">¡Pocas unidades disponibles!</span>`;
  }
  return `<span class="text-success fw-bold">Stock: ${p.stock}</span>`;
}

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

        <!-- Mensaje de stock -->
        <div class="mb-2">${getStockMessage(p)}</div>

        <button class="btn btn-sm btn-outline-light mt-auto addToCart"
          data-id="${p.id}"
          ${p.stock <= 0 ? "disabled" : ""}>
          <i class="bi bi-cart-plus"></i> Agregar
        </button>
      </div>
    `;

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
  <div>${item.name}</div>
  <div class="d-flex align-items-center">
    <button class="btn btn-sm btn-outline-light me-1 decreaseItem" data-id="${id}">-1</button>
    <span class="mx-2">${item.qty}</span>
    <button class="btn btn-sm btn-outline-light ms-1 increaseItem" data-id="${id}">+1</button>
    <span class="ms-3">${money(item.qty*item.price)}</span>
    <button class="btn btn-sm btn-link text-danger p-0 ms-2 removeItem" data-id="${id}">
      <i class="bi bi-x-circle"></i>
    </button>
  </div>`;

    container.appendChild(div);
  }
}

// 🛍 Eventos
document.addEventListener('click', e => {
  // ➕ Agregar al carrito desde catálogo
  if(e.target.closest('.addToCart')){
    const id = e.target.closest('.addToCart').dataset.id;
    const prod = products.find(p => p.id == id);

    if (prod.stock <= 0) {
      alert("No hay stock disponible.");
      return;
    }
    prod.stock--;

    if(!state.cart[id]) {
      state.cart[id] = { id: prod.id, name: prod.name, price: prod.price, qty: 1 };
    } else {
      state.cart[id].qty++;
    }

    updateCartDisplay();
    saveCart();
    renderProducts(products);
  }



  // ❌ Eliminar producto completo del carrito
  if(e.target.closest('.removeItem')){
    const id = e.target.closest('.removeItem').dataset.id;
    const prod = products.find(p => p.id == id);

    if(state.cart[id]){
      prod.stock += state.cart[id].qty;
      delete state.cart[id];
    }

    updateCartDisplay();
    renderProducts(products);
  }

  // ➕ Aumentar cantidad en carrito
  if(e.target.closest('.increaseItem')){
    const id = e.target.closest('.increaseItem').dataset.id;
    const prod = products.find(p => p.id == id);

    if(prod.stock <= 0){
      alert("No hay más stock disponible.");
      return;
    }

    prod.stock--;
    state.cart[id].qty++;

    updateCartDisplay();
    renderProducts(products);
  }

  // ➖ Disminuir cantidad en carrito
  if(e.target.closest('.decreaseItem')){
    const id = e.target.closest('.decreaseItem').dataset.id;
    const prod = products.find(p => p.id == id);

    state.cart[id].qty--;
    prod.stock++;

    if(state.cart[id].qty <= 0){
      delete state.cart[id];
    }

    updateCartDisplay();
    renderProducts(products);
  }
  // 🗑 Vaciar carrito
if(e.target.closest('#clearCart')){
  clearCart();
}

});


// 🔎 Filtros
el('search').addEventListener('input',filterProducts);
el('categoryFilter').addEventListener('change',filterProducts);
el('clearFilters').addEventListener('click',()=>{
  el('search').value=''; 
  el('categoryFilter').value=''; 
  renderProducts(products);
});

function filterProducts(){
  const q = el('search').value.toLowerCase();
  const cat = el('categoryFilter').value;
  const filtered = products.filter(p=>
    (!cat||p.category===cat)&&
    (!q||p.name.toLowerCase().includes(q))
  );
  renderProducts(filtered);
}

// 🌐 Navegación por la barra superior
el('navInicio').onclick = (e) => { e.preventDefault(); showPage('catalogPage'); };
el('navCheckout').onclick = (e) => { e.preventDefault(); showPage('checkoutPage'); renderCheckoutSummary(); };
el('navContacto').onclick = (e) => { e.preventDefault(); showPage('contactPage'); };
el('navHome').onclick = (e) => { e.preventDefault(); showPage('catalogPage'); };

const offcanvas = new bootstrap.Offcanvas('#offcanvasCart');
el('openCart').onclick=()=>offcanvas.show();
el('goToCheckout').onclick=()=>{offcanvas.hide(); showPage('checkoutPage'); renderCheckoutSummary();};
el('openCheckout').onclick=()=>showPage('checkoutPage');
el('backToShop').onclick=()=>showPage('catalogPage');
el('clearCart').onclick=()=>{state.cart={};updateCartDisplay();};
el('openContact').onclick = () => showPage('contactPage');
el('backToShopFromContact').onclick = () => showPage('catalogPage');

// Formulario contacto
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

// Checkout
function renderCheckoutSummary(){
  const cart = state.cart;
  const container = el('checkoutSummary');
  container.innerHTML='';
  if(Object.keys(cart).length===0){container.innerHTML='<p>No hay productos.</p>';return;}
  let total=0;
  for(const id in cart){
    const i=cart[id];
    total+=i.qty*i.price;
    container.innerHTML+=`<div class="d-flex justify-content-between mb-1">
      <div>${i.name} x${i.qty}</div>
      <div>${money(i.qty*i.price)}</div>
    </div>`;
  }
  container.innerHTML+=`<hr><div class="d-flex justify-content-between">
    <strong>Total</strong><strong>${money(total)}</strong></div>`;
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
    col.innerHTML=`<div class='rec-card p-2 rounded text-start' style='background:var(--glass)'>
      <img src='${p.img}' class='img-fluid rounded mb-2'>
      <h6>${p.name}</h6>
      <small class='text-muted'>${money(p.price)}</small>
    </div>`;
    rec.appendChild(col);
  });
}

function showPage(id){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  el(id).classList.add('active');
}

// Guardar carrito en localStorage
function saveCart(){
  localStorage.setItem('cart', JSON.stringify(state.cart));
}

// Cargar carrito desde localStorage y ajustar stock
function loadCart(){
  const savedCart = localStorage.getItem('cart');
  if(savedCart){
    state.cart = JSON.parse(savedCart);

    // 🔧 Recalcular stock según lo que ya está en el carrito
    products.forEach(p => {
      const item = state.cart[p.id];
      if(item){
        p.stock -= item.qty;
      }
    });
  }

  updateCartDisplay();
  renderProducts(products);
}

// Renderizar carrito y mostrar subtotal
function updateCartDisplay(){
  const container = el('cartItems');
  container.innerHTML = '';

  // Render de ítems del carrito
  for(const id in state.cart){
    const item = state.cart[id];

    const row = document.createElement('div');
    row.className = 'd-flex justify-content-between align-items-center py-2 border-bottom';
    row.innerHTML = `
      <div class="d-flex flex-column">
        <strong>${item.name}</strong>
        <small>${money(item.price)} x ${item.qty}</small>
      </div>
      <div class="d-flex align-items-center gap-2">
        <button class="btn btn-sm btn-outline-light decreaseItem" data-id="${item.id}">−</button>
        <span>${item.qty}</span>
        <button class="btn btn-sm btn-outline-light increaseItem" data-id="${item.id}">+</button>
        <button class="btn btn-sm btn-outline-danger removeItem" data-id="${item.id}">❌</button>
      </div>
    `;
    container.appendChild(row);
  }

  // Subtotal (sin envío)
  const subtotalEl = el('cartTotal');
  if(subtotalEl){
    const subtotal = getCartSubtotal();
    subtotalEl.textContent = money(subtotal);
  }

  // Contador del carrito (el badge en el ícono)
  const cartCountEl = el('cartCount');
  if(cartCountEl){
    const count = Object.values(state.cart).reduce((acc, it) => acc + it.qty, 0);
    cartCountEl.textContent = count;
  }
}

// Calcular subtotal del carrito
function getCartSubtotal(){
  let total = 0;
  for (const id in state.cart){
    const item = state.cart[id];
    total += item.price * item.qty;
  }
  return total;
}

// 🗑 Vaciar carrito
function clearCart(){
  // Vaciar carrito en memoria
  state.cart = {};

  // Restaurar stock inicial
  products.forEach(p => {
    p.stock = p.initialStock; // 
  });

  // Borrar carrito en localStorage
  localStorage.removeItem('cart');

  // Actualizar interfaz
  updateCartDisplay();
  renderProducts(products);
}
