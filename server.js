const express = require("express");
const app = express();

const companies = {
  "현대자동차": "현대자동차는 대한민국의 대표 자동차 제조 기업입니다.",
  "삼성전자": "삼성전자는 반도체, 스마트폰, 가전 등을 만드는 글로벌 전자 기업입니다.",
  "네이버": "네이버는 검색, 커머스, 콘텐츠, 클라우드 서비스를 운영하는 인터넷 기업입니다."
};

app.get("/", (req, res) => {
  res.send("company bot server is running");
});

app.get("/company/:name", (req, res) => {
  const name = req.params.name;
  const description = companies[name];

  if (!description) {
    return res.json({
      found: false,
      message: `${name} 기업설명이 등록되어 있지 않습니다.`
    });
  }

  res.json({
    found: true,
    name,
    description
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
