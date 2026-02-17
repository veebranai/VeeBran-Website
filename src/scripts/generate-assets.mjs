
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config({ path: '.env.local' });
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const apiKey = process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY;

if (!apiKey) {
    console.error("❌ CRITICAL: No API Key found in .env.local!");
    process.exit(1);
}

const ASSETS = [
    {
        filename: 'veebran-hero-growth.jpg',
        prompt: 'Professional business transformation visualization, organic seedling sprouting from circuit board roots, glowing teal neural connections flowing upward like branches, deep forest green and innovation teal color palette, photorealistic 3D render, cinematic lighting, depth of field, 8K resolution --ar 16:9 --style raw'
    }
];

const OUTPUT_DIR = path.resolve(__dirname, '../../public/media');

async function testConnection() {
    console.log("📡 Testing Connection (Gemini 2.0)...");
    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "https://veebran.com",
                "X-Title": "VeeBran Connection Test"
            },
            body: JSON.stringify({
                model: "google/gemini-2.0-flash-001",
                messages: [{ role: "user", content: "Hello" }]
            })
        });

        if (!response.ok) {
            console.error(`❌ Connection Test Failed (${response.status}):`, await response.text());
            return false;
        }
        const data = await response.json();
        console.log("✅ Connection Successful:", data.choices[0].message.content);
        return true;
    } catch (e) {
        console.error("❌ Connection Test Error:", e);
        return false;
    }
}

async function saveImage(getUrl, filepath) {
    if (!getUrl) return;
    try {
        // Handle base64
        if (getUrl.startsWith('data:')) {
            const base64Data = getUrl.replace(/^data:image\/\w+;base64,/, "");
            const buffer = Buffer.from(base64Data, 'base64');
            fs.writeFileSync(filepath, buffer);
        } else {
            console.log(`📥 Downloading image...`);
            const response = await fetch(getUrl);
            if (!response.ok) throw new Error(`Image download failed: ${response.status}`);
            const buffer = await response.arrayBuffer();
            fs.writeFileSync(filepath, Buffer.from(buffer));
        }
        console.log(`✅ Saved: ${filepath}`);
    } catch (e) {
        console.error(`❌ Error saving ${filepath}:`, e);
    }
}

async function generate() {
    if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

    if (!await testConnection()) {
        console.error("⛔ Aborting generation due to connection failure.");
        return;
    }

    console.log("📡 Starting Generation with Flux...");

    for (const asset of ASSETS) {
        console.log(`🖌️ Generating: ${asset.filename}...`);

        try {
            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                    "HTTP-Referer": "https://veebran.com",
                    "X-Title": "VeeBran Site Gen"
                },
                body: JSON.stringify({
                    model: "black-forest-labs/flux.2-max", // Trying user's model ID
                    messages: [
                        { role: "user", content: asset.prompt }
                    ],
                    modalities: ["image"]
                })
            });

            if (!response.ok) {
                const text = await response.text();
                console.error(`❌ API Error (${response.status}):`, text);
                continue;
            }

            const data = await response.json();
            const message = data.choices?.[0]?.message;

            if (message?.images?.[0]?.image_url?.url) {
                await saveImage(message.images[0].image_url.url, path.join(OUTPUT_DIR, asset.filename));
            } else if (message?.content) {
                console.warn("⚠️ No image in response, got content:", message.content);
            } else {
                console.warn("⚠️ Unexpected response format:", JSON.stringify(data, null, 2));
            }

        } catch (error) {
            console.error(`❌ Network Error:`, error);
        }
    }
}

generate();
