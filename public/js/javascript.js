
"use strict";

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const translations = {
  pt: {
    dashboard:"Painel", products:"Produtos", movements:"Movimentações",
    notes:"Anotações do dia", alerts:"Alertas de estoque", suppliers:"Fornecedores",
    reports:"Relatórios e backup", addProduct:"Novo produto", search:"Pesquisar...",
    totalProducts:"Produtos cadastrados", units:"Unidades em estoque",
    lowStock:"Estoque baixo", movementsToday:"Movimentações hoje",
    recentMovements:"Movimentações recentes", attention:"Precisam de atenção",
    noMovements:"Nenhuma movimentação registrada.", noProducts:"Nenhum produto encontrado.",
    name:"Nome do produto", code:"Código", quantity:"Quantidade atual",
    minimum:"Estoque mínimo", unit:"Unidade", location:"Localização",
    value:"Valor unitário", supplier:"Fornecedor", phone:"Telefone do fornecedor",
    aliases:"Outros nomes (separados por vírgula)", description:"Descrição",
    photo:"Foto do produto", camera:"Abrir câmera", choosePhoto:"Escolher foto",
    save:"Salvar", cancel:"Cancelar", edit:"Editar", delete:"Excluir",
    entry:"Entrada", exit:"Saída", amount:"Quantidade", product:"Produto",
    type:"Tipo", date:"Data", note:"Observação", addMovement:"Registrar movimentação",
    writeNote:"Escreva uma anotação do dia...", saveNote:"Salvar anotação",
    noteHelp:"Ex.: saíram 2 fitas isolantes. O sistema tentará identificar o produto antes de alterar o estoque.",
    restock:"Repor estoque", whatsapp:"WhatsApp", noAlerts:"Nenhum produto abaixo do mínimo.",
    addSupplier:"Novo fornecedor", company:"Empresa / fornecedor",
    contact:"Contato", email:"E-mail", address:"Endereço", noSuppliers:"Nenhum fornecedor cadastrado.",
    exportCSV:"Exportar CSV", exportBackup:"Baixar backup JSON", importBackup:"Restaurar backup JSON",
    reportSummary:"Resumo do estoque", inventoryValue:"Valor estimado do estoque",
    logout:"Sair da conta", loading:"Carregando sistema...",
    confirmDelete:"Tem certeza que deseja excluir este produto?",
    settings:"Configurações", language:"Idioma", loginError:"Não foi possível entrar.",
    noteSaved:"Anotação salva.", saved:"Salvo com sucesso.", deleted:"Produto excluído.",
    cameraDenied:"Não foi possível abrir a câmera. Confira a permissão do navegador.",
    confirmMovement:"Confirmar movimentação", noMatches:"Nenhum produto encontrado.",
    confirm:"Confirmar", stock:"Estoque", status:"Situação", actions:"Ações",
    available:"Disponível", low:"Baixo", back:"Voltar", close:"Fechar",
    movementSaved:"Movimentação registrada.", unknownNote:"Não identifiquei um produto nessa anotação. Salvar como texto?",
    detected:"Produto identificado", detectedMovement:"Movimentação detectada",
    remove:"Saída", add:"Entrada", exportDone:"Exportação preparada.",
    supplierSaved:"Fornecedor salvo.", notesEmpty:"Nenhuma anotação ainda.",
    photoOptional:"Opcional. A foto é armazenada no banco de dados.",
    noPhone:"Fornecedor sem telefone cadastrado."
  },
  en: {
    dashboard:"Dashboard", products:"Products", movements:"Movements",
    notes:"Daily notes", alerts:"Stock alerts", suppliers:"Suppliers",
    reports:"Reports & backup", addProduct:"New product", search:"Search...",
    totalProducts:"Registered products", units:"Units in stock",
    lowStock:"Low stock", movementsToday:"Movements today",
    recentMovements:"Recent movements", attention:"Needs attention",
    noMovements:"No movements recorded.", noProducts:"No products found.",
    name:"Product name", code:"Code", quantity:"Current quantity",
    minimum:"Minimum stock", unit:"Unit", location:"Location",
    value:"Unit value", supplier:"Supplier", phone:"Supplier phone",
    aliases:"Other names (comma separated)", description:"Description",
    photo:"Product photo", camera:"Open camera", choosePhoto:"Choose photo",
    save:"Save", cancel:"Cancel", edit:"Edit", delete:"Delete",
    entry:"Stock in", exit:"Stock out", amount:"Quantity", product:"Product",
    type:"Type", date:"Date", note:"Note", addMovement:"Record movement",
    writeNote:"Write a daily note...", saveNote:"Save note",
    noteHelp:"Example: 2 rolls of tape went out. The system tries to identify the product first.",
    restock:"Restock", whatsapp:"WhatsApp", noAlerts:"No products below minimum.",
    addSupplier:"New supplier", company:"Company / supplier",
    contact:"Contact", email:"Email", address:"Address", noSuppliers:"No suppliers registered.",
    exportCSV:"Export CSV", exportBackup:"Download JSON backup", importBackup:"Restore JSON backup",
    reportSummary:"Stock summary", inventoryValue:"Estimated inventory value",
    logout:"Sign out", loading:"Loading system...",
    confirmDelete:"Are you sure you want to delete this product?",
    settings:"Settings", language:"Language", loginError:"Could not sign in.",
    noteSaved:"Note saved.", saved:"Saved successfully.", deleted:"Product deleted.",
    cameraDenied:"Could not open camera. Check browser permissions.",
    confirmMovement:"Confirm movement", noMatches:"No product found.",
    confirm:"Confirm", stock:"Stock", status:"Status", actions:"Actions",
    available:"Available", low:"Low", back:"Back", close:"Close",
    movementSaved:"Movement recorded.", unknownNote:"No product was identified. Save as text?",
    detected:"Identified product", detectedMovement:"Detected movement",
    remove:"Stock out", add:"Stock in", exportDone:"Export prepared.",
    supplierSaved:"Supplier saved.", notesEmpty:"No notes yet.",
    photoOptional:"Optional. The photo is stored in the database.",
    noPhone:"Supplier has no phone number."
  },
  es: {
    dashboard:"Panel", products:"Productos", movements:"Movimientos",
    notes:"Notas del día", alerts:"Alertas de stock", suppliers:"Proveedores",
    reports:"Informes y copia", addProduct:"Nuevo producto", search:"Buscar...",
    totalProducts:"Productos registrados", units:"Unidades en stock",
    lowStock:"Stock bajo", movementsToday:"Movimientos de hoy",
    recentMovements:"Movimientos recientes", attention:"Requieren atención",
    noMovements:"No hay movimientos registrados.", noProducts:"No se encontraron productos.",
    name:"Nombre del producto", code:"Código", quantity:"Cantidad actual",
    minimum:"Stock mínimo", unit:"Unidad", location:"Ubicación",
    value:"Valor unitario", supplier:"Proveedor", phone:"Teléfono del proveedor",
    aliases:"Otros nombres (separados por comas)", description:"Descripción",
    photo:"Foto del producto", camera:"Abrir cámara", choosePhoto:"Elegir foto",
    save:"Guardar", cancel:"Cancelar", edit:"Editar", delete:"Eliminar",
    entry:"Entrada", exit:"Salida", amount:"Cantidad", product:"Producto",
    type:"Tipo", date:"Fecha", note:"Nota", addMovement:"Registrar movimiento",
    writeNote:"Escribe una nota del día...", saveNote:"Guardar nota",
    noteHelp:"Ejemplo: salieron 2 cintas. El sistema intentará identificar el producto.",
    restock:"Reponer stock", whatsapp:"WhatsApp", noAlerts:"No hay productos bajo el mínimo.",
    addSupplier:"Nuevo proveedor", company:"Empresa / proveedor",
    contact:"Contacto", email:"Correo", address:"Dirección", noSuppliers:"No hay proveedores.",
    exportCSV:"Exportar CSV", exportBackup:"Descargar copia JSON", importBackup:"Restaurar copia JSON",
    reportSummary:"Resumen de stock", inventoryValue:"Valor estimado del inventario",
    logout:"Cerrar sesión", loading:"Cargando sistema...",
    confirmDelete:"¿Seguro que deseas eliminar este producto?",
    settings:"Configuración", language:"Idioma", loginError:"No se pudo iniciar sesión.",
    noteSaved:"Nota guardada.", saved:"Guardado correctamente.", deleted:"Producto eliminado.",
    cameraDenied:"No se pudo abrir la cámara. Revisa los permisos.",
    confirmMovement:"Confirmar movimiento", noMatches:"No se encontró el producto.",
    detected:"Producto identificado", detectedMovement:"Movimiento detectado",
    remove:"Salida", add:"Entrada", exportDone:"Exportación preparada.",
    supplierSaved:"Proveedor guardado.", notesEmpty:"Todavía no hay notas.",
    photoOptional:"Opcional. La foto se guarda en la base de datos.",
    noPhone:"El proveedor no tiene teléfono."
  }
};

