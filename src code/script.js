const ICONS = {
  sedan: `<svg viewBox="0 0 120 60" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
    <path d="M10 40 L16 24 Q22 14 36 14 L74 14 Q86 14 92 24 L108 40" />
    <path d="M6 40 L114 40 L110 48 L10 48 Z" />
    <circle cx="30" cy="48" r="7" fill="#fff"/>
    <circle cx="90" cy="48" r="7" fill="#fff"/>
    <line x1="40" y1="14" x2="36" y2="40" />
    <line x1="70" y1="14" x2="76" y2="40" />
  </svg>`,
  suv: `<svg viewBox="0 0 120 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
    <path d="M8 42 L14 20 Q18 12 30 12 L88 12 Q100 12 104 22 L112 42" />
    <path d="M4 42 L116 42 L112 52 L8 52 Z" />
    <circle cx="28" cy="52" r="8" fill="#fff"/>
    <circle cx="92" cy="52" r="8" fill="#fff"/>
    <line x1="46" y1="12" x2="44" y2="42" />
    <line x1="76" y1="12" x2="78" y2="42" />
  </svg>`,
  van: `<svg viewBox="0 0 120 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
    <path d="M6 44 L6 20 Q6 14 14 14 L86 14 Q94 14 98 22 L114 34 L114 44" />
    <path d="M4 44 L116 44 L112 52 L8 52 Z" />
    <circle cx="26" cy="52" r="8" fill="#fff"/>
    <circle cx="96" cy="52" r="8" fill="#fff"/>
    <line x1="86" y1="14" x2="86" y2="44" />
    <line x1="34" y1="14" x2="34" y2="44" />
  </svg>`,
  bike: `<svg viewBox="0 0 120 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="26" cy="46" r="14" />
    <circle cx="94" cy="46" r="14" />
    <path d="M26 46 L50 22 L70 22 L94 46" />
    <path d="M50 22 L58 34 L94 46" />
    <path d="M58 34 L46 46" />
    <path d="M70 22 L74 14 L84 14" />
  </svg>`
};

const VEHICLES = [
  { id: 1, name: "Corolla Altis",  type: "sedan", plate: "MM-1042", seats: 5, transmission: "Auto",   fuel: "Petrol", price: 4500,  rating: 4.8, image: "images/toyotocorolla.png" },
  { id: 2, name: "Civic RS",       type: "sedan", plate: "MM-1087", seats: 5, transmission: "Auto",   fuel: "Petrol", price: 5200,  rating: 4.7, image: "images/civicsrs.png" },
  { id: 3, name: "Vitz Hybrid",    type: "sedan", plate: "MM-1103", seats: 5, transmission: "Auto",   fuel: "Hybrid", price: 3800,  rating: 4.6, image: "images/vits.png" },
  { id: 4, name: "Sportage EX",    type: "suv",   plate: "MM-2210", seats: 5, transmission: "Auto",   fuel: "Diesel", price: 8200,  rating: 4.9, image: "images/sportage.png" },
  { id: 5, name: "Fortuner Legend",type: "suv",   plate: "MM-2264", seats: 7, transmission: "Auto",   fuel: "Diesel", price: 12500, rating: 4.9, image: "images/fortrunner.png" },
  { id: 6, name: "Duster Explore", type: "suv",   plate: "MM-2298", seats: 5, transmission: "Manual", fuel: "Diesel", price: 7400,  rating: 4.5, image: "images/duster.png" },
  { id: 7, name: "HiAce Super GL", type: "van",   plate: "MM-3315", seats: 12,transmission: "Manual", fuel: "Diesel", price: 11000, rating: 4.7, image: "images/hiace.png" },
  { id: 8, name: "Caravelle Comfort", type: "van",plate: "MM-3352", seats: 8, transmission: "Auto",   fuel: "Diesel", price: 9800,  rating: 4.6, image: "images/caravella.png" },
  { id: 9, name: "CB Twister",     type: "bike",  plate: "MM-4021", seats: 2, transmission: "Manual", fuel: "Petrol", price: 1200,  rating: 4.4, image: "images/cb.png" },
  { id: 10,name: "FZ-S Fi",        type: "bike",  plate: "MM-4076", seats: 2, transmission: "Manual", fuel: "Petrol", price: 1500,  rating: 4.6, image: "images/fz.png" },
  { id: 11,name: "Activa Glam",    type: "bike",  plate: "MM-4109", seats: 2, transmission: "Auto",   fuel: "Petrol", price: 1000,  rating: 4.5, image: "images/glam.png" },
  { id: 12,name: "Prado TX",       type: "suv",   plate: "MM-2340", seats: 7, transmission: "Auto",   fuel: "Diesel", price: 15500, rating: 5.0, image: "images/prado.png" },
];

