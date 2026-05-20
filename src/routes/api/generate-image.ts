import { createFileRoute } from "@tanstack/react-router";
import "@tanstack/react-start";

export const Route = createFileRoute("/api/generate-image")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        try {
          const { prompt } = (await request.json()) as { prompt?: string };
          if (!prompt || typeof prompt !== "string" || prompt.length > 2000) {
            return new Response(JSON.stringify({ error: "Invalid prompt" }), {
              status: 400,
              headers: { "Content-Type": "application/json" },
            });
          }
          const key = process.env.LOVABLE_API_KEY;
          if (!key) {
            return new Response(JSON.stringify({ error: "Missing API key" }), {
              status: 500,
              headers: { "Content-Type": "application/json" },
            });
          }

          const stylePrefix =
            "Children's illustration for ages 5-10, gentle Pixar-style 3D cartoon, soft pastel palette (pink, lavender, mint, cream, sky-blue), big friendly eyes, rounded shapes, warm magical lighting, sparkles, joyful and kind mood, high quality, no text, no letters, no watermarks, no distortions, accurate composition. ";

          const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Lovable-API-Key": key,
            },
            body: JSON.stringify({
              model: "google/gemini-2.5-flash-image",
              messages: [
                {
                  role: "user",
                  content: stylePrefix + prompt,
                },
              ],
              modalities: ["image", "text"],
            }),
          });

          if (!res.ok) {
            const text = await res.text();
            return new Response(JSON.stringify({ error: text || "Upstream error" }), {
              status: res.status,
              headers: { "Content-Type": "application/json" },
            });
          }

          const data = (await res.json()) as {
            choices?: Array<{ message?: { images?: Array<{ image_url?: { url?: string } }> } }>;
          };
          const url = data?.choices?.[0]?.message?.images?.[0]?.image_url?.url;
          if (!url) {
            return new Response(JSON.stringify({ error: "No image returned" }), {
              status: 502,
              headers: { "Content-Type": "application/json" },
            });
          }
          return new Response(JSON.stringify({ image: url }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        } catch (e) {
          return new Response(
            JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
            { status: 500, headers: { "Content-Type": "application/json" } },
          );
        }
      },
    },
  },
});