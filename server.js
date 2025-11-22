const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

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

app.get("/", async (req, res) => {
    if (!req.query.mmsi) {
        return res.json({ error: "Missing mmsi parameter" });
    }

    // Accept comma or space-separated list
    let mmsis = req.query.mmsi
        .replace(/[^\d\s,]/g, "")
        .split(/[\s,]+/)
        .filter(x => x.length > 0);

    // Validate each MMSI
    mmsis = mmsis.map(m => m.trim()).filter(m => /^\d{9}$/.test(m));

    if (mmsis.length === 0) {
        return res.json({ error: "No valid MMSI numbers found" });
    }

    // Fetch data for each MMSI in parallel
    const results = {};

    await Promise.all(
        mmsis.map(async (mmsi) => {
            const [weather, click, vi2] = await Promise.all([
                fetchVF("weather", `https://www.vesselfinder.com/api/pub/weather/at/${mmsi}`),
                fetchVF("click", `https://www.vesselfinder.com/api/pub/click/${mmsi}`),
                fetchVF("vi2", `https://www.vesselfinder.com/api/pub/vi2/${mmsi}?fv`)
            ]);

            results[mmsi] = {
                mmsi,
                weather: weather.json,
                click: click.json,
                vi2: vi2.json,
                debug: { weather, click, vi2 }
            };
        })
    );

    res.json({
        timestamp: Date.now(),
        count: mmsis.length,
        vessels: results
    });
});

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