const favourites = new Set();
let currentFilter = "all";

function money(n){
  return "Rs. " + n.toLocaleString("en-LK");
}

function typeLabel(type){
  return { sedan: "Sedan", suv: "SUV", van: "Van", bike: "Bike" }[type] || type;
}

function showToast(message){
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove("is-visible"), 2800);
}

function renderFleet(){
  const grid = document.getElementById("fleetGrid");
  const list = currentFilter === "all"
    ? VEHICLES
    : VEHICLES.filter(v => v.type === currentFilter);

  if(list.length === 0){
    grid.innerHTML = `<div class="empty-state">No vehicles match that filter right now — try another category.</div>`;
    return;
  }

  grid.innerHTML = list.map(v => `
    <article class="vehicle-card" data-id="${v.id}">
      <div class="card-visual">
        <span class="card-plate">${v.plate}</span>
        <button class="card-fav ${favourites.has(v.id) ? "is-fav" : ""}" data-fav="${v.id}" aria-label="Save to favourites">♥</button>
        <img
          src="${v.image}"
          alt="${v.name}"
          class="card-photo"
          onerror="this.replaceWith(document.createRange().createContextualFragment(\`${ICONS[v.type].replace(/`/g, "\\`")}\`))"
        >
      </div>
      <div class="card-body">
        <div class="card-top">
          <div>
            <span class="card-type">${typeLabel(v.type)}</span>
            <h3>${v.name}</h3>
          </div>
          <span class="card-rating">★ ${v.rating.toFixed(1)}</span>
        </div>
        <div class="card-specs">
          <span>${v.seats} seats</span>
          <span>${v.transmission}</span>
          <span>${v.fuel}</span>
        </div>
        <div class="card-footer">
          <div class="card-price">${money(v.price)}<br><small>per day</small></div>
          <button class="btn btn-solid" data-book="${v.id}">Book now</button>
        </div>
      </div>
    </article>
  `).join("");
}
document.getElementById("filterTabs").addEventListener("click", (e) => {
  const btn = e.target.closest(".tab");
  if(!btn) return;
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("is-active"));
  btn.classList.add("is-active");
  currentFilter = btn.dataset.filter;
  renderFleet();
});

document.getElementById("fleetGrid").addEventListener("click", (e) => {
  const favBtn = e.target.closest("[data-fav]");
  if(favBtn){
    const id = Number(favBtn.dataset.fav);
    if(favourites.has(id)){
      favourites.delete(id);
      favBtn.classList.remove("is-fav");
      showToast("Removed from favourites");
    } else {
      favourites.add(id);
      favBtn.classList.add("is-fav");
      showToast("Saved to favourites");
    }
    return;
  }

  const bookBtn = e.target.closest("[data-book]");
  if(bookBtn){
    openBookingModal(Number(bookBtn.dataset.book));
  }
});

const searchForm = document.getElementById("searchForm");
const pickupDateInput = document.getElementById("pickupDate");
const returnDateInput = document.getElementById("returnDate");

