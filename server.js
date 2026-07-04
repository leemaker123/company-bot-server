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
    .from("companies")
    .select("name, description")
    .eq("name", name)
    .single();

  if (error || !data) {
    return res.json({
      found: false,
      message: `${name} 기업설명이 등록되어 있지 않습니다.`
    });
  }

  res.json({
    found: true,
    name: data.name,
    description: data.description
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
