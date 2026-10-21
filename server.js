
const express = require("express");
const path = require("path");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { MongoClient } = require("mongodb");

const app = express();
const PORT = process.env.PORT || 3000;
const URI = process.env.MONGODB_URI;
const DB_NAME = process.env.MONGODB_DB || "almoxarifado";
const JWT_SECRET = process.env.JWT_SECRET;
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "";

app.use(express.json({ limit: "12mb" }));
app.use(express.static(path.join(__dirname, "public")));

let db;

const emptyState = () => ({
  products: [],
  movements: [],
  notes: [],
  suppliers: []
});

function auth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ")
    ? header.slice(7)
    : "";

  if (!token) {
    return res.status(401).json({ error: "Faça login para continuar." });
  }

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: "Sessão expirada. Entre novamente." });
  }
}

function publicUser(user) {
  return { id: String(user._id), email: user.email, role: user.role };
}

async function readState() {
  const doc = await db.collection("system_state").findOne({
    _id: "main"
  });

  return doc
    ? {
        products: doc.products || [],
        movements: doc.movements || [],
        notes: doc.notes || [],
        suppliers: doc.suppliers || []
      }
    : emptyState();
}

async function writeState(state) {
  const clean = {
    products: Array.isArray(state.products) ? state.products : [],
    movements: Array.isArray(state.movements) ? state.movements : [],
    notes: Array.isArray(state.notes) ? state.notes : [],
    suppliers: Array.isArray(state.suppliers) ? state.suppliers : [],
    updatedAt: new Date()
  };

  await db.collection("system_state").replaceOne(
    { _id: "main" },
    { _id: "main", ...clean },
    { upsert: true }
  );

  return {
    products: clean.products,
    movements: clean.movements,
    notes: clean.notes,
    suppliers: clean.suppliers
  };
}