let lang = localStorage.getItem("almox_lang") || "pt";
let token = sessionStorage.getItem("almox_token") || "";
let currentUser = null;
let state = { products: [], movements: [], notes: [], suppliers: [] };
let currentPage = "dashboard";
let cameraStream = null;
let photoData = "";

function t(key) {
  return translations[lang]?.[key] || translations.pt[key] || key;
}

function escapeHTML(value = "") {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;",
    '"': "&quot;", "'": "&#39;"
  })[char]);
}

function safeNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

function money(value) {
  return new Intl.NumberFormat(
    lang === "en" ? "en-US" : lang === "es" ? "es-ES" : "pt-BR",
    { style: "currency", currency: "BRL" }
  ).format(safeNumber(value));
}

function dateText(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "—" :
    date.toLocaleString(lang === "en" ? "en-US" : lang === "es" ? "es-ES" : "pt-BR");
}

async function api(url, options = {}) {
  const headers = { ...(options.headers || {}) };
  if (options.body && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(url, { ...options, headers });
  const text = await response.text();
  let data = null;

  try { data = text ? JSON.parse(text) : null; }
  catch { throw new Error(`Resposta inválida do servidor (HTTP ${response.status}).`); }

  if (response.status === 401 && url !== "/api/login") {
    signOut(false);
    throw new Error(data?.error || "Sessão expirada. Entre novamente.");
  }
  if (!response.ok) throw new Error(data?.error || `Erro HTTP ${response.status}`);
  return data;
}

function toast(message, error = false) {
  const root = $("#toastRoot");
  const el = document.createElement("div");
  el.className = "toast" + (error ? " error" : "");
  el.textContent = message;
  root.appendChild(el);
  setTimeout(() => el.remove(), 3800);
}

function setStatus(text, good = true) {
  const el = $("#connectionStatus");
  if (el) {
    el.textContent = (good ? "● " : "● ") + text;
    el.style.color = good ? "#83e0bd" : "#ff9ba6";
  }
}

function showLogin() {
  $("#loginScreen").classList.remove("hidden");
  $("#appShell").classList.add("hidden");
}

function showApp() {
  $("#loginScreen").classList.add("hidden");
  $("#appShell").classList.remove("hidden");
  $("#userAvatar").textContent = (currentUser?.email || "A").slice(0, 1).toUpperCase();
  $("#settingsUser").textContent = currentUser?.email || "";
  $("#languageSelect").value = lang;
}

function signOut(showMessage = true) {
  token = "";
  currentUser = null;
  sessionStorage.removeItem("almox_token");
  showLogin();
  if (showMessage) toast("Você saiu da conta.");
}

async function loadState() {
  setStatus("Conectando...");
  try {
    state = await api("/api/state");
    state.products ||= [];
    state.movements ||= [];
    state.notes ||= [];
    state.suppliers ||= [];
    setStatus("Banco conectado");
    render();
  } catch (error) {
    setStatus("Erro de conexão", false);
    $("#content").innerHTML = `
      <div class="card">
        <h2>Não foi possível carregar o sistema</h2>
        <p class="muted">${escapeHTML(error.message)}</p>
        <button class="btn primary" id="retryLoad">Tentar novamente</button>
      </div>`;
    $("#retryLoad").onclick = loadState;
  }
}

async function saveState() {
  state = await api("/api/state", {
    method: "PUT",
    body: JSON.stringify(state)
  });
}

function pageTitle(page) {
  return t(page);
}

function lowProducts() {
  return state.products.filter(p =>
    safeNumber(p.quantity) <= safeNumber(p.minimum)
  );
}

function emptyState(title, detail = "") {
  return `<div class="empty"><strong>${escapeHTML(title)}</strong>${escapeHTML(detail)}</div>`;
}

function pageHead(title, description, action = "") {
  return `<div class="page-head"><div><h2>${escapeHTML(title)}</h2><p>${escapeHTML(description)}</p></div>${action}</div>`;
}

function button(label, action, style = "secondary") {
  return `<button class="btn ${style}" data-action="${escapeHTML(action)}">${escapeHTML(label)}</button>`;
}

function render() {
  $("#pageTitle").textContent = pageTitle(currentPage);
  $("#footerYear").textContent = "© " + new Date().getFullYear();
  $$(".nav-btn[data-page]").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.page === currentPage);
    const key = btn.dataset.page;
    const icon = btn.querySelector("span")?.textContent || "";
    btn.innerHTML = `<span>${icon}</span> ${escapeHTML(t(key))}`;
  });
  $("#logoutBtn").innerHTML = `<span>↪</span> ${escapeHTML(t("logout"))}`;
  $("#settingsUser").textContent = currentUser?.email || "";
  $("#languageSelect").value = lang;

  const pages = {
    dashboard: renderDashboard,
    products: renderProducts,
    movements: renderMovements,
    notes: renderNotes,
    alerts: renderAlerts,
    suppliers: renderSuppliers,
    reports: renderReports
  };

  $("#content").innerHTML = (pages[currentPage] || renderDashboard)();
  bindPageActions();
}

