"use strict";

/* =========================================================
   1. CONFIGURAÇÃO DA API
   =========================================================

   O site funciona imediatamente no modo "demo".

   Para conectar um backend real:

   window.PRIMARYFIT_API.mode = "real";
   window.PRIMARYFIT_API.baseURL = "https://seu-backend.com/api";

   Depois, os métodos da API abaixo podem consumir seus endpoints.

   Endpoints sugeridos:

   GET    /products
   GET    /products/:id
   POST   /orders
   POST   /auth/login
   POST   /auth/register
   POST   /newsletter
   POST   /shipping/calculate

   ========================================================= */

window.PRIMARYFIT_API = {
  mode:"demo",
  baseURL:"",
  version:"v1"
};

/* =========================================================
   2. BANCO LOCAL / STORAGE
   ========================================================= */

const STORAGE = {
  cart:"primaryfit_cart_v51",
  favorites:"primaryfit_favorites_v51",
  user:"primaryfit_user_v51",
  orders:"primaryfit_orders_v51",
  theme:"primaryfit_theme_v51",
  cookies:"primaryfit_cookies_v51",
  coupon:"primaryfit_coupon_v51",
  newsletter:"primaryfit_newsletter_v51",
  viewed:"primaryfit_viewed_v51"
};

function readStorage(key,fallback){
  try{
    const value=localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  }catch{
    return fallback;
  }
}

function writeStorage(key,value){
  localStorage.setItem(key,JSON.stringify(value));
}

/* =========================================================
   3. CATÁLOGO
   ========================================================= */

const seeds = [

  {
    base:"Tênis Thunder Run",
    category:"Corrida",
    brand:"PrimaryFit",
    price:399.90,
    image:"assets/images/produtos/tenis-thunder-run.jpg",
    variantImages:[
      "assets/images/produtos/Tenis Thunder Run Azul.png",
      "assets/images/produtos/Tenis Thunder Run Preto.png",
      "assets/images/produtos/tenis-thunder-run.jpg"
    ],
    colors:["Azul","Preto","Original"],
    colorImages:{
      "Azul":"assets/images/produtos/Tenis Thunder Run Azul.png",
      "Preto":"assets/images/produtos/Tenis Thunder Run Preto.png",
      "Original":"assets/images/produtos/tenis-thunder-run.jpg"
    },
    desc:"Tênis esportivo com amortecimento responsivo para treinos e corridas."
  },

  {
    base:"Chuteira Storm Speed",
    category:"Futebol",
    brand:"PrimaryFit",
    price:459.90,
    image:"assets/images/produtos/chuteira-storm-speed.jpg",
    desc:"Chuteira leve para jogadores que buscam velocidade e controle."
  },

  {
    base:"Camiseta Performance",
    category:"Academia",
    brand:"PrimaryFit",
    price:119.90,
    image:"assets/images/produtos/camiseta-performance.jpg",
    desc:"Camiseta esportiva de secagem rápida para treinos intensos."
  },
 
  {
    base:"Regata Power",
    category:"Academia",
    brand:"PrimaryFit",
    price:99.90,
    image:"assets/images/produtos/regata-power.png",
    desc:"Regata leve com corte atlético para musculação e treinamento."
  },

  {
    base:"Short Training",
    category:"Fitness",
    brand:"UrbanSport",
    price:89.90,
    image:"assets/images/produtos/short-training.jpg",
    desc:"Short esportivo com liberdade de movimento."
  },

  {
    base:"Tênis Gym Force",
    category:"Academia",
    brand:"Nike",
    price:499.90,
    image:"assets/images/produtos/tenis-gym-force.jpg",
    desc:"Tênis estável para musculação e treinamento funcional."
  },

  {
    base:"Tênis Street Basketball",
    category:"Basquete",
    brand:"PrimaryFit",
    price:529.90,
    image:"assets/images/produtos/tenis-street-basketball.jpg",
    desc:"Modelo de cano médio inspirado no basquete urbano."
  },

  {
    base:"Bola Pro Match",
    category:"Futebol",
    brand:"Adidas",
    price:179.90,
    image:"assets/images/produtos/bola-pro-match.jpg",
    desc:"Bola esportiva para partidas e treinamentos."
  },

  {
    base:"Legging Compression",
    category:"Fitness",
    brand:"Puma",
    price:159.90,
    image:"assets/images/produtos/legging-compression.png",
    desc:"Legging de compressão com tecido confortável."
  },

  {
    base:"Top Performance",
    category:"Fitness",
    brand:"UrbanSport",
    price:109.90,
    image:"assets/images/produtos/top-performance.png",
    colors:["Preto","Branco"],
    colorImages:{
      "Preto":"assets/images/produtos/top-performance.png",
      "Branco":"assets/images/produtos/top-performance-branco.png"
    },
    desc:"Top esportivo para atividades de alta intensidade."
  },

  {
    base:"Óculos Hydro Vision",
    category:"Natação",
    brand:"PrimaryFit",
    price:129.90,
    image:"assets/images/produtos/oculos-hydro-vision.png",
    desc:"Óculos de natação com visão ampla e ajuste confortável."
  },

  {
    base:"Touca Swim Pro",
    category:"Natação",
    brand:"PrimaryFit",
    price:49.90,
    image:"assets/images/produtos/touca-swim-pro-preta.png",
    colors:["Preto","Branco"],
    colorImages:{
      "Preto":"assets/images/produtos/touca-swim-pro-preta.png",
      "Branco":"assets/images/produtos/touca-swim-pro-branca.png"
    },
    desc:"Touca esportiva para treinos e competição."
  },

  {
    base:"Mochila Athlete",
    category:"Fitness",
    brand:"PrimaryFit",
    price:189.90,
    image:"assets/images/produtos/mochila-athlete.jpg",
    desc:"Mochila esportiva com compartimentos para rotina e academia."
  },

  {
    base:"Garrafa Hydro Steel",
    category:"Fitness",
    brand:"PrimaryFit",
    price:79.90,
    image:"assets/images/produtos/garrafa-hydro-steel.jpg",
    desc:"Garrafa reutilizável para hidratação durante o treino."
  },

  {
    base:"Meia Performance",
    category:"Corrida",
    brand:"PrimaryFit",
    price:39.90,
    image:"assets/images/produtos/meia-performance.jpg",
    desc:"Meia esportiva confortável para corridas e academia."
  },

  {
    base:"Jaqueta Wind Pro",
    category:"Corrida",
    brand:"Nike",
    price:349.90,
    image:"assets/images/produtos/jaqueta-wind-pro.png",
    desc:"Jaqueta leve para atividades externas."
  },

  {
    base:"Bermuda Football Elite",
    category:"Futebol",
    brand:"Adidas",
    price:129.90,
    image:"assets/images/produtos/bermuda-football-elite.jpg",
    desc:"Bermuda esportiva para futebol e treinamento."
  },

  {
    base:"Munhequeira Power",
    category:"Academia",
    brand:"PrimaryFit",
    price:44.90,
    image:"assets/images/produtos/Munhequeira power.jpg",
    desc:"Munhequeira para suporte e conforto durante o treino."
  },

  {
    base:"Corda Speed Rope",
    category:"Fitness",
    brand:"UrbanSport",
    price:69.90,
    image:"assets/images/produtos/corda-speed-rope.jpg",
    desc:"Corda de velocidade para cardio e treinamento."
  },

  {
    base:"Luvas Training Grip",
    category:"Academia",
    brand:"Puma",
    price:89.90,
    image:"assets/images/produtos/Luvas Training Grip.jpg",
    desc:"Luvas de treino com aderência para musculação."
  }

];

