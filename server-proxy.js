const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
const port = 1900;

app.use(cors());

app.get("/execution", async (req, res) => {
  const { target, mode, username, key } = req.query;
  try {
    const response = await axios.get("http://139.59.72.62:1900/execution", {
      params: { target, mode, username, key },
      timeout: 10000
    });
    res.json(response.data);
  } catch (err) {
    console.error("Proxy error:", err.message);
    res.status(500).json({ error: "❌ Gagal proxy ke API utama", detail: err.message });
  }
});

app.listen(port, () => {
  console.log(`✅ Proxy aktif di http://localhost:${port}`);
});