function renderDashboard() {
  const today = new Date().toDateString();
  const todayMoves = state.movements.filter(m =>
    new Date(m.createdAt).toDateString() === today
  );
  const low = lowProducts();
  const units = state.products.reduce((sum, p) => sum + safeNumber(p.quantity), 0);
  const totalValue = state.products.reduce((sum, p) =>
    sum + safeNumber(p.quantity) * safeNumber(p.value), 0);

  return `
    <div class="stats-grid">
      <div class="stat-card"><div class="stat-label">${t("totalProducts")}</div><div class="stat-value">${state.products.length}</div><div class="stat-foot">Itens cadastrados</div></div>
      <div class="stat-card"><div class="stat-label">${t("units")}</div><div class="stat-value">${units}</div><div class="stat-foot">Unidades totais</div></div>
      <div class="stat-card"><div class="stat-label">${t("lowStock")}</div><div class="stat-value">${low.length}</div><div class="stat-foot">Precisam de atenção</div></div>
      <div class="stat-card"><div class="stat-label">${t("movementsToday")}</div><div class="stat-value">${todayMoves.length}</div><div class="stat-foot">${money(totalValue)} em estoque</div></div>
    </div>
    <div class="dashboard-grid">
      <section class="card">
        <div class="card-head"><h2>${t("recentMovements")}</h2>${button(t("movements"), "goto:movements")}</div>
        ${state.movements.length ? `<div class="table-wrap"><table><thead><tr><th>${t("product")}</th><th>${t("type")}</th><th>${t("amount")}</th><th>${t("date")}</th></tr></thead><tbody>
          ${state.movements.slice(0, 8).map(m => `<tr><td>${escapeHTML(m.productName || "—")}</td><td><span class="badge ${m.type === "entrada" ? "ok" : ""}">${escapeHTML(m.type)}</span></td><td>${safeNumber(m.quantity)}</td><td>${dateText(m.createdAt)}</td></tr>`).join("")}
        </tbody></table></div>` : emptyState(t("noMovements"))}
      </section>
      <section class="card">
        <div class="card-head"><h2>${t("attention")}</h2>${button(t("alerts"), "goto:alerts")}</div>
        ${low.length ? low.slice(0, 8).map(p => `<div class="item-row"><strong>${escapeHTML(p.name)}</strong><p class="muted tiny">${t("stock")}: ${safeNumber(p.quantity)} · ${t("minimum")}: ${safeNumber(p.minimum)}</p></div>`).join("") : emptyState(t("noAlerts"))}
      </section>
    </div>`;
}

