const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for all routes
app.use(cors());

// Root endpoint with instructions
app.get("/", (req, res) => {
  res.send(`
    <h1>CompliQ Proxy Server</h1>
    <p>Use this server to proxy website requests and bypass CORS restrictions.</p>
    <p>Example usage: <code>/proxy?url=https://example.com</code></p>
  `);
});

// Proxy middleware for handling website requests
app.use("/proxy", (req, res, next) => {
  const url = req.query.url;

  if (!url) {
    return res.status(400).send("URL parameter is required");
  }

  let targetUrl;
  try {
    targetUrl = new URL(url);
  } catch (error) {
    return res.status(400).send("Invalid URL format");
  }

  const proxyOptions = {
    target: targetUrl.origin,
    changeOrigin: true,
    pathRewrite: (path) => {
      return targetUrl.pathname + targetUrl.search;
    },
    onProxyRes: (proxyRes) => {
      // Remove headers that would block iframe embedding
      proxyRes.headers["x-frame-options"] = "ALLOWALL";
      delete proxyRes.headers["content-security-policy"];

      // Add headers to allow embedding
      proxyRes.headers["access-control-allow-origin"] = "*";
    },
  };

  createProxyMiddleware(proxyOptions)(req, res, next);
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