const variants = [
  {
    suffix:"Core",
    priceFactor:1,
    badge:"NOVO"
  },
  {
    suffix:"Pro",
    priceFactor:1.18,
    badge:"PRO"
  },
  {
    suffix:"Elite",
    priceFactor:1.35,
    badge:"ELITE"
  }
];

let products = [];

seeds.forEach((seed,index)=>{

  variants.forEach((variant,vIndex)=>{

    products.push({
      id:`PF-${String(index+1).padStart(2,"0")}-${vIndex+1}`,
      name:`${seed.base} ${variant.suffix}`,
      category:seed.category,
      brand:seed.brand,
      price:Number((seed.price*variant.priceFactor).toFixed(2)),
      oldPrice:Number((seed.price*variant.priceFactor*1.22).toFixed(2)),
      rating:Number((4.6 + ((index+vIndex)%4)*.1).toFixed(1)),
      reviews:Math.floor(35+index*17+vIndex*23),
      badge:variant.badge,
      image:seed.variantImages?.[vIndex] || seed.image,
      description:seed.desc,
      stock:Math.floor(4+((index*7+vIndex*3)%18)),
      colors:seed.colors || ["Preto","Azul","Branco"],
      colorImages:seed.colorImages || null,
      sizes:["P","M","G","GG"],
      created:index*3+vIndex
    });

  });

});

/* =========================================================
   4. API DEMO
   ========================================================= */

const DemoAPI = {

  async getProducts(){
    await delay(120);
    return [...products];
  },

  async getProduct(id){
    await delay(100);
    return products.find(p=>p.id===id) || null;
  },

  async login(email,password){

    await delay(400);

    if(!email || !password){
      throw new Error("Preencha todos os campos.");
    }

    const user={
      id:"USR-"+Date.now(),
      name:email.split("@")[0],
      email,
      createdAt:new Date().toISOString()
    };

    writeStorage(STORAGE.user,user);

    return user;
  },

  async register(name,email,password){

    await delay(500);

    if(!name || !email || !password){
      throw new Error("Preencha todos os campos.");
    }

    const user={
      id:"USR-"+Date.now(),
      name,
      email,
      createdAt:new Date().toISOString()
    };

    writeStorage(STORAGE.user,user);

    return user;
  },

  async createOrder(order){

    await delay(500);

    const orders=readStorage(STORAGE.orders,[]);

    const newOrder={
      ...order,
      id:"PF"+Date.now().toString().slice(-8),
      status:"Pagamento aprovado — pedido confirmado",
      createdAt:new Date().toISOString()
    };

    orders.unshift(newOrder);

    writeStorage(STORAGE.orders,orders);

    return newOrder;
  },

  async subscribe(email){

    await delay(300);

    const list=readStorage(STORAGE.newsletter,[]);

    if(!list.includes(email)){
      list.push(email);
    }

    writeStorage(STORAGE.newsletter,list);

    return true;
  },

  async calculateShipping(cep){

    await delay(350);

    const clean=String(cep).replace(/\D/g,"");

    if(clean.length!==8){
      throw new Error("Digite um CEP válido.");
    }

    const first=Number(clean.slice(0,2));

    let price=24.90;

    if(first>=1 && first<=19) price=14.90;
    else if(first>=20 && first<=39) price=18.90;
    else if(first>=40 && first<=59) price=22.90;
    else if(first>=60 && first<=79) price=26.90;
    else price=29.90;

    return {
      price,
      deadline:first<=39 ? "2 a 5 dias úteis" : "4 a 8 dias úteis"
    };
  }

};

function delay(ms){
  return new Promise(resolve=>setTimeout(resolve,ms));
}

const API = {

  async getProducts(){

    if(window.PRIMARYFIT_API.mode==="real"){

      const response=await fetch(
        `${window.PRIMARYFIT_API.baseURL}/products`
      );

      if(!response.ok){
        throw new Error("Não foi possível carregar os produtos.");
      }

      return response.json();
    }

    return DemoAPI.getProducts();
  },

  async getProduct(id){

    if(window.PRIMARYFIT_API.mode==="real"){

      const response=await fetch(
        `${window.PRIMARYFIT_API.baseURL}/products/${encodeURIComponent(id)}`
      );

      if(!response.ok){
        throw new Error("Produto não encontrado.");
      }

      return response.json();
    }

    return DemoAPI.getProduct(id);
  },

  async login(email,password){

    if(window.PRIMARYFIT_API.mode==="real"){

      const response=await fetch(
        `${window.PRIMARYFIT_API.baseURL}/auth/login`,
        {
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({email,password})
        }
      );

      if(!response.ok){
        throw new Error("Falha no login.");
      }

      return response.json();
    }

    return DemoAPI.login(email,password);
  },

  async register(name,email,password){

    if(window.PRIMARYFIT_API.mode==="real"){

      const response=await fetch(
        `${window.PRIMARYFIT_API.baseURL}/auth/register`,
        {
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({name,email,password})
        }
      );

      if(!response.ok){
        throw new Error("Falha no cadastro.");
      }

      return response.json();
    }

    return DemoAPI.register(name,email,password);
  },

  async createOrder(order){

    if(window.PRIMARYFIT_API.mode==="real"){

      const response=await fetch(
        `${window.PRIMARYFIT_API.baseURL}/orders`,
        {
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify(order)
        }
      );

      if(!response.ok){
        throw new Error("Não foi possível criar o pedido.");
      }

      return response.json();
    }

    return DemoAPI.createOrder(order);
  },

  async subscribe(email){

    if(window.PRIMARYFIT_API.mode==="real"){

      const response=await fetch(
        `${window.PRIMARYFIT_API.baseURL}/newsletter`,
        {
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({email})
        }
      );

      if(!response.ok){
        throw new Error("Não foi possível realizar a inscrição.");
      }

      return response.json();
    }

    return DemoAPI.subscribe(email);
  },

  async calculateShipping(cep){

    if(window.PRIMARYFIT_API.mode==="real"){

      const response=await fetch(
        `${window.PRIMARYFIT_API.baseURL}/shipping/calculate`,
        {
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({cep})
        }
      );

      if(!response.ok){
        throw new Error("Falha no cálculo do frete.");
      }

      return response.json();
    }

    return DemoAPI.calculateShipping(cep);
  }

};

/* =========================================================
   5. ESTADO
   ========================================================= */

let cart=readStorage(STORAGE.cart,[]);
let favorites=readStorage(STORAGE.favorites,[]);
let currentShipping=0;
let shippingDeadline="";
let activeCoupon=readStorage(STORAGE.coupon,null);
let compareList=[];
let currentProduct=null;
let modalQuantity=1;
let checkoutStep=1;
let checkoutData={};

let filters={
  category:"Todos",
  brands:[],
  minPrice:0,
  maxPrice:Infinity,
  rating:0,
  sort:"relevance"
};

