import { renderToString } from "react-dom/server";
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from "react-router";
import App from "./root";
import fs from 'fs';
import path from 'path';

export default function handleRequest(
    request,
    responseStatusCode,
    responseHeaders
) {
    const { query, dataRoutes } = createStaticHandler([
        {
            path: "*",
            element: <App />,
        }
    ]);

    const router = createStaticRouter(dataRoutes, request.url);

    const markup = renderToString(
        <StaticRouterProvider router={router} />
    );

    // Generate the HTML content
    const html = `<!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Bookshop</title>
        </head>
        <body>
            <div id="root">${markup}</div>
            <script type="module" src="./assets/entry.client.js"></script>
        </body>
    </html>`;

    // Ensure the build/client directory exists
    const buildDir = path.join(process.cwd(), 'build', 'client');
    if (!fs.existsSync(buildDir)) {
        fs.mkdirSync(buildDir, { recursive: true });
    }

    // Write the index.html file
    fs.writeFileSync(path.join(buildDir, 'index.html'), html);

    responseHeaders.set("Content-Type", "text/html");

    return new Response(html, {
        status: responseStatusCode,
        headers: responseHeaders,
    });
} 