(function setDefaultDates(){
  const today = new Date();
  const later = new Date();
  later.setDate(today.getDate() + 2);
  pickupDateInput.value = today.toISOString().slice(0,10);
  pickupDateInput.min = today.toISOString().slice(0,10);
  returnDateInput.value = later.toISOString().slice(0,10);
  returnDateInput.min = today.toISOString().slice(0,10);
})();

pickupDateInput.addEventListener("change", () => {
  returnDateInput.min = pickupDateInput.value;
  if(returnDateInput.value < pickupDateInput.value){
    returnDateInput.value = pickupDateInput.value;
  }
});

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const type = document.getElementById("vehicleType").value;
  currentFilter = type;
  document.querySelectorAll(".tab").forEach(t => {
    t.classList.toggle("is-active", t.dataset.filter === type);
  });
  renderFleet();
  document.getElementById("fleet").scrollIntoView({ behavior: "smooth" });
});

const modalOverlay = document.getElementById("modalOverlay");
const modalContent = document.getElementById("modalContent");

function daysBetween(a, b){
  const ms = new Date(b) - new Date(a);
  return Math.max(1, Math.round(ms / (1000 * 60 * 60 * 24)));
}

function openBookingModal(id){
  const v = VEHICLES.find(x => x.id === id);
  if(!v) return;

  const pickup = pickupDateInput.value;
  const ret = returnDateInput.value;
  const days = daysBetween(pickup, ret);
  const total = days * v.price;

  modalContent.innerHTML = `
    <h3 id="modalTitle">${v.name}</h3>
    <p class="modal-sub">${v.plate} · ${typeLabel(v.type)} · ${v.seats} seats · ${v.transmission}</p>

    <form id="bookingForm">
      <div class="modal-row">
        <div class="field">
          <label for="bkPickup">Pickup date</label>
          <input type="date" id="bkPickup" value="${pickup}" min="${pickupDateInput.min}" required>
        </div>
        <div class="field">
          <label for="bkReturn">Return date</label>
          <input type="date" id="bkReturn" value="${ret}" min="${pickup}" required>
        </div>
      </div>
      <div class="field">
        <label for="bkName">Full name</label>
        <input type="text" id="bkName" placeholder="Your name" required>
      </div>
      <div class="field" style="margin-top:.9rem;">
        <label for="bkPhone">Phone number</label>
        <input type="tel" id="bkPhone" placeholder="07X XXX XXXX" required>
      </div>

      <div class="modal-summary" id="bkSummary">
        <div class="modal-summary-row"><span>Daily rate</span><span>${money(v.price)}</span></div>
        <div class="modal-summary-row"><span id="bkDaysLabel">${days} day${days > 1 ? "s" : ""}</span><span id="bkDaysCalc">${money(days * v.price)}</span></div>
        <div class="modal-summary-row total"><span>Total due at pickup</span><span id="bkTotal">${money(total)}</span></div>
      </div>

      <button type="submit" class="btn btn-solid btn-block">Confirm booking</button>
    </form>
  `;

  const bkPickup = document.getElementById("bkPickup");
  const bkReturn = document.getElementById("bkReturn");

  function recalc(){
    bkReturn.min = bkPickup.value;
    if(bkReturn.value < bkPickup.value){
      bkReturn.value = bkPickup.value;
    }
    const d = daysBetween(bkPickup.value, bkReturn.value);
    document.getElementById("bkDaysLabel").textContent = `${d} day${d > 1 ? "s" : ""}`;
    document.getElementById("bkDaysCalc").textContent = money(d * v.price);
    document.getElementById("bkTotal").textContent = money(d * v.price);
  }
  bkPickup.addEventListener("change", recalc);
  bkReturn.addEventListener("change", recalc);

  document.getElementById("bookingForm").addEventListener("submit", (e) => {
    e.preventDefault();
    closeModal();
    showToast(`Booking confirmed — ${v.name} reserved for you.`);
  });

  modalOverlay.classList.add("is-open");
}