/* =========================================================
   6. HELPERS
   ========================================================= */

function money(value){
  return new Intl.NumberFormat("pt-BR",{
    style:"currency",
    currency:"BRL"
  }).format(value);
}

function stars(rating){
  const full=Math.floor(rating);
  let html="";

  for(let i=0;i<5;i++){
    html+=i<full ? "★" : "☆";
  }

  return html;
}

function escapeHtml(value){
  return String(value)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

function productImageMarkup(product,alt="",loading=""){
  if(!product.image) return "";
  const loadingAttribute=loading ? ` loading="${loading}"` : "";
  return `<img src="${escapeHtml(product.image)}" alt="${escapeHtml(alt)}"${loadingAttribute}>`;
}
/* =========================================================
   7. RENDER PRODUTOS
   ========================================================= */

function productCard(product){

  const isFavorite=favorites.includes(product.id);

  return `
    <article class="product-card">

      <div class="product-image">

        <span class="badge ${product.badge==="NOVO" ? "new" : product.badge==="PRO" ? "" : "sale"}">
          ${product.badge}
        </span>

        <button
          class="fav ${isFavorite ? "active" : ""}"
          onclick="toggleFavorite('${product.id}')"
          title="Favoritar"
        >
          ${isFavorite ? "♥" : "♡"}
        </button>

        ${productImageMarkup(product,product.name,"lazy")}

      </div>

      <div class="product-info">

        <div class="product-brand">
          ${escapeHtml(product.brand)}
        </div>

        <div class="product-name">
          ${escapeHtml(product.name)}
        </div>

        <div>
          <span class="stars">${stars(product.rating)}</span>
          <span class="reviews">
            ${product.rating} (${product.reviews})
          </span>
        </div>

        <div class="price">
          <strong>${money(product.price)}</strong>
          <span class="old-price">${money(product.oldPrice)}</span>
        </div>

        <div class="installments">
          ou até 10x de ${money(product.price/10)}
        </div>

        <div class="product-actions">

          <button
            class="btn btn-primary"
            onclick="addToCart('${product.id}')"
          >
            Comprar
          </button>

          <button
            class="quick-btn"
            onclick="openProduct('${product.id}')"
            title="Ver detalhes"
          >
            👁
          </button>

        </div>

        <button
          class="btn btn-outline"
          style="width:100%;margin-top:7px;min-height:35px;font-size:10px"
          onclick="addCompare('${product.id}')"
        >
          Comparar produto
        </button>

      </div>

    </article>
  `;
}

function renderProducts(list=products){

  const grid=document.getElementById("productsGrid");

  document.getElementById("catalogCount").textContent=
    `${list.length} produto(s) encontrado(s)`;

  if(!list.length){

    grid.innerHTML=`
      <div style="grid-column:1/-1;text-align:center;padding:80px 20px">
        <div style="font-size:45px">⌕</div>
        <h3>Nenhum produto encontrado.</h3>
        <p class="text-muted" style="margin-top:7px">
          Tente alterar os filtros ou sua busca.
        </p>
      </div>
    `;

    return;
  }

  grid.innerHTML=list.map(productCard).join("");
}

function renderSaleProducts(){

  const sale=products
    .filter(p=>p.badge==="PRO" || p.badge==="ELITE")
    .slice(0,4);

  document.getElementById("saleProducts").innerHTML=
    sale.map(productCard).join("");
}

/* =========================================================
   8. FILTROS
   ========================================================= */

function getFilteredProducts(){

  let list=[...products];

  if(filters.category!=="Todos"){
    list=list.filter(p=>p.category===filters.category);
  }

  if(filters.brands.length){
    list=list.filter(p=>filters.brands.includes(p.brand));
  }

  list=list.filter(
    p=>p.price>=filters.minPrice &&
       p.price<=filters.maxPrice
  );

  list=list.filter(
    p=>p.rating>=filters.rating
  );

  const search=document.getElementById("searchInput").value
    .trim()
    .toLowerCase();

  if(search){

    list=list.filter(p=>
      `${p.name} ${p.category} ${p.brand}`
        .toLowerCase()
        .includes(search)
    );
  }

  switch(filters.sort){

    case "priceAsc":
      list.sort((a,b)=>a.price-b.price);
      break;

    case "priceDesc":
      list.sort((a,b)=>b.price-a.price);
      break;

    case "rating":
      list.sort((a,b)=>b.rating-a.rating);
      break;

    case "name":
      list.sort((a,b)=>a.name.localeCompare(b.name));
      break;

    default:
      list.sort((a,b)=>b.rating-a.rating);
  }

  return list;
}

function applyFilters(){

  const category=
    document.querySelector('input[name="category"]:checked');

  filters.category=category ? category.value : "Todos";

  filters.brands=[
    ...document.querySelectorAll(".brand-filter:checked")
  ].map(input=>input.value);

  filters.minPrice=
    Number(document.getElementById("minPrice").value) || 0;

  filters.maxPrice=
    Number(document.getElementById("maxPrice").value) || Infinity;

  filters.rating=
    Number(document.getElementById("ratingFilter").value) || 0;

  filters.sort=document.getElementById("sortSelect").value;

  renderProducts(getFilteredProducts());

  document.getElementById("produtos").scrollIntoView({
    behavior:"smooth"
  });
}

function resetFilters(){

  document
    .querySelector('input[name="category"][value="Todos"]')
    .checked=true;

  document
    .querySelectorAll(".brand-filter")
    .forEach(i=>i.checked=false);

  document.getElementById("minPrice").value="";
  document.getElementById("maxPrice").value="";
  document.getElementById("ratingFilter").value="0";
  document.getElementById("sortSelect").value="relevance";
  document.getElementById("searchInput").value="";

  filters={
    category:"Todos",
    brands:[],
    minPrice:0,
    maxPrice:Infinity,
    rating:0,
    sort:"relevance"
  };

  renderProducts(products);
}

function selectCategory(category){

  const input=document.querySelector(
    `input[name="category"][value="${category}"]`
  );

  if(input){
    input.checked=true;
  }

  filters.category=category;
  filters.brands=[];
  filters.minPrice=0;
  filters.maxPrice=Infinity;
  filters.rating=0;
  filters.sort="relevance";

  document.querySelectorAll(".brand-filter")
    .forEach(i=>i.checked=false);

  renderProducts(getFilteredProducts());

  document.getElementById("produtos").scrollIntoView({
    behavior:"smooth"
  });
}

/* =========================================================
   9. BUSCA
   ========================================================= */

const searchInput=document.getElementById("searchInput");
const searchResults=document.getElementById("searchResults");

searchInput.addEventListener("input",()=>{

  const term=searchInput.value.trim().toLowerCase();

  if(!term){

    searchResults.classList.remove("show");
    renderProducts(getFilteredProducts());

    return;
  }

  const matches=products
    .filter(p=>
      `${p.name} ${p.brand} ${p.category}`
        .toLowerCase()
        .includes(term)
    )
    .slice(0,7);

  searchResults.innerHTML=matches.length
    ? matches.map(p=>`
        <div class="search-result" onclick="openProduct('${p.id}')">
          ${productImageMarkup(p,"")}
          <div>
            <strong>${escapeHtml(p.name)}</strong>
            <small>${money(p.price)} • ${p.category}</small>
          </div>
        </div>
      `).join("")
    : `
      <div style="padding:20px;color:var(--muted);font-size:12px">
        Nenhum produto encontrado.
      </div>
    `;

  searchResults.classList.add("show");

  renderProducts(getFilteredProducts());
});

searchInput.addEventListener("keydown",event=>{

  if(event.key==="Enter"){

    searchResults.classList.remove("show");

    document.getElementById("produtos").scrollIntoView({
      behavior:"smooth"
    });
  }
});

document.addEventListener("click",event=>{

  if(!event.target.closest(".search-wrap")){
    searchResults.classList.remove("show");
  }

});

/* =========================================================
   10. FAVORITOS
   ========================================================= */

function toggleFavorite(id){

  if(favorites.includes(id)){

    favorites=favorites.filter(item=>item!==id);
    showToast("Produto removido dos favoritos.");

  }else{

    favorites.push(id);
    showToast("Produto adicionado aos favoritos. ♥");

  }

  writeStorage(STORAGE.favorites,favorites);

  updateCounters();
  renderProducts(getFilteredProducts());
  renderSaleProducts();
}

function openFavorites(){

  const grid=document.getElementById("favoritesGrid");

  const list=products.filter(p=>favorites.includes(p.id));

  if(!list.length){

    grid.innerHTML=`
      <div style="grid-column:1/-1;text-align:center;padding:60px">
        <div style="font-size:45px">♡</div>
        <h3>Você ainda não favoritou produtos.</h3>
        <p class="text-muted" style="margin-top:8px">
          Clique no coração dos produtos para adicioná-los aqui.
        </p>
      </div>
    `;

  }else{

    grid.innerHTML=list.map(productCard).join("");

  }

  openModal("favoritesModal");
}

/* =========================================================
   11. CARRINHO
   ========================================================= */

function getCartItemColor(item){
  const product=products.find(p=>p.id===item.id);
  return item.color || (product?.colorImages ? product.colors[0] : null);
}

function addToCart(id,quantity=1,color=null){

  const product=products.find(p=>p.id===id);

  if(!product){
    showToast("Produto não encontrado.");
    return;
  }

  const selectedColor=product.colorImages ? (color || product.colors[0]) : null;
  const existing=cart.find(item=>
    item.id===id && getCartItemColor(item)===selectedColor
  );

  if(existing){

    existing.quantity+=quantity;
    if(selectedColor) existing.color=selectedColor;

  }else{

    cart.push({
      id,
      quantity,
      ...(selectedColor ? {color:selectedColor} : {})
    });

  }

  writeStorage(STORAGE.cart,cart);

  updateCounters();
  renderCart();

  showToast(`${product.name} foi adicionado ao carrinho.`);

}

function removeFromCart(id,color=null){

  cart=cart.filter(item=>item.id!==id || (color!==null && getCartItemColor(item)!==color));

  writeStorage(STORAGE.cart,cart);

  renderCart();
  updateCounters();

}

function changeCartQuantity(id,delta,color=null){

  const item=cart.find(i=>i.id===id && getCartItemColor(i)===color);

  if(!item) return;

  item.quantity+=delta;

  if(item.quantity<=0){

    removeFromCart(id,color);
    return;

  }

  writeStorage(STORAGE.cart,cart);

  renderCart();
  updateCounters();
}

function clearCart(){

  if(!cart.length) return;

  if(!confirm("Deseja realmente limpar o carrinho?")) return;

  cart=[];

  writeStorage(STORAGE.cart,cart);

  renderCart();
  updateCounters();

  showToast("Carrinho limpo.");
}

function cartSubtotal(){

  return cart.reduce((total,item)=>{

    const product=products.find(p=>p.id===item.id);

    return total+(product ? product.price*item.quantity : 0);

  },0);
}

function cartDiscount(){

  if(!activeCoupon) return 0;

  const subtotal=cartSubtotal();

  if(activeCoupon.code==="THUNDER10"){
    return subtotal*.10;
  }

  if(activeCoupon.code==="PRIMARY20"){
    return Math.min(subtotal*.20,100);
  }

  return 0;
}

function cartTotal(){

  const subtotal=cartSubtotal();
  const discount=cartDiscount();

  const shipping=
    subtotal-discount>=199
      ? 0
      : currentShipping;

  return Math.max(0,subtotal-discount+shipping);
}

function renderCart(){

  const container=document.getElementById("cartItems");
  const empty=document.getElementById("emptyCart");

  if(!cart.length){

    container.innerHTML="";
    empty.classList.remove("hidden");

  }else{

    empty.classList.add("hidden");

    container.innerHTML=cart.map(item=>{

      const product=products.find(p=>p.id===item.id);

      if(!product) return "";

      return `
        <div class="cart-item">

          ${productImageMarkup({...product,image:product.colorImages?.[getCartItemColor(item)] || product.image},"")}

          <div>
            <h4>${escapeHtml(product.name)}</h4>
            <small>${product.brand}</small>

            <div class="cart-item-price">
              ${money(product.price*item.quantity)}
            </div>

            <div class="mini-qty">
              <button onclick="changeCartQuantity('${item.id}',-1,${JSON.stringify(getCartItemColor(item))})">−</button>
              <span>${item.quantity}</span>
              <button onclick="changeCartQuantity('${item.id}',1,${JSON.stringify(getCartItemColor(item))})">+</button>
            </div>
          </div>

          <button
            class="close"
            style="width:30px;height:30px"
            onclick="removeFromCart('${item.id}',${JSON.stringify(getCartItemColor(item))})"
          >
            ×
          </button>

        </div>
      `;

    }).join("");

  }

  const subtotal=cartSubtotal();
  const discount=cartDiscount();

  const shipping=
    subtotal-discount>=199
      ? 0
      : currentShipping;

  document.getElementById("cartSubtotal").textContent=money(subtotal);
  document.getElementById("cartShipping").textContent=
    shipping===0 ? "GRÁTIS" : money(shipping);
  document.getElementById("cartDiscount").textContent=money(discount);
  document.getElementById("cartTotal").textContent=money(cartTotal());

  document.getElementById("drawerCartCount").textContent=
    cart.reduce((sum,item)=>sum+item.quantity,0);

  if(activeCoupon){

    document.getElementById("couponMessage").textContent=
      `Cupom ${activeCoupon.code} aplicado.`;

  }else{

    document.getElementById("couponMessage").textContent="";

  }
}

function openCart(){

  document.getElementById("cartDrawer").classList.add("open");
  document.body.classList.add("no-scroll");

  renderCart();
}

function closeCart(){

  document.getElementById("cartDrawer").classList.remove("open");
  document.body.classList.remove("no-scroll");

}

function drawerOutside(event){

  if(event.target.id==="cartDrawer"){
    closeCart();
  }
}

/* =========================================================
   12. CUPONS
   ========================================================= */

function applyCoupon(){

  const input=document.getElementById("couponInput");

  const code=input.value.trim().toUpperCase();

  if(code==="THUNDER10"){

    activeCoupon={
      code,
      discount:10
    };

    writeStorage(STORAGE.coupon,activeCoupon);

    showToast("Cupom THUNDER10 aplicado: 10% OFF.");

  }else if(code==="PRIMARY20"){

    activeCoupon={
      code,
      discount:20
    };

    writeStorage(STORAGE.coupon,activeCoupon);

    showToast("Cupom PRIMARY20 aplicado: 20% OFF limitado a R$100.");

  }else{

    activeCoupon=null;

    writeStorage(STORAGE.coupon,null);

    showToast("Cupom inválido.", "error");

  }

  renderCart();
}

/* =========================================================
   13. FRETE
   ========================================================= */

async function calculateShipping(){

  const cep=document.getElementById("cepInput").value;

  const result=document.getElementById("shippingResult");

  result.textContent="Calculando frete...";

  try{

    const shipping=await API.calculateShipping(cep);

    currentShipping=shipping.price;
    shippingDeadline=shipping.deadline;

    result.innerHTML=`
      <strong class="text-blue">${money(shipping.price)}</strong>
      • prazo estimado: ${shipping.deadline}
    `;

    renderCart();

  }catch(error){

    currentShipping=0;
    result.textContent=error.message;

  }
}

/* =========================================================
   14. QUICK VIEW / PRODUTO
   ========================================================= */

async function openProduct(id){

  try{

    const product=await API.getProduct(id);

    if(!product){
      throw new Error("Produto não encontrado.");
    }

    currentProduct=product;
    modalQuantity=1;

    const viewed=readStorage(STORAGE.viewed,[]);

    const newViewed=[
      product.id,
      ...viewed.filter(id=>id!==product.id)
    ].slice(0,8);

    writeStorage(STORAGE.viewed,newViewed);

    document.getElementById("productModalBody").innerHTML=`

      <div class="product-modal">

        <div class="product-modal-image">
          ${productImageMarkup(product,product.name)}
        </div>

        <div>

          <div class="modal-brand">
            ${escapeHtml(product.brand)}
          </div>

          <h2 class="modal-title">
            ${escapeHtml(product.name)}
          </h2>

          <div>
            <span class="stars">${stars(product.rating)}</span>
            <span class="reviews">
              ${product.rating} • ${product.reviews} avaliações
            </span>
          </div>

          <div class="modal-price">
            ${money(product.price)}
          </div>

          <div class="old-price">
            de ${money(product.oldPrice)}
          </div>

          <div class="modal-description">
            ${escapeHtml(product.description)}
          </div>

          <div class="option-title">Cor</div>

          <div class="option-list" id="colorOptions">
            ${product.colors.map((color,index)=>`
              <button
                class="option ${index===0 ? "selected" : ""}"
                onclick="selectOption(this)"
                data-image="${escapeHtml(product.colorImages?.[color] || product.image || "")}"
              >
                ${color}
              </button>
            `).join("")}
          </div>

          <div class="option-title">Tamanho</div>

          <div class="option-list" id="sizeOptions">
            ${product.sizes.map((size,index)=>`
              <button
                class="option ${index===1 ? "selected" : ""}"
                onclick="selectOption(this)"
              >
                ${size}
              </button>
            `).join("")}
          </div>

          <div class="option-title">
            Quantidade
          </div>

          <div class="qty">

            <button onclick="changeModalQuantity(-1)">
              −
            </button>

            <span id="modalQty">1</span>

            <button onclick="changeModalQuantity(1)">
              +
            </button>

            <span class="text-muted" style="font-size:11px">
              ${product.stock} em estoque
            </span>

          </div>

          <button
            class="btn btn-primary"
            style="width:100%;margin-top:20px"
            onclick="addModalProductToCart()"
          >
            Adicionar ao carrinho →
          </button>

          <button
            class="btn btn-outline"
            style="width:100%;margin-top:8px"
            onclick="toggleFavorite('${product.id}')"
          >
            ${favorites.includes(product.id) ? "♥ Remover dos favoritos" : "♡ Adicionar aos favoritos"}
          </button>

        </div>

      </div>
    `;

    openModal("productModal");

  }catch(error){

    showToast(error.message,"error");

  }
}

function selectOption(button){

  const parent=button.parentElement;

  parent.querySelectorAll(".option")
    .forEach(btn=>btn.classList.remove("selected"));

  button.classList.add("selected");

  if(parent.id==="colorOptions" && button.dataset.image){
    const image=document.querySelector("#productModalBody .product-modal-image img");
    if(image) image.src=button.dataset.image;
  }
}

function changeModalQuantity(delta){

  if(!currentProduct) return;

  modalQuantity=Math.max(
    1,
    Math.min(
      currentProduct.stock,
      modalQuantity+delta
    )
  );

  document.getElementById("modalQty").textContent=modalQuantity;
}

function addModalProductToCart(){

  if(!currentProduct) return;

    const selectedColor=document.querySelector("#colorOptions .option.selected")?.textContent.trim() || null;

  addToCart(
    currentProduct.id,
    modalQuantity,
    selectedColor
  );

  closeModal("productModal");
}

/* =========================================================
   15. COMPARAÇÃO
   ========================================================= */

function addCompare(id){

  if(compareList.includes(id)){

    showToast("Esse produto já está na comparação.");
    return;

  }

  if(compareList.length>=3){

    showToast("Você pode comparar até 3 produtos.");
    return;

  }

  compareList.push(id);

  renderCompareBar();

  showToast("Produto adicionado à comparação.");

}

function removeCompare(id){

  compareList=compareList.filter(item=>item!==id);

  renderCompareBar();

}

function renderCompareBar(){

  const bar=document.querySelector(".compare-bar");

  if(!bar) return;

  if(!compareList.length){

    bar.classList.remove("show");
    return;

  }

  bar.classList.add("show");

  document.getElementById("compareProducts").innerHTML=
    compareList.map(id=>{

      const product=products.find(p=>p.id===id);

      return `
        <div class="compare-mini">

          ${productImageMarkup(product,"")}

          <span>${escapeHtml(product.name)}</span>

          <button
            style="margin-left:auto;color:#fff;background:none"
            onclick="removeCompare('${id}')"
          >
            ×
          </button>

        </div>
      `;

    }).join("");

}

function openCompare(){

  if(compareList.length<2){

    showToast("Adicione pelo menos 2 produtos para comparar.");
    return;

  }

  const selected=compareList.map(
    id=>products.find(p=>p.id===id)
  );

  document.getElementById("compareBody").innerHTML=`

    <div style="overflow:auto">

      <table style="width:100%;border-collapse:collapse;font-size:12px">

        <thead>
          <tr>
            <th style="padding:12px;text-align:left">Característica</th>

            ${selected.map(p=>`
              <th style="padding:12px;text-align:left">
                ${escapeHtml(p.name)}
              </th>
            `).join("")}

          </tr>
        </thead>

        <tbody>

          <tr>
            <td style="padding:12px;color:var(--muted)">Preço</td>

            ${selected.map(p=>`
              <td style="padding:12px;color:var(--blue);font-weight:900">
                ${money(p.price)}
              </td>
            `).join("")}

          </tr>

          <tr>
            <td style="padding:12px;color:var(--muted)">Marca</td>

            ${selected.map(p=>`
              <td style="padding:12px">
                ${p.brand}
              </td>
            `).join("")}

          </tr>

          <tr>
            <td style="padding:12px;color:var(--muted)">Categoria</td>

            ${selected.map(p=>`
              <td style="padding:12px">
                ${p.category}
              </td>
            `).join("")}

          </tr>

          <tr>
            <td style="padding:12px;color:var(--muted)">Avaliação</td>

            ${selected.map(p=>`
              <td style="padding:12px;color:#ffd43b">
                ${p.rating} ★
              </td>
            `).join("")}

          </tr>

          <tr>
            <td style="padding:12px;color:var(--muted)">Estoque</td>

            ${selected.map(p=>`
              <td style="padding:12px">
                ${p.stock} unidades
              </td>
            `).join("")}

          </tr>

        </tbody>

      </table>

    </div>
  `;

  openModal("compareModal");
}

/* =========================================================
   16. CHECKOUT
   ========================================================= */

function openCheckout(){

  if(!cart.length){

    showToast("Seu carrinho está vazio.");
    return;

  }

  checkoutStep=1;

  renderCheckout();

  openModal("checkoutModal");

}

function renderCheckout(){

  updateCheckoutSteps();

  const container=document.getElementById("checkoutContent");

  if(checkoutStep===1){

    container.innerHTML=`

      <div class="checkout-grid">

        <div>

          <h3 style="margin-bottom:15px">
            Onde devemos entregar?
          </h3>

          <div class="form-grid">

            <div class="field">
              <label>Nome completo</label>
              <input id="checkoutName" value="${checkoutData.name||""}">
            </div>

            <div class="field">
              <label>Telefone</label>
              <input id="checkoutPhone" value="${checkoutData.phone||""}">
            </div>

            <div class="field">
              <label>CEP</label>
              <input id="checkoutCep" value="${checkoutData.cep||""}">
            </div>

            <div class="field">
              <label>Estado</label>
              <select id="checkoutState">
                <option>SP</option>
                <option>RJ</option>
                <option>MG</option>
                <option>PR</option>
                <option>SC</option>
                <option>RS</option>
                <option>BA</option>
                <option>PE</option>
                <option>GO</option>
                <option>Outro</option>
              </select>
            </div>

            <div class="field full">
              <label>Endereço</label>
              <input id="checkoutAddress" value="${checkoutData.address||""}">
            </div>

            <div class="field">
              <label>Número</label>
              <input id="checkoutNumber" value="${checkoutData.number||""}">
            </div>

            <div class="field">
              <label>Complemento</label>
              <input id="checkoutComplement" value="${checkoutData.complement||""}">
            </div>

            <div class="field full">
              <label>Cidade</label>
              <input id="checkoutCity" value="${checkoutData.city||""}">
            </div>

          </div>

          <button
            class="btn btn-primary"
            style="margin-top:18px;width:100%"
            onclick="checkoutNext()"
          >
            Continuar para pagamento →
          </button>

        </div>

        ${checkoutSummaryHTML()}

      </div>
    `;

  }

  if(checkoutStep===2){

    container.innerHTML=`

      <div class="checkout-grid">

        <div>

          <h3>Forma de pagamento</h3>

          <div class="field" style="margin-top:15px">
            <label>Pagamento</label>

            <select id="paymentMethod">
              <option>PIX</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
              <option>Boleto</option>
            </select>

          </div>

          <div id="cardFields" style="margin-top:15px">

            <div class="form-grid">

              <div class="field full">
                <label>Número do cartão</label>
                <input placeholder="0000 0000 0000 0000">
              </div>

              <div class="field">
                <label>Validade</label>
                <input placeholder="MM/AA">
              </div>

              <div class="field">
                <label>CVV</label>
                <input placeholder="000">
              </div>

            </div>

          </div>

          <div style="display:flex;gap:8px;margin-top:18px">

            <button
              class="btn btn-outline"
              style="flex:1"
              onclick="checkoutBack()"
            >
              Voltar
            </button>

            <button
              class="btn btn-primary"
              style="flex:2"
              onclick="checkoutNext()"
            >
              Revisar pedido →
            </button>

          </div>

        </div>

        ${checkoutSummaryHTML()}

      </div>
    `;

  }

  if(checkoutStep===3){

    container.innerHTML=`

      <div class="checkout-grid">

        <div>

          <h3>Confira seu pedido</h3>

          <div style="margin-top:15px">

            <div class="shipping-box">
              <strong>Entrega</strong>

              <p class="text-muted" style="font-size:12px;margin-top:8px">
                ${escapeHtml(checkoutData.name||"Cliente")}<br>
                ${escapeHtml(checkoutData.address||"Endereço não informado")},
                ${escapeHtml(checkoutData.number||"s/n")}<br>
                ${escapeHtml(checkoutData.city||"Cidade")} -
                ${escapeHtml(checkoutData.state||"SP")}<br>
                CEP: ${escapeHtml(checkoutData.cep||"")}
              </p>
            </div>

            <div class="shipping-box">

              <strong>Pagamento</strong>

              <p class="text-muted" style="font-size:12px;margin-top:8px">
                ${escapeHtml(checkoutData.payment||"PIX")}
              </p>

            </div>

            <div class="shipping-box">

              <strong>Produtos</strong>

              ${cart.map(item=>{

                const product=products.find(p=>p.id===item.id);

                return `
                  <div style="
                    display:flex;
                    justify-content:space-between;
                    gap:10px;
                    padding:8px 0;
                    border-bottom:1px solid var(--border);
                    font-size:11px;
                  ">
                    <span>
                      ${item.quantity}x ${escapeHtml(product.name)}
                    </span>

                    <strong>
                      ${money(product.price*item.quantity)}
                    </strong>
                  </div>
                `;

              }).join("")}

            </div>

          </div>

          <div style="display:flex;gap:8px;margin-top:18px">

            <button
              class="btn btn-outline"
              style="flex:1"
              onclick="checkoutBack()"
            >
              Voltar
            </button>

            <button
              class="btn btn-primary"
              style="flex:2"
              onclick="finishOrder()"
            >
              Confirmar pedido ⚡
            </button>

          </div>

        </div>

        ${checkoutSummaryHTML()}

      </div>
    `;

  }

}

function checkoutSummaryHTML(){

  return `

    <div class="checkout-summary">

      <strong>Resumo</strong>

      <div class="summary-row">
        <span>Subtotal</span>
        <span>${money(cartSubtotal())}</span>
      </div>

      <div class="summary-row">
        <span>Frete</span>
        <span>
          ${
            cartSubtotal()-cartDiscount()>=199
              ? "GRÁTIS"
              : money(currentShipping)
          }
        </span>
      </div>

      <div class="summary-row">
        <span>Desconto</span>
        <span>-${money(cartDiscount())}</span>
      </div>

      <div class="summary-row total">
        <span>Total</span>
        <span>${money(cartTotal())}</span>
      </div>

    </div>
  `;
}

function updateCheckoutSteps(){

  [1,2,3].forEach(i=>{

    document
      .getElementById(`step${i}`)
      .classList.toggle("active",i===checkoutStep);

  });

}

function collectCheckoutAddress(){

  checkoutData.name=
    document.getElementById("checkoutName").value.trim();

  checkoutData.phone=
    document.getElementById("checkoutPhone").value.trim();

  checkoutData.cep=
    document.getElementById("checkoutCep").value.trim();

  checkoutData.state=
    document.getElementById("checkoutState").value;

  checkoutData.address=
    document.getElementById("checkoutAddress").value.trim();

  checkoutData.number=
    document.getElementById("checkoutNumber").value.trim();

  checkoutData.complement=
    document.getElementById("checkoutComplement").value.trim();

  checkoutData.city=
    document.getElementById("checkoutCity").value.trim();

  const required=[
    checkoutData.name,
    checkoutData.phone,
    checkoutData.cep,
    checkoutData.address,
    checkoutData.number,
    checkoutData.city
  ];

  if(required.some(value=>!value)){

    showToast("Preencha todos os campos obrigatórios.");
    return false;

  }

  return true;
}

function checkoutNext(){

  if(checkoutStep===1){

    if(!collectCheckoutAddress()) return;

    checkoutStep=2;
    renderCheckout();
    return;

  }

  if(checkoutStep===2){

    const payment=
      document.getElementById("paymentMethod").value;

    checkoutData.payment=payment;

    checkoutStep=3;
    renderCheckout();

  }

}

function checkoutBack(){

  checkoutStep=Math.max(1,checkoutStep-1);

  renderCheckout();

}

async function finishOrder(){

  try{

    const order=await API.createOrder({

      user:readStorage(STORAGE.user,null),

      customer:checkoutData,

      items:cart.map(item=>{

        const product=products.find(p=>p.id===item.id);

        return {
          id:product.id,
          name:product.name,
          price:product.price,
          quantity:item.quantity
        };

      }),

      subtotal:cartSubtotal(),
      shipping:
        cartSubtotal()-cartDiscount()>=199
          ? 0
          : currentShipping,

      discount:cartDiscount(),
      total:cartTotal(),
      coupon:activeCoupon ? activeCoupon.code : null

    });

    cart=[];

    writeStorage(STORAGE.cart,cart);

    activeCoupon=null;

    writeStorage(STORAGE.coupon,null);

    updateCounters();
    renderCart();

    closeModal("checkoutModal");

    showToast(`Pedido ${order.id} confirmado!`);

    setTimeout(()=>{
      openOrders();
    },500);

  }catch(error){

    showToast(error.message,"error");

  }

}

/* =========================================================
   17. LOGIN / CADASTRO
   ========================================================= */

function openAccount(){

  renderAccount();

  openModal("accountModal");

}

function renderAccount(){

  const user=readStorage(STORAGE.user,null);

  const logged=document.getElementById("loggedAccount");
  const forms=document.getElementById("accountForms");

  if(user){

    forms.classList.add("hidden");

    logged.innerHTML=`

      <div style="text-align:center;padding:15px">

        <div class="avatar" style="
          width:65px;
          height:65px;
          margin:0 auto 12px;
          font-size:20px
        ">
          ${user.name.slice(0,2).toUpperCase()}
        </div>

        <h3>Olá, ${escapeHtml(user.name)}!</h3>

        <p class="text-muted" style="margin-top:6px;font-size:12px">
          ${escapeHtml(user.email)}
        </p>

        <div style="display:flex;gap:8px;margin-top:20px">

          <button
            class="btn btn-primary"
            style="flex:1"
            onclick="openOrders()"
          >
            Meus pedidos
          </button>

          <button
            class="btn btn-outline"
            style="flex:1"
            onclick="logoutDemo()"
          >
            Sair
          </button>

        </div>

      </div>
    `;

  }else{

    forms.classList.remove("hidden");

    logged.innerHTML="";

  }

}

function switchAccountTab(tab){

  document.getElementById("loginTab")
    .classList.toggle("active",tab==="login");

  document.getElementById("registerTab")
    .classList.toggle("active",tab==="register");

  document.getElementById("loginForm")
    .classList.toggle("hidden",tab!=="login");

  document.getElementById("registerForm")
    .classList.toggle("hidden",tab!=="register");

}

async function loginDemo(event){

  event.preventDefault();

  try{

    const email=document.getElementById("loginEmail").value;
    const password=document.getElementById("loginPassword").value;

    await API.login(email,password);

    showToast("Login realizado com sucesso.");

    renderAccount();

  }catch(error){

    showToast(error.message,"error");

  }

}

async function registerDemo(event){

  event.preventDefault();

  try{

    const name=document.getElementById("registerName").value;
    const email=document.getElementById("registerEmail").value;
    const password=document.getElementById("registerPassword").value;

    await API.register(name,email,password);

    showToast("Conta criada com sucesso.");

    renderAccount();

  }catch(error){

    showToast(error.message,"error");

  }

}

function logoutDemo(){

  localStorage.removeItem(STORAGE.user);

  renderAccount();

  showToast("Você saiu da conta.");

}

/* =========================================================
   18. PEDIDOS
   ========================================================= */

function openOrders(){

  closeModal("accountModal");

  const orders=readStorage(STORAGE.orders,[]);

  const body=document.getElementById("ordersBody");

  if(!orders.length){

    body.innerHTML=`
      <div style="text-align:center;padding:60px">
        <div style="font-size:45px">📦</div>
        <h3>Nenhum pedido ainda.</h3>
        <p class="text-muted" style="font-size:12px;margin-top:7px">
          Seus pedidos aparecerão aqui depois de uma compra.
        </p>
      </div>
    `;

  }else{

    body.innerHTML=orders.map(order=>`

      <div class="order">

        <div class="order-top">

          <strong>
            Pedido #${order.id}
          </strong>

          <span class="order-status">
            ${order.status}
          </span>

        </div>

        <div class="order-items">

          ${order.items.map(item=>
            `${item.quantity}x ${escapeHtml(item.name)}`
          ).join(" • ")}

        </div>

        <div style="
          display:flex;
          justify-content:space-between;
          margin-top:12px;
          font-size:12px;
        ">

          <span class="text-muted">
            ${new Date(order.createdAt).toLocaleString("pt-BR")}
          </span>

          <strong class="text-blue">
            ${money(order.total)}
          </strong>

        </div>

      </div>

    `).join("");

  }

  openModal("ordersModal");

}

/* =========================================================
   19. NEWSLETTER
   ========================================================= */

async function subscribe(event){

  event.preventDefault();

  const input=document.getElementById("newsletterEmail");

  try{

    await API.subscribe(input.value);

    input.value="";

    showToast("Você entrou para o PrimaryFit Insider!");

  }catch(error){

    showToast(error.message,"error");

  }

}

/* =========================================================
   20. MODAIS
   ========================================================= */

function openModal(id){

  document.getElementById(id).classList.add("open");
  document.body.classList.add("no-scroll");

}

function closeModal(id){

  document.getElementById(id).classList.remove("open");

  if(!document.querySelector(".overlay.open")){
    document.body.classList.remove("no-scroll");
  }

}

document.querySelectorAll(".overlay").forEach(overlay=>{

  overlay.addEventListener("click",event=>{

    if(event.target===overlay){
      overlay.classList.remove("open");

      if(!document.querySelector(".overlay.open")){
        document.body.classList.remove("no-scroll");
      }
    }

  });

});

/* =========================================================
   21. FAQ
   ========================================================= */

function toggleFaq(button){

  const item=button.parentElement;

  item.classList.toggle("open");

  const span=button.querySelector("span");

  span.textContent=
    item.classList.contains("open")
      ? "−"
      : "+";

}

/* =========================================================
   22. MOBILE MENU
   ========================================================= */

function toggleMobileMenu(){

  document
    .getElementById("mobileNav")
    .classList.toggle("open");

}

/* =========================================================
   23. TEMA
   ========================================================= */

function toggleTheme(){

  document.body.classList.toggle("light");

  writeStorage(
    STORAGE.theme,
    document.body.classList.contains("light")
      ? "light"
      : "dark"
  );

}

function loadTheme(){

  const theme=localStorage.getItem(STORAGE.theme);

  if(theme==="light"){
    document.body.classList.add("light");
  }

}

/* =========================================================
   24. CONTADORES
   ========================================================= */

function updateCounters(){

  document.getElementById("cartCount").textContent=
    cart.reduce((sum,item)=>sum+item.quantity,0);

  document.getElementById("favoriteCount").textContent=
    favorites.length;

}

/* =========================================================
   25. TOAST
   ========================================================= */

function showToast(message,type="success"){

  const container=document.getElementById("toastContainer");

  const toast=document.createElement("div");

  toast.className="toast";

  toast.innerHTML=`
    <span style="
      color:${type==="error" ? "#ff405e" : "var(--blue)"};
      font-size:18px
    ">
      ${type==="error" ? "!" : "✓"}
    </span>

    <span>${escapeHtml(message)}</span>
  `;

  container.appendChild(toast);

  setTimeout(()=>{

    toast.style.opacity="0";
    toast.style.transform="translateX(30px)";

    setTimeout(()=>{
      toast.remove();
    },300);

  },3200);

}

/* =========================================================
   26. COUNTDOWN
   ========================================================= */

let saleEnd=Date.now()+1000*60*60*8;

function updateCountdown(){

  const distance=Math.max(0,saleEnd-Date.now());

  const totalSeconds=Math.floor(distance/1000);

  const hours=Math.floor(totalSeconds/3600);
  const minutes=Math.floor((totalSeconds%3600)/60);
  const seconds=totalSeconds%60;

  document.getElementById("hours").textContent=
    String(hours).padStart(2,"0");

  document.getElementById("minutes").textContent=
    String(minutes).padStart(2,"0");

  document.getElementById("seconds").textContent=
    String(seconds).padStart(2,"0");

}

setInterval(updateCountdown,1000);

/* =========================================================
   27. COOKIE
   ========================================================= */

function acceptCookies(){

  localStorage.setItem(
    STORAGE.cookies,
    "accepted"
  );

  document.getElementById("cookieBanner").style.display="none";

}

function loadCookies(){

  if(localStorage.getItem(STORAGE.cookies)==="accepted"){
    document.getElementById("cookieBanner").style.display="none";
  }

}

/* =========================================================
   28. BACK TO TOP
   ========================================================= */

window.addEventListener("scroll",()=>{

  document
    .getElementById("backTop")
    .classList.toggle(
      "show",
      window.scrollY>500
    );

});

/* =========================================================
   29. INFORMAÇÕES DO PROJETO
   ========================================================= */

function showApiInfo(){

  alert(
`PRIMARYFIT API

Modo atual:
${window.PRIMARYFIT_API.mode.toUpperCase()}

O projeto possui uma camada API pronta para conexão.

Endpoints sugeridos:

GET  /products
GET  /products/:id
POST /auth/login
POST /auth/register
POST /orders
POST /newsletter
POST /shipping/calculate

Para produção, altere:

PRIMARYFIT_API.mode = "real"

e defina:

PRIMARYFIT_API.baseURL = "https://seu-backend.com/api"`
  );

}

function showTechInfo(){

  alert(
`PRIMARYFIT THUNDER DRAGON

Frontend:
• HTML5
• CSS3
• JavaScript ES6+

Recursos:
• Catálogo dinâmico
• API adapter
• LocalStorage
• Carrinho
• Favoritos
• Comparação
• Checkout
• Cupons
• Frete
• Login demo
• Pedidos
• Busca
• Filtros
• Responsividade
• Mobile menu
• Tema claro/escuro
• FAQ
• Newsletter`
  );

}

/* =========================================================
   30. TECLADO
   ========================================================= */

document.addEventListener("keydown",event=>{

  if(event.key==="Escape"){

    document
      .querySelectorAll(".overlay.open")
      .forEach(el=>el.classList.remove("open"));

    closeCart();

    document
      .getElementById("mobileNav")
      .classList.remove("open");

    document.body.classList.remove("no-scroll");

  }

});

/* =========================================================
   31. BOTÃO DE COMPARAÇÃO
   ========================================================= */

const compareBar=document.createElement("div");

compareBar.className="compare-bar";

compareBar.innerHTML=`

  <div class="compare-inner">

    <div id="compareProducts" class="compare-products"></div>

    <button
      class="btn btn-primary"
      onclick="openCompare()"
      style="white-space:nowrap"
    >
      Comparar
    </button>

    <button
      class="btn btn-outline"
      onclick="compareList=[];renderCompareBar()"
    >
      Limpar
    </button>

  </div>
`;

document.body.appendChild(compareBar);

/* =========================================================
   32. INICIALIZAÇÃO
   ========================================================= */

async function init(){

  try{

    products=await API.getProducts();

    renderProducts(products);
    renderSaleProducts();
    renderCart();
    updateCounters();

    loadTheme();
    loadCookies();

    updateCountdown();

  }catch(error){

    document.getElementById("productsGrid").innerHTML=`
      <div style="grid-column:1/-1;padding:60px;text-align:center">
        <h3>Erro ao carregar catálogo.</h3>
        <p class="text-muted" style="margin-top:8px">
          ${escapeHtml(error.message)}
        </p>
        <button
          class="btn btn-primary"
          style="margin-top:15px"
          onclick="location.reload()"
        >
          Tentar novamente
        </button>
      </div>
    `;

  }

}

init();

/* =========================================================
   33. ATALHOS DE URL / PRODUTO
   =========================================================

   Exemplos:

   index.html?produto=PF-01-1

   index.html?categoria=Futebol

   ========================================================= */

function readURLActions(){

  const params=new URLSearchParams(
    window.location.search
  );

  const productId=params.get("produto");
  const category=params.get("categoria");

  if(productId){

    setTimeout(()=>{
      openProduct(productId);
    },500);

  }

  if(category){

    setTimeout(()=>{
      selectCategory(category);
    },500);

  }

}

readURLActions();

/* =========================================================
   34. FORMATAÇÃO AUTOMÁTICA DE CEP
   ========================================================= */

document.addEventListener("input",event=>{

  if(
    event.target.id==="cepInput" ||
    event.target.id==="checkoutCep"
  ){

    let value=event.target.value
      .replace(/\D/g,"")
      .slice(0,8);

    if(value.length>5){
      value=
        value.slice(0,5)+"-"+value.slice(5);
    }

    event.target.value=value;

  }

});

/* =========================================================
   35. DEMO DE ESTOQUE
   ========================================================= */

setInterval(()=>{

  products.forEach(product=>{

    if(product.stock>1 && Math.random()<.025){
      product.stock--;
    }

  });

},10000);

/* =========================================================
   FIM DO PRIMARYFIT V5.1
   ========================================================= */
