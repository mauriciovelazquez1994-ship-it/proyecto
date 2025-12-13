//Productos
const products = [
  { id: 1, name: 'Figura - Asta', price: 6990, category: 'Figuras', img: 'img/productos/figuras/f_asta.jpg', stock: 8, initialStock: 8 },
  { id: 2, name: 'Figura - Bersek', price: 6990, category: 'Figuras', img: 'img/productos/figuras/f_bersek.webp', stock: 5, initialStock: 5 },
  { id: 3, name: 'Figura - Goku', price: 6990, category: 'Figuras', img: 'img/productos/figuras/f_dbz.webp', stock: 10, initialStock: 10 },
  { id: 4, name: 'Figura - Luffy', price: 6990, category: 'Figuras', img: 'img/productos/figuras/f_onepiece.jpg', stock: 4, initialStock: 4 },
  { id: 5, name: 'Figura - Ichigo', price: 6990, category: 'Figuras', img: 'img/productos/figuras/f_ichigo.jpg', stock: 3, initialStock: 3 },
  { id: 6, name: 'Accesorios - Mochila', price: 1290, category: 'Accesorios', img: 'img/productos/accesorios/a_mochilas.avif', stock: 15, initialStock: 15 },
  { id: 7, name: 'Accesorios - Gorras', price: 1590, category: 'Accesorios', img: 'img/productos/accesorios/a_gorra.jpg', stock: 6, initialStock: 6 },
  { id: 8, name: 'Accesorios - Kit Kimetsu', price: 7990, category: 'Accesorios', img: 'img/productos/accesorios/a_kny.avif', stock: 20, initialStock: 20 },
  { id: 9, name: 'Accesorios - Llaveros', price: 1590, category: 'Accesorios', img: 'img/productos/accesorios/a_llavero.jpg', stock: 25, initialStock: 25 },
  { id: 10, name: 'Accesorios - Pines', price: 990, category: 'Accesorios', img: 'img/productos/accesorios/a_plantilla.jpg', stock: 50, initialStock: 50 },
  { id: 11, name: 'Comics - Iron Man', price: 2990, category: 'Comics', img: 'img/productos/comics/c_ironman.jpg', stock: 7, initialStock: 7 },
  { id: 12, name: 'Comics - Batman', price: 2990, category: 'Comics', img: 'img/productos/comics/c_joker.webp', stock: 7, initialStock: 7 },
  { id: 13, name: 'Comics - Spiderman', price: 2990, category: 'Comics', img: 'img/productos/comics/c_spiderman.webp', stock: 7, initialStock: 7 },
  { id: 14, name: 'Comics - deadpool', price: 2990, category: 'Comics', img: 'img/productos/comics/c_dep.jpg', stock: 7, initialStock: 7 },
  { id: 15, name: 'Comics - Green Arrow', price: 2990, category: 'Comics', img: 'img/productos/comics/c_green.jpg', stock: 7, initialStock: 7 },
  { id: 16, name: 'Mangas - Naruto', price: 2990, category: 'Mangas', img: 'img/productos/mangas/m_nar.jpg', stock: 12, initialStock: 12 },
  { id: 17, name: 'Mangas - One Piece', price: 2990, category: 'Mangas', img: 'img/productos/mangas/m_on.webp', stock: 12, initialStock: 12 },
  { id: 18, name: 'Mangas - Kimetsu no Yaiba', price: 2990, category: 'Mangas', img: 'img/productos/mangas/m_kny.jpg', stock: 12, initialStock: 12 },
  { id: 19, name: 'Mangas - Black Clover', price: 2990, category: 'Mangas', img: 'img/productos/mangas/m_bc.jpg', stock: 12, initialStock: 12 },
  { id: 20, name: 'Mangas - Jujutsu Kaisen', price: 2990, category: 'Mangas', img: 'img/productos/mangas/m_juju.webp', stock: 12, initialStock: 12 },
  { id: 21, name: 'Juegos - Catan', price: 5990, category: 'Juegos', img: 'img/productos/juegos de mesa/j_cat.webp', stock: 4, initialStock: 4 },
  { id: 22, name: 'Juegos - La Mansion de la Locura', price: 8990, category: 'Juegos', img: 'img/productos/juegos de mesa/j_mad.jpg', stock: 2, initialStock: 2 },
  { id: 23, name: 'Juegos - Nemesis', price: 7990, category: 'Juegos', img: 'img/productos/juegos de mesa/j_nem.webp', stock: 0, initialStock: 0 },
  { id: 24, name: 'Juegos - Zombicide', price: 6990, category: 'Juegos', img: 'img/productos/juegos de mesa/j_zom.avif', stock: 8, initialStock: 8 },
  { id: 25, name: 'Juegos - Rebellion Star Wars', price: 10990, category: 'Juegos', img: 'img/productos/juegos de mesa/j_reb.jpg', stock: 1, initialStock: 1 },
];

