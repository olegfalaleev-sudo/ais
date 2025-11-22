const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", async (req, res) => {
    if (!req.query.mmsi) {
        return res.json({ error: "Missing mmsi parameter" });
    }

    const mmsi = req.query.mmsi.replace(/[^0-9]/g, "");

    const fetchVF = async (label, url) => {
        try {
            const resp = await axios.get(url, {
                timeout: 10000,
                headers: { "User-Agent": "Mozilla/5.0" }
            });

            return {
                label,
                url,
                status: resp.status,
                json: resp.data,
                error: null
            };
        } catch (err) {
            return {
                label,
                url,
                status: err.response?.status ?? null,
                json: null,
                error: err.message
            };
        }
    };

    const [weather, click, vi2] = await Promise.all([
        fetchVF("weather", `https://www.vesselfinder.com/api/pub/weather/at/${mmsi}`),
        fetchVF("click", `https://www.vesselfinder.com/api/pub/click/${mmsi}`),
        fetchVF("vi2", `https://www.vesselfinder.com/api/pub/vi2/${mmsi}?fv`)
    ]);

    res.json({
        mmsi,
        timestamp: Date.now(),
        debug: { weather, click, vi2 },
        weather: weather.json,
        click: click.json,
        vi2: vi2.json
    });
});

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
