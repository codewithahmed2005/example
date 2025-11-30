import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Connect Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Insert message
app.post("/message", async (req, res) => {
  const { name, message } = req.body;

  const { data, error } = await supabase
    .from("messages")
    .insert({ name, message });

  if (error) return res.status(400).json({ error });
  res.json({ success: true, data });
});

// Get all messages
app.get("/messages", async (req, res) => {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .order("id", { ascending: false });

  if (error) return res.status(400).json({ error });
  res.json(data);
});

// Start
app.listen(3000, () => console.log("Server running on port 3000"));
