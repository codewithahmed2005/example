import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// -----------------------------
// CONNECT SUPABASE
// -----------------------------
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// -----------------------------
// API: Save Message
// -----------------------------
app.post("/message", async (req, res) => {
  const { name, message } = req.body;

  const { data, error } = await supabase
    .from("messages")
    .insert({ name, message });

  if (error) return res.status(400).json({ error });
  res.json({ success: true, data });
});

// -----------------------------
// API: Get Messages
// -----------------------------
app.get("/messages", async (req, res) => {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .order("id", { ascending: false });

  if (error) return res.status(400).json({ error });
  res.json(data);
});

// --------------------------------
// Static Frontend Serve
// --------------------------------
app.use(express.static("public"));

// -------------------------------
app.listen(3000, () => {
  console.log("Backend running on port 3000");
});