app.get("/api/health", async (req, res) => {
  try {
    await db.command({ ping: 1 });
    res.json({ ok: true, database: "connected" });
  } catch (error) {
    res.status(503).json({ ok: false, database: "disconnected" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const email = String(req.body.email || "").trim().toLowerCase();
    const password = String(req.body.password || "");

    const user = await db.collection("users").findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ error: "E-mail ou senha incorretos." });
    }

    const token = jwt.sign(
      { sub: String(user._id), email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "12h" }
    );

    res.json({ token, user: publicUser(user) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Não foi possível entrar." });
  }
});

app.get("/api/me", auth, async (req, res) => {
  res.json({ user: { email: req.user.email, role: req.user.role } });
});

app.get("/api/state", auth, async (req, res) => {
  try {
    res.json(await readState());
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao carregar os dados." });
  }
});

app.put("/api/state", auth, async (req, res) => {
  try {
    const state = req.body || {};
    if (
      !Array.isArray(state.products) ||
      !Array.isArray(state.movements) ||
      !Array.isArray(state.notes) ||
      !Array.isArray(state.suppliers)
    ) {
      return res.status(400).json({ error: "Formato de dados inválido." });
    }

    res.json(await writeState(state));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao salvar os dados." });
  }
});

app.get("/api/products", auth, async (req, res) => {
  const state = await readState();
  res.json(state.products);
});

app.post("/api/products", auth, async (req, res) => {
  try {
    const name = String(req.body.name || "").trim();
    if (!name) return res.status(400).json({ error: "Informe o nome do produto." });

    const state = await readState();
    const product = {
      ...req.body,
      id: crypto.randomUUID(),
      name,
      quantity: Math.max(0, Number(req.body.quantity) || 0),
      minimum: Math.max(0, Number(req.body.minimum) || 0),
      createdAt: new Date().toISOString()
    };

    state.products.push(product);
    await writeState(state);
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao cadastrar o produto." });
  }
});

app.put("/api/products/:id", auth, async (req, res) => {
  try {
    const state = await readState();
    const index = state.products.findIndex(p => p.id === req.params.id);
    if (index < 0) return res.status(404).json({ error: "Produto não encontrado." });

    state.products[index] = {
      ...state.products[index],
      ...req.body,
      id: state.products[index].id
    };

    await writeState(state);
    res.json(state.products[index]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar o produto." });
  }
});

app.delete("/api/products/:id", auth, async (req, res) => {
  try {
    const state = await readState();
    const count = state.products.length;
    state.products = state.products.filter(p => p.id !== req.params.id);

    if (count === state.products.length) {
      return res.status(404).json({ error: "Produto não encontrado." });
    }

    await writeState(state);
    res.json({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao excluir o produto." });
  }
});

app.get("/api/movements", auth, async (req, res) => {
  const state = await readState();
  res.json(state.movements);
});

app.post("/api/movements", auth, async (req, res) => {
  try {
    const state = await readState();
    const { productId, type } = req.body;
    const quantity = Number(req.body.quantity);
    const product = state.products.find(p => p.id === productId);

    if (!product) return res.status(404).json({ error: "Produto não encontrado." });
    if (!Number.isFinite(quantity) || quantity <= 0) {
      return res.status(400).json({ error: "Quantidade inválida." });
    }

    const normalizedType = String(type || "").toLowerCase();
    const isIn = ["entrada", "in", "inbound"].includes(normalizedType);
    const isOut = ["saída", "saida", "out", "outbound"].includes(normalizedType);

    if (!isIn && !isOut) {
      return res.status(400).json({ error: "Tipo deve ser entrada ou saída." });
    }

    if (isOut && Number(product.quantity || 0) < quantity) {
      return res.status(400).json({ error: "Estoque insuficiente." });
    }

    product.quantity = Number(product.quantity || 0) + (isIn ? quantity : -quantity);

    const movement = {
      id: crypto.randomUUID(),
      productId,
      productName: product.name,
      type: isIn ? "entrada" : "saída",
      quantity,
      note: String(req.body.note || ""),
      createdAt: new Date().toISOString(),
      user: req.user.email
    };

    state.movements.unshift(movement);
    await writeState(state);
    res.status(201).json({ movement, product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao registrar a movimentação." });
  }
});

app.get("/api/notes", auth, async (req, res) => {
  const state = await readState();
  res.json(state.notes);
});

app.post("/api/notes", auth, async (req, res) => {
  try {
    const text = String(req.body.text || "").trim();
    if (!text) return res.status(400).json({ error: "Digite uma anotação." });

    const state = await readState();
    const note = {
      id: crypto.randomUUID(),
      text,
      createdAt: new Date().toISOString(),
      user: req.user.email
    };

    state.notes.unshift(note);
    await writeState(state);
    res.status(201).json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao salvar a anotação." });
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.use((error, req, res, next) => {
  console.error(error);
  if (error instanceof SyntaxError && "body" in error) {
    return res.status(400).json({ error: "JSON inválido." });
  }
  res.status(500).json({ error: "Erro interno do servidor." });
});

async function start() {
  if (!URI || !JWT_SECRET || JWT_SECRET.length < 32) {
    throw new Error("Configure MONGODB_URI e JWT_SECRET (mínimo 32 caracteres) na Render.");
  }

  const client = new MongoClient(URI);
  await client.connect();
  db = client.db(DB_NAME);

  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    throw new Error("Configure ADMIN_EMAIL e ADMIN_PASSWORD na Render.");
  }

  const users = db.collection("users");
  const existingAdmin = await users.findOne({ email: ADMIN_EMAIL });

  if (!existingAdmin) {
    await users.insertOne({
      email: ADMIN_EMAIL,
      passwordHash: await bcrypt.hash(ADMIN_PASSWORD, 12),
      role: "admin",
      createdAt: new Date()
    });
    console.log("Usuário administrador inicial criado.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Almoxarifado ativo na porta ${PORT}`);
  });
}

start().catch(error => {
  console.error("Falha ao iniciar:", error);
  process.exit(1);
});