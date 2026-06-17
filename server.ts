import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Standard telemetry header per guidelines
const api_key = process.env.GEMINI_API_KEY;
if (!api_key) {
  console.warn("WARNING: GEMINI_API_KEY environment variable is not set. API calls will fail.");
}

const ai = new GoogleGenAI({
  apiKey: api_key || "DUMMY_KEY",
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: Generate website
  app.post("/api/generate", async (req, res) => {
    try {
      const { prompt, refinements = [] } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
      }

      const systemInstruction = `
You are the core AI code-generation engine for a free, instant website builder app. Your sole purpose is to convert user requests into fully functional, single-page websites.

Output Requirements: You must ONLY output a single, complete, valid HTML5 file. 

Inclusion Rules:
- Include modern, responsive styling using Tailwind CSS via its official CDN link in the <head>. Include this script: <script src="https://cdn.tailwindcss.com"></script>
- If needed, include modern Font Awesome or google fonts, or elegant SVG inline shapes for high aesthetic quality.
- Include any necessary interactivity using vanilla JavaScript inside <script> tags at the bottom. Implement ALL interactivity fully (e.g. interactive menu toggles, modal triggers, card filters, working calculator, tab switching, or form submit animations/popups).
- Use high-quality placeholder image URLs from Unsplash that match the website's theme. Choose descriptive keywords in the Unsplash URLs (e.g. https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80 for beach etc. Ensure any photo used matches the professional context).
- Include modern layouts, animations (Tailwind transition/hover effects, or Tailwind CSS animate classes), navigation menus, and functional-looking forms.
- Make the layout feel rich, premium, and fully styled, with multiple sections: a gorgeous Hero, Features/Services, about, gallery/portfolio, pricing table (if applicable), FAQ with accordions, testimonial carousel/grid, and a styled footer.

Strict Constraints:
- Do NOT wrap the code in markdown blocks (do NOT use \`\`\`html or similar).
- Do NOT include any introductory or concluding conversational text (e.g. "Here is your website...").
- Start directly with <!DOCTYPE html> and end with </html>.
`;

      const userMessage = refinements.length > 0
        ? `Refined Instructions:\n\nInitial Request:\n"${prompt}"\n\nRefinements applied sequentially:\n${refinements.map((r: string, idx: number) => `${idx + 1}. ${r}`).join('\n')}\n\nPlease regenerate the *complete*, updated HTML5 file incorporating all refinements, starting directly with <!DOCTYPE html> and ending with </html> without any markdown formatting or extra text.`
        : `Please build a single-page website for: "${prompt}". Remember: output must be ONLY the raw HTML5 code starting directly with <!DOCTYPE html> and ending with </html>. No markdown, no comments, no explanations. Just clean, valid, professional, responsive HTML code.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: userMessage,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.1, // low temperature for precise, high-fidelity code output
        }
      });

      let rawCode = response.text || "";
      
      // Let's sanitize rawCode, in case the model failed to follow the markdown constraint.
      rawCode = rawCode.trim();
      if (rawCode.startsWith("```html")) {
        rawCode = rawCode.substring(7);
      } else if (rawCode.startsWith("```")) {
        rawCode = rawCode.substring(3);
      }
      if (rawCode.endsWith("```")) {
        rawCode = rawCode.substring(0, rawCode.length - 3);
      }
      rawCode = rawCode.trim();

      // Additional safeguard: If it contains anything before <!DOCTYPE html>, strip it.
      const docTypeIndex = rawCode.toLowerCase().indexOf("<!doctype html");
      if (docTypeIndex > 0) {
        rawCode = rawCode.substring(docTypeIndex);
      }

      return res.json({ html: rawCode });
    } catch (error: any) {
      console.error("Gemini API generation error:", error);
      return res.status(500).json({ error: error.message || "Failed to generate website code" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
