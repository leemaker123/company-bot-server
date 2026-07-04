const express = require("express");
const { createClient } = require("@supabase/supabase-js");

const app = express();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_PUBLISHABLE_KEY
);

app.get("/", (req, res) => {
  res.send("company bot server is running");
});

app.get("/company/:name", async (req, res) => {
  const name = req.params.name;

  const { data, error } = await supabase
    .from("Companies")   // ← 여기 중요
    .select("*")
    .eq("Name", name);

  console.log("===== DEBUG =====");
  console.log("검색어:", name);
  console.log("data:", data);
  console.log("error:", error);

  if (error) {
    return res.json(error);
  }

  if (!data || data.length === 0) {
    return res.json({
      found: false,
      message: "데이터 없음"
    });
  }

  return res.json(data[0]);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
