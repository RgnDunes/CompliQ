# CompliQ Proxy Server (Backup Solution)

This is a simple proxy server that helps bypass cross-origin restrictions when testing websites in the CompliQ accessibility simulator. **Note: This is now a backup solution as CompliQ primarily uses the CORSProxy.io service.**

## Primary Proxy Solution

CompliQ now uses the [CORSProxy.io](https://corsproxy.io/) service to proxy website content. This service is more reliable and doesn't require running a separate server.

## Why Proxying is Needed

Many websites use security headers like `X-Frame-Options: DENY` and Content Security Policy (CSP) to prevent their content from being embedded in iframes on other domains. This is a security best practice to prevent clickjacking attacks.

However, this makes it challenging to analyze external websites in our accessibility simulator. A proxy helps by:

1. Removing restrictive headers
2. Acting as an intermediary between the CompliQ app and the target website
3. Allowing the website content to be displayed in our iframe

## Using This Backup Proxy

### Local Development

1. Install the required dependencies:

   ```bash
   npm install express cors http-proxy-middleware
   ```

2. Start the proxy server:

   ```bash
   npm run proxy
   ```

3. The server will run on port 3001 by default (configurable via the PORT environment variable).

4. To use this local proxy instead of AllOrigins, you'll need to modify the `getProxiedUrl` function in `src/components/SimulationPage.tsx` to use the local endpoint:
   ```javascript
   const getProxiedUrl = (url: string) => {
     if (!url || url === "demo") return url;
     return `http://localhost:3001/proxy?url=${encodeURIComponent(url)}`;
   };
   ```

## API

The proxy server exposes a single endpoint:

- `GET /proxy?url=https://example.com` - Proxies the request to the specified URL and returns the response with modified headers to allow embedding.

## Security Considerations

Proxy servers intentionally bypass security measures that websites have put in place, which could potentially expose users to security risks if used incorrectly.

When using the CompliQ app, consider the following:

1. Only analyze websites you trust
2. Be aware that some website functionality may not work properly through the proxy
3. Consider using the demo content for the most reliable experience
