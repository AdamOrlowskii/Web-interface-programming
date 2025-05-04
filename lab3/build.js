import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure build/client directory exists
const buildDir = path.join(__dirname, 'build', 'client');
if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir, { recursive: true });
}

// Find the entry.client.js file
const assetsDir = path.join(buildDir, 'assets');
const entryClientFile = fs.readdirSync(assetsDir).find(file => file.startsWith('entry.client-') && file.endsWith('.js'));

if (!entryClientFile) {
    console.error('Could not find entry.client.js file in assets directory');
    process.exit(1);
}

// Read the original index.html
const sourceHtml = path.join(__dirname, 'public', 'index.html');
const targetHtml = path.join(buildDir, 'index.html');

if (fs.existsSync(sourceHtml)) {
    let htmlContent = fs.readFileSync(sourceHtml, 'utf8');
    // Replace the script source with the correct filename
    htmlContent = htmlContent.replace(
        /src="\.\/assets\/entry\.client.*?\.js"/,
        `src="./assets/${entryClientFile}"`
    );
    fs.writeFileSync(targetHtml, htmlContent);
    console.log('Created index.html with correct entry.client.js reference');
} else {
    console.error('Source index.html not found in public directory');
    process.exit(1);
} 