function productCard(p) {
  const low = safeNumber(p.quantity) <= safeNumber(p.minimum);
  return `<article class="product-card">
    <div class="product-photo">${p.photo ? `<img src="${escapeHTML(p.photo)}" alt="${escapeHTML(p.name)}">` : "▣"}</div>
    <div class="product-info">
      <h3>${escapeHTML(p.name)}</h3>
      <p class="tiny muted">${escapeHTML(p.code || "Sem código")} · ${escapeHTML(p.location || "Sem localização")}</p>
      <div class="product-meta"><span class="badge ${low ? "low" : "ok"}">${safeNumber(p.quantity)} ${escapeHTML(p.unit || "un.")}</span><span class="badge">${t("minimum")}: ${safeNumber(p.minimum)}</span></div>
      <strong>${money(safeNumber(p.value) * safeNumber(p.quantity))}</strong>
      <div class="actions">
        ${button(t("edit"), `edit-product:${p.id}`)}
        ${button(t("entry"), `movement:${p.id}:entrada`, "primary")}
        ${button(t("exit"), `movement:${p.id}:saída`)}
      </div>
    </div>
  </article>`;
}

function renderProducts() {
  return `${pageHead(t("products"), "Cadastre e acompanhe os itens do almoxarifado.", button("+ " + t("addProduct"), "new-product", "primary"))}
    <div class="toolbar"><input id="productSearch" placeholder="${t("search")}" aria-label="${t("search")}"><select id="productFilter"><option value="all">Todos</option><option value="low">${t("lowStock")}</option><option value="ok">${t("available")}</option></select></div>
    <div id="productResults" class="product-grid">${state.products.length ? state.products.map(productCard).join("") : emptyState(t("noProducts"))}</div>`;
}