function closeModal(){
  modalOverlay.classList.remove("is-open");
  modalContent.innerHTML = "";
}

document.getElementById("modalClose").addEventListener("click", closeModal);
modalOverlay.addEventListener("click", (e) => {
  if(e.target === modalOverlay) closeModal();
});
document.addEventListener("keydown", (e) => {
  if(e.key === "Escape" && modalOverlay.classList.contains("is-open")) closeModal();
});

function openSignInModal(){
  modalContent.innerHTML = `
    <h3 id="modalTitle">Create your account</h3>
    <p class="modal-sub">Set a password so you can log back in any time.</p>

    <form id="signInForm">
      <div class="field">
        <label for="siName">Full name</label>
        <input type="text" id="siName" placeholder="Your name" required>
      </div>
      <div class="field" style="margin-top:.9rem;">
        <label for="siPhone">Telephone number</label>
        <input type="tel" id="siPhone" placeholder="07X XXX XXXX" required>
      </div>
      <div class="field" style="margin-top:.9rem;">
        <label for="siId">ID number</label>
        <input type="text" id="siId" placeholder="National ID / Passport no." required>
      </div>
      <div class="field" style="margin-top:.9rem;">
        <label for="siPassword">Password</label>
        <input type="password" id="siPassword" placeholder="Choose a password" required>
      </div>

      <button type="submit" class="btn btn-solid btn-block" style="margin-top:1.3rem;">Create account</button>
    </form>
  `;

  document.getElementById("signInForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("siName").value.trim();
    const phone = document.getElementById("siPhone").value.trim();
    const id = document.getElementById("siId").value.trim();
    const password = document.getElementById("siPassword").value;

    const customers = loadCustomers();
    if(customers.some(c => c.phone === phone)){
      showToast("An account with that phone number already exists — try logging in instead.");
      return;
    }
    customers.push({ name, phone, id, password });
    saveCustomers(customers);

    closeModal();
    showToast(`Welcome, ${name || "there"} — your account is ready. Use "Login" any time to access it.`);
  });

  modalOverlay.classList.add("is-open");
}

document.getElementById("signInBtn").addEventListener("click", openSignInModal);

const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");
navToggle.addEventListener("click", () => {
  mainNav.classList.toggle("is-open");
});
mainNav.addEventListener("click", (e) => {
  if(e.target.tagName === "A") mainNav.classList.remove("is-open");
});

renderFleet();

/* =========================================================
   ADMIN — login, dashboard, vehicle & customer management
   Data is saved in this browser using localStorage, so it stays
   after a refresh, but it's only visible on this device/browser.
========================================================= */

/* =========================================================
   LOGIN — shared by admin and customers, plus dashboards
   Data is saved in this browser using localStorage, so it stays
   after a refresh, but it's only visible on this device/browser.
========================================================= */

const publicSite = document.getElementById("publicSite");
const loginView = document.getElementById("loginView");
const adminDashboardView = document.getElementById("adminDashboardView");
const customerProfileView = document.getElementById("customerProfileView");

function showPublicSite(){
  publicSite.style.display = "";
  loginView.classList.remove("is-open");
  adminDashboardView.classList.remove("is-open");
  customerProfileView.classList.remove("is-open");
}
function showLoginView(){
  publicSite.style.display = "none";
  adminDashboardView.classList.remove("is-open");
  customerProfileView.classList.remove("is-open");
  loginView.classList.add("is-open");
}
function showAdminDashboard(){
  publicSite.style.display = "none";
  loginView.classList.remove("is-open");
  customerProfileView.classList.remove("is-open");
  adminDashboardView.classList.add("is-open");
  renderAdminVehicles();
  renderAdminCustomers();
}
function showCustomerProfile(customer){
  publicSite.style.display = "none";
  loginView.classList.remove("is-open");
  adminDashboardView.classList.remove("is-open");
  customerProfileView.classList.add("is-open");
  renderCustomerProfile(customer);
}

