import http from 'node:http';
import https from 'node:https';
import {URL} from 'node:url';
import config from './config';

const targetUrl    = new URL(config.minecraftServer);
const targetClient = targetUrl.protocol === 'https:' ? https : http;

const server = http.createServer((req, res) => {
    console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);

    if (!req.url) {
        res.writeHead(400);
        res.end('Missing URL');
        return;
    }

    const proxyReq = targetClient.request(
        {
            protocol: targetUrl.protocol,
            hostname: targetUrl.hostname,
            port:     targetUrl.port,
            method:   req.method,
            path:     req.url, // 1:1 weiterreichen (inkl. Query)
            headers:  {
                ...req.headers,
                host: targetUrl.host, // wichtig für viele Backends
            },
        },
        (proxyRes) => {
            const headers = {
                ...proxyRes.headers,
                'access-control-allow-origin': '*',
            };

            res.writeHead(
                proxyRes.statusCode ?? 500,
                headers,
            );

            proxyRes.pipe(res);
        },
    );

    proxyReq.on('error', (err) => {
        console.error('Proxy error:', err);
        res.writeHead(502);
        res.end('Bad Gateway');
    });

    // Body 1:1 durchreichen
    req.pipe(proxyReq);
});

server.listen(config.port, () => {
    console.log(`Proxy listening on http://localhost:${config.port}`);
    console.log(`Forwarding to ${config.minecraftServer}`);
});