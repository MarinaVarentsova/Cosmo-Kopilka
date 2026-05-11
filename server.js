const express = require("express");
const path = require("path");
const https = require("https");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "public")));

let ratesCache = null;
let ratesCacheTime = 0;
const CACHE_TTL = 4 * 60 * 60 * 1000;

app.get("/api/rates", (req, res) => {
  const now = Date.now();
  if (ratesCache && now - ratesCacheTime < CACHE_TTL) {
    return res.json(ratesCache);
  }

  const options = {
    hostname: "www.cbr.ru",
    path: "/scripts/XML_daily.asp",
    headers: { "User-Agent": "Mozilla/5.0" },
  };

  https.get(options, (cbRes) => {
    const chunks = [];
    cbRes.on("data", (chunk) => chunks.push(chunk));
    cbRes.on("end", () => {
      try {
        const xml = Buffer.concat(chunks).toString("latin1");
        const rates = {};
        ["USD", "CNY", "EUR"].forEach((code) => {
          const m = xml.match(
            new RegExp(
              `<CharCode>${code}<\\/CharCode>\\s*<Nominal>(\\d+)<\\/Nominal>\\s*<Name>[^<]*<\\/Name>\\s*<Value>([\\d,]+)<\\/Value>`
            )
          );
          if (m) {
            const nominal = parseInt(m[1], 10);
            const value = parseFloat(m[2].replace(",", "."));
            rates[code] = Math.round((value / nominal) * 100) / 100;
          }
        });
        if (Object.keys(rates).length > 0) {
          ratesCache = rates;
          ratesCacheTime = now;
          res.json(rates);
        } else {
          res.json({ USD: 92, CNY: 12.7, EUR: 100 });
        }
      } catch {
        res.json({ USD: 92, CNY: 12.7, EUR: 100 });
      }
    });
  }).on("error", () => {
    res.json({ USD: 92, CNY: 12.7, EUR: 100 });
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Космо-копилка запущена на порту ${PORT}`);
});