function renderMovements() {
  return `${pageHead(t("movements"), "Registre entradas e saídas para manter o estoque atualizado.", button("+ " + t("addMovement"), "new-movement", "primary"))}
    ${state.movements.length ? `<div class="table-wrap"><table><thead><tr><th>${t("product")}</th><th>${t("type")}</th><th>${t("amount")}</th><th>${t("note")}</th><th>${t("date")}</th></tr></thead><tbody>
    ${state.movements.map(m => `<tr><td>${escapeHTML(m.productName || "—")}</td><td><span class="badge ${m.type === "entrada" ? "ok" : ""}">${escapeHTML(m.type)}</span></td><td>${safeNumber(m.quantity)}</td><td>${escapeHTML(m.note || "—")}</td><td>${dateText(m.createdAt)}</td></tr>`).join("")}
    </tbody></table></div>` : emptyState(t("noMovements"))}`;
}

function renderNotes() {
  return `${pageHead(t("notes"), "Anote o que aconteceu no almoxarifado.", "")}
    <section class="card"><label for="dailyNote">${t("notes")}</label>
    <textarea id="dailyNote" placeholder="${t("writeNote")}"></textarea>
    <p class="field-hint">${t("noteHelp")}</p>
    <div class="actions">${button(t("saveNote"), "save-note", "primary")}</div></section>
    <section class="card" style="margin-top:16px"><h2>Histórico de anotações</h2>
    ${state.notes.length ? state.notes.map(n => `<div class="item-row"><p>${escapeHTML(n.text || "")}</p><span class="tiny muted">${dateText(n.createdAt)}</span></div>`).join("") : emptyState(t("notesEmpty"))}</section>`;
}

function renderAlerts() {
  const list = lowProducts();
  return `${pageHead(t("alerts"), "Produtos cuja quantidade está no mínimo configurado ou abaixo dele.", "")}
    ${list.length ? `<div class="product-grid">${list.map(p => productCard(p)).join("")}</div>` : `<section class="card">${emptyState(t("noAlerts"))}</section>`}`;
}

function renderSuppliers() {
  return `${pageHead(t("suppliers"), "Contatos e canais para reposição de materiais.", button("+ " + t("addSupplier"), "new-supplier", "primary"))}
    ${state.suppliers.length ? `<div class="product-grid">${state.suppliers.map(s => `<article class="card"><h3>${escapeHTML(s.name)}</h3><p class="muted tiny">${escapeHTML(s.contact || "")}</p><p>${escapeHTML(s.phone || "Sem telefone")}</p><p class="tiny">${escapeHTML(s.email || "")}</p><p class="tiny muted">${escapeHTML(s.address || "")}</p><div class="actions">${s.phone ? button(t("whatsapp"), `whatsapp:${s.id}`, "success") : ""}${button(t("delete"), `delete-supplier:${s.id}`, "danger")}</div></article>`).join("")}</div>` : `<section class="card">${emptyState(t("noSuppliers"))}</section>`}`;