const state = { cart: {} };
const el = id => document.getElementById(id);
const money = v => '$' + Number(v).toLocaleString('es-AR');
loadCart();


// Categorías
const categorySet = new Set(products.map(p => p.category));
categorySet.forEach(c => {
  const opt = document.createElement('option');
  opt.value = c; opt.textContent = c;
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
function renderProducts(list) {
  const grid = el('productGrid');
  grid.innerHTML = '';
  list.forEach(p => {
    const col = document.createElement('div');
    col.className = 'col-sm-6 col-md-4 col-lg-3';

    col.innerHTML = `
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
function updateCartDisplay() {

  const cart = state.cart;
  const count = Object.values(cart).reduce((a, b) => a + b.qty, 0);
  const total = Object.values(cart).reduce((a, b) => a + b.qty * b.price, 0);
  el('cartCount').textContent = count;
  el('cartTotal').textContent = money(total);
  const container = el('cartItems');
  container.innerHTML = '';
  if (count === 0) { container.innerHTML = '<p class="text-muted">Carrito vacío</p>'; return; }
  for (const id in cart) {
    const item = cart[id];
    const div = document.createElement('div');
    div.className = 'd-flex justify-content-between align-items-center mb-2';
    div.innerHTML = `
  <div>${item.name}</div>
  <div class="d-flex align-items-center">
    <button class="btn btn-sm btn-outline-light me-1 decreaseItem" data-id="${id}">-1</button>
    <span class="mx-2">${item.qty}</span>
    <button class="btn btn-sm btn-outline-light ms-1 increaseItem" data-id="${id}">+1</button>
    <span class="ms-3">${money(item.qty * item.price)}</span>
    <button class="btn btn-sm btn-link text-danger p-0 ms-2 removeItem" data-id="${id}">
      <i class="bi bi-x-circle"></i>
    </button>
  </div>`;

    container.appendChild(div);
  }
}
window.shippingCost = 0;


// ===================== EVENTOS DEL CARRITO =====================
document.addEventListener('click', e => {
  // ➕ Agregar al carrito
  if (e.target.closest('.addToCart')) {
    const id = e.target.closest('.addToCart').dataset.id;
    const prod = products.find(p => p.id == id);
    if (prod.stock <= 0) return alert("No hay stock disponible.");
    prod.stock--;
    state.cart[id] = state.cart[id]
      ? { ...state.cart[id], qty: state.cart[id].qty + 1 }
      : { id: prod.id, name: prod.name, price: prod.price, qty: 1 };
    updateCartDisplay();
    saveCart();
    renderProducts(products);
  }

  // ❌ Eliminar producto
  if (e.target.closest('.removeItem')) {
    const id = e.target.closest('.removeItem').dataset.id;
    const prod = products.find(p => p.id == id);
    if (state.cart[id]) {
      prod.stock += state.cart[id].qty;
      delete state.cart[id];
    }
    updateCartDisplay();
    renderProducts(products);
  }

  // ➕ Aumentar cantidad
  if (e.target.closest('.increaseItem')) {
    const id = e.target.closest('.increaseItem').dataset.id;
    const prod = products.find(p => p.id == id);
    if (prod.stock <= 0) return alert("No hay más stock.");
    prod.stock--;
    state.cart[id].qty++;
    updateCartDisplay();
    renderProducts(products);
  }

  // ➖ Disminuir cantidad
  if (e.target.closest('.decreaseItem')) {
    const id = e.target.closest('.decreaseItem').dataset.id;
    const prod = products.find(p => p.id == id);
    state.cart[id].qty--;
    prod.stock++;
    if (state.cart[id].qty <= 0) delete state.cart[id];
    updateCartDisplay();
    renderProducts(products);
  }

  // 🗑 Vaciar carrito
  if (e.target.closest('#clearCart')) {
    clearCart();
  }

  // 🚚 Calcular envío por CP (solo si está seleccionado "Envío a domicilio")
  if (e.target.closest('#calcShipping')) {
    const zip = el('zipInput').value.trim();
    const isDelivery = el('deliveryOption').checked;

    if (!isDelivery) {
      el('shippingResult').textContent = "Seleccione 'Envío a domicilio' para calcular.";
      return;
    }

    if (zip) {
      const envio = getShippingByDepartment(zip);
      window.shippingCost = envio.precio;

      el('shippingResult').textContent = `Envío a ${envio.departamento}: ${money(shippingCost)}`;
      updateTotalWithShipping();
    } else {
      el('shippingResult').textContent = "Ingrese código postal para calcular envío.";
    }
  }

  // 🏬 Retiro en tienda
  if (e.target.closest('#pickupOption')) {
    window.shippingCost = 0;

    el('shippingResult').textContent = "Retiro en tienda seleccionado (Gratis)";
    updateTotalWithShipping();
  }

  // 🏠 Envío a domicilio (actualiza envío si ya hay CP cargado)
  if (e.target.closest('#deliveryOption')) {
    const zip = el('zipInput').value.trim();
    if (zip) {
      const envio = getShippingByDepartment(zip);
      window.shippingCost = envio.precio;

      el('shippingResult').textContent = `Envío a ${envio.departamento}: ${money(shippingCost)}`;
      updateTotalWithShipping();
    } else {
      el('shippingResult').textContent = "Ingrese código postal para calcular envío.";
    }
  }
});



// ===================== FILTROS =====================
el('search').addEventListener('input', filterProducts);
el('categoryFilter').addEventListener('change', filterProducts);
//el('clearFilters').addEventListener('click', () => {
//  el('search').value = '';
 // el('categoryFilter').value = '';
//  renderProducts(products);
//});

function filterProducts() {
  const q = el('search').value.toLowerCase();
  const cat = el('categoryFilter').value;
  const filtered = products.filter(p =>
    (!cat || p.category === cat) &&
    (!q || p.name.toLowerCase().includes(q))
  );
  renderProducts(filtered);
}


// ===================== NAVEGACIÓN =====================
el('navInicio').onclick = (e) => { e.preventDefault(); showPage('catalogPage'); };
el('navCheckout').onclick = (e) => { e.preventDefault(); showPage('checkoutPage'); renderCheckoutSummary(); };
el('navContacto').onclick = (e) => { e.preventDefault(); showPage('contactPage'); };
el('navHome').onclick = (e) => { e.preventDefault(); showPage('catalogPage'); };

const offcanvas = new bootstrap.Offcanvas('#offcanvasCart');
el('openCart').onclick = () => offcanvas.show();
el('goToCheckout').onclick = () => { offcanvas.hide(); showPage('checkoutPage'); renderCheckoutSummary(); };
//el('openCheckout').onclick = () => showPage('checkoutPage');
el('backToShop').onclick = () => showPage('catalogPage');
el('clearCart').onclick = () => { state.cart = {}; updateCartDisplay(); };
//el('openContact').onclick = () => showPage('contactPage');
el('backToShopFromContact').onclick = () => showPage('catalogPage');


// ===================== CONTACTO =====================
console.log("JS inicializado ✅");
el('contactForm').onsubmit = e => {
  e.preventDefault();
  alert('Tu mensaje fue enviado correctamente, espere a la brevedad una respuesta');
  showPage('catalogPage'); // vuelve al catálogo después de enviar
};

// ===================== CHECKOUT =====================
function renderCheckoutSummary() {
  const cart = state.cart;
  const container = el('checkoutSummary');
  container.innerHTML = '';
  if (Object.keys(cart).length === 0) {
    container.innerHTML = '<p>No hay productos.</p>';
    return;
  }
  let total = 0;
  for (const id in cart) {
    const i = cart[id];
    total += i.qty * i.price;
    container.innerHTML += `<div class="d-flex justify-content-between mb-1">
      <div>${i.name} x${i.qty}</div>
      <div>${money(i.qty * i.price)}</div>
    </div>`;
  }
  container.innerHTML += `<hr><div class="d-flex justify-content-between">
    <strong>Total</strong><strong>${money(total)}</strong></div>`;
}

// Evento de envío del checkout
el('checkoutForm').onsubmit = e => {
  e.preventDefault();
  console.log("✅ Evento submit disparado");

  if (Object.keys(state.cart).length === 0) {
    alert('Tu carrito está vacío');
    return;
  }

  const orderNum = 'AN-' + Math.floor(Math.random() * 1000000);
  const orderEl = el('orderNumber');
  if (orderEl) {
    orderEl.innerHTML = `<span class="order-highlight">
  Tu compra fue exitosa, número de pedido: ${orderNum}
</span>`;

  }

  showPage('successPage');
  console.log("✅ Página de éxito activada");

  state.cart = {};
  updateCartDisplay();
  renderCheckoutSummary();
  renderRecommendations();
};

// Botones de navegación
el('backToShop').onclick = () => showPage('catalogPage');
el('continueShopping').onclick = () => showPage('catalogPage');


// ===================== RECOMENDACIONES =====================
function renderRecommendations() {
  const rec = el('recommendations');
  rec.innerHTML = '';
  const random = products.sort(() => 0.5 - Math.random()).slice(0, 4);
  random.forEach(p => {
    const col = document.createElement('div');
    col.className = 'col-6 col-md-3';
    col.innerHTML = `<div class='rec-card p-2 rounded text-start' style='background:var(--glass)'>
      <img src='${p.img}' class='img-fluid rounded mb-2'>
      <h6>${p.name}</h6>
      <small class='text-muted'>${money(p.price)}</small>
    </div>`;
    rec.appendChild(col);
  });
}

// ===================== CAMBIO DE PÁGINA =====================
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  el(id).classList.add('active');
}


// ===================== FUNCIONES DEL CARRITO =====================
window.shippingCost = 0;


function saveCart() {
  localStorage.setItem('cart', JSON.stringify(state.cart));
}

function loadCart() {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    state.cart = JSON.parse(savedCart);
    products.forEach(p => {
      const item = state.cart[p.id];
      if (item) p.stock -= item.qty;
    });
  }
  updateCartDisplay();
  renderProducts(products);
}

function updateCartDisplay() {
  const container = el('cartItems');
  container.innerHTML = '';

  for (const id in state.cart) {
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

  const subtotalEl = el('cartTotal');
  if (subtotalEl) subtotalEl.textContent = money(getCartSubtotal());

  const cartCountEl = el('cartCount');
  if (cartCountEl) {
    const count = Object.values(state.cart).reduce((acc, it) => acc + it.qty, 0);
    cartCountEl.textContent = count;
  }
}

// 🛒 Calcular subtotal del carrito
function getCartSubtotal() {
  return Object.values(state.cart).reduce((total, item) => total + item.price * item.qty, 0);
}

// 🚚 Lógica local por departamento
function getShippingByDepartment(zip) {
  const zonas = {
    'Capital': [5500, 5502],
    'Godoy Cruz': [5503, 5501],
    'Maipú': [5515, 5517, 5513, 5511],
    'Luján': [5509, 5505],
    'Guaymallén': [5519, 5521],
    'Las Heras': [5539, 5541],
    'San Martín': [5570, 5571],
    'Tunuyán': [5560],
    'General Alvear': [5620],
    'Malargüe': [5613],
    'San Rafael': [5600]
  };

  const precios = {
    'Capital': 1500,
    'Godoy Cruz': 1700,
    'Maipú': 2500,
    'Luján': 2200,
    'Guaymallén': 1800,
    'Las Heras': 2000,
    'San Martín': 2700,
    'Tunuyán': 3000,
    'General Alvear': 3200,
    'Malargüe': 3500,
    'San Rafael': 2800,
    'Otro': 4000
  };

  zip = parseInt(zip);
  for (const depto in zonas) {
    if (zonas[depto].includes(zip)) {
      return { departamento: depto, precio: precios[depto] };
    }
  }
  return { departamento: 'Otro', precio: precios['Otro'] };
}

// Actualizar total con envío
function updateTotalWithShipping() {
  const subtotal = getCartSubtotal();
  const totalEl = el('cartTotalWithShipping');
  if (totalEl) totalEl.textContent = money(subtotal + shippingCost);
}

// 🗑 Vaciar carrito
function clearCart() {
  state.cart = {};
  products.forEach(p => p.stock = p.initialStock);
  localStorage.removeItem('cart');
  updateCartDisplay();
  renderProducts(products);
}
// ===================== INICIALIZACIÓN =====================
loadCart();
renderProducts(products);

// ===================== TESTEO Y AUTOCOMPLETADO DE ENVÍO =====================

// Test manual desde consola
function testEnvio(zip) {
  if (!zip || isNaN(parseInt(zip))) {
    console.warn("Código postal inválido.");
    return;
  }
  const envio = getShippingByDepartment(zip);
  window.shippingCost = envio.precio;

  el('shippingResult').textContent = `Envío a ${envio.departamento}: ${money(shippingCost)}`;
  updateTotalWithShipping();
}

// Guardar CP en localStorage
el('zipInput').addEventListener('input', () => {
  const zip = el('zipInput').value.trim();
  if (zip.length >= 4) localStorage.setItem('userZip', zip);
});

// Autocompletar CP al cargar
window.addEventListener('DOMContentLoaded', () => {
  const savedZip = localStorage.getItem('userZip');
  if (savedZip) el('zipInput').value = savedZip;
});

// Actualizar envío automáticamente si hay CP y está seleccionado "Envío a domicilio"
el('zipInput').addEventListener('input', () => {
  const zip = el('zipInput').value.trim();
  if (el('deliveryOption').checked && zip.length >= 4) {
    const envio = getShippingByDepartment(zip);
    window.shippingCost = envio.precio;

    el('shippingResult').textContent = `Envío a ${envio.departamento}: ${money(shippingCost)}`;
    updateTotalWithShipping();
  }
});