document.getElementById("loginNavBtn").addEventListener("click", () => {
  if(sessionStorage.getItem("mm_admin_logged_in") === "true"){
    showAdminDashboard();
  } else {
    const loggedInPhone = sessionStorage.getItem("mm_customer_logged_in");
    const customer = loggedInPhone ? loadCustomers().find(c => c.phone === loggedInPhone) : null;
    if(customer){
      showCustomerProfile(customer);
    } else {
      showLoginView();
    }
  }
});
document.getElementById("loginBackBtn").addEventListener("click", showPublicSite);

// 👉 Change the admin username/password here.
// Note: this check runs in the browser, so it's fine for a demo or
// personal project, but not secure for a real public deployment —
// a real system needs a server to check credentials safely.
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "milemark2026";

document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const user = document.getElementById("loginUser").value.trim();
  const pass = document.getElementById("loginPassword").value;
  const errorMsg = document.getElementById("loginErrorMsg");

  // 1) check admin first
  if(user === ADMIN_USERNAME && pass === ADMIN_PASSWORD){
    sessionStorage.setItem("mm_admin_logged_in", "true");
    errorMsg.classList.remove("show");
    showAdminDashboard();
    return;
  }

  // 2) check registered customers (matched by phone number)
  const customers = loadCustomers();
  const match = customers.find(c => c.phone === user && c.password === pass);
  if(match){
    sessionStorage.setItem("mm_customer_logged_in", match.phone);
    errorMsg.classList.remove("show");
    showCustomerProfile(match);
    return;
  }

  errorMsg.classList.add("show");
});

document.getElementById("adminLogoutBtn").addEventListener("click", () => {
  sessionStorage.removeItem("mm_admin_logged_in");
  showPublicSite();
});

document.getElementById("customerLogoutBtn").addEventListener("click", () => {
  sessionStorage.removeItem("mm_customer_logged_in");
  showPublicSite();
});

// ---------- customer accounts (created via the "Sign in" form) ----------
function loadCustomers(){
  const saved = localStorage.getItem("mm_customers");
  return saved ? JSON.parse(saved) : [];
}
function saveCustomers(list){
  localStorage.setItem("mm_customers", JSON.stringify(list));
}

function renderCustomerProfile(customer){
  document.getElementById("customerWelcomeName").textContent = `, ${customer.name}`;

  document.getElementById("customerStatGrid").innerHTML = `
    <div class="admin-stat-card"><div class="admin-stat-num">0</div><div class="admin-stat-label">Active bookings</div></div>
    <div class="admin-stat-card"><div class="admin-stat-num">0</div><div class="admin-stat-label">Past trips</div></div>
    <div class="admin-stat-card"><div class="admin-stat-num">★ —</div><div class="admin-stat-label">Your rating</div></div>
  `;

  document.getElementById("customerDetailsBody").innerHTML = `
    <tr><td style="width:160px; color:var(--muted);">Full name</td><td>${customer.name}</td></tr>
    <tr><td style="color:var(--muted);">Phone number</td><td>${customer.phone}</td></tr>
    <tr><td style="color:var(--muted);">ID number</td><td>${customer.id}</td></tr>
  `;
}

function loadAdminVehicles(){
  const saved = localStorage.getItem("mm_admin_vehicles");
  if(saved) return JSON.parse(saved);
  return VEHICLES.map(v => ({
    name: v.name, plate: v.plate, type: v.type, seats: v.seats, price: v.price
  }));
}
function saveAdminVehicles(list){
  localStorage.setItem("mm_admin_vehicles", JSON.stringify(list));
}
let adminVehicles = loadAdminVehicles();

