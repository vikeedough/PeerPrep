import "dotenv/config";
import express from "express";
import { getCollection, closeMongo} from "./lib/mongo.js";
import { getClient } from "./lib/supabase.js";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});

app.get("/questions", async (req, res) => {
  try {
    const questions = await (await getCollection()).find({}).limit(5).toArray();
    console.log(questions);
    res.json(questions);
  } catch (error) {
    errorMessage = String(error);
    res.status(500).json({ error: errorMessage });
  }
});

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const data = await (await getClient()).auth.signUp({ email, password });
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const data = await (await getClient()).auth.signInWithPassword({ email, password });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});