function renderAdminVehicles(){
  document.getElementById("vehicleTableBody").innerHTML = adminVehicles.map((v, i) => `
    <tr>
      <td>${v.name}</td>
      <td class="admin-plate">${v.plate}</td>
      <td>${typeLabel(v.type)}</td>
      <td>${v.seats}</td>
      <td>${money(v.price)}</td>
      <td><button type="button" class="btn btn-outline" data-remove-vehicle="${i}">Remove</button></td>
    </tr>
  `).join("") || `<tr><td colspan="6" style="text-align:center; color:var(--muted);">No vehicles yet.</td></tr>`;

  renderAdminStats();
}

document.getElementById("addVehicleForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("vName").value.trim();
  const plate = document.getElementById("vPlate").value.trim();
  const type = document.getElementById("vType").value;
  const seats = Number(document.getElementById("vSeats").value);
  const price = Number(document.getElementById("vPrice").value);

  adminVehicles.push({ name, plate, type, seats, price });
  saveAdminVehicles(adminVehicles);
  renderAdminVehicles();
  e.target.reset();
  document.getElementById("vSeats").value = 5;
  showToast(`${name} added to the fleet.`);
});

document.getElementById("vehicleTableBody").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-remove-vehicle]");
  if(!btn) return;
  const idx = Number(btn.dataset.removeVehicle);
  const removed = adminVehicles[idx];
  adminVehicles.splice(idx, 1);
  saveAdminVehicles(adminVehicles);
  renderAdminVehicles();
  showToast(`${removed.name} removed from the fleet.`);
});

function loadAdminCustomers(){
  const saved = localStorage.getItem("mm_admin_customers");
  if(saved) return JSON.parse(saved);
  return [];
}
function saveAdminCustomers(list){
  localStorage.setItem("mm_admin_customers", JSON.stringify(list));
}
let adminCustomers = loadAdminCustomers();

function renderAdminCustomers(){
  document.getElementById("customerTableBody").innerHTML = adminCustomers.map((c, i) => `
    <tr>
      <td>${c.name}</td>
      <td>${c.phone}</td>
      <td>${c.id}</td>
      <td><button type="button" class="btn btn-outline" data-remove-customer="${i}">Remove</button></td>
    </tr>
  `).join("") || `<tr><td colspan="4" style="text-align:center; color:var(--muted);">No customers yet.</td></tr>`;
}

document.getElementById("addCustomerForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("cName").value.trim();
  const phone = document.getElementById("cPhone").value.trim();
  const id = document.getElementById("cId").value.trim();

  adminCustomers.push({ name, phone, id });
  saveAdminCustomers(adminCustomers);
  renderAdminCustomers();
  e.target.reset();
  showToast(`${name} added to customers.`);
});

document.getElementById("customerTableBody").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-remove-customer]");
  if(!btn) return;
  const idx = Number(btn.dataset.removeCustomer);
  const removed = adminCustomers[idx];
  adminCustomers.splice(idx, 1);
  saveAdminCustomers(adminCustomers);
  renderAdminCustomers();
  showToast(`${removed.name} removed from customers.`);
});

function renderAdminStats(){
  const avgPrice = adminVehicles.length
    ? Math.round(adminVehicles.reduce((s, v) => s + v.price, 0) / adminVehicles.length)
    : 0;
  const typeCount = new Set(adminVehicles.map(v => v.type)).size;

  document.getElementById("adminStatGrid").innerHTML = `
    <div class="admin-stat-card"><div class="admin-stat-num">${adminVehicles.length}</div><div class="admin-stat-label">Total vehicles</div></div>
    <div class="admin-stat-card"><div class="admin-stat-num">${typeCount}</div><div class="admin-stat-label">Vehicle types</div></div>
    <div class="admin-stat-card"><div class="admin-stat-num">${money(avgPrice)}</div><div class="admin-stat-label">Average price / day</div></div>
    <div class="admin-stat-card"><div class="admin-stat-num">${adminCustomers.length}</div><div class="admin-stat-label">Total customers</div></div>
  `;
}
