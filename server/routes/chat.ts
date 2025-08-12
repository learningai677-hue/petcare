import { RequestHandler } from "express";

export const handleChat: RequestHandler = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "No message provided" });
    }

    const OPENROUTER_API_KEY =
      process.env.OPENROUTER_API_KEY ||
      "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";

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "HTTP-Referer": "https://petcare-assistant.com",
          "X-Title": "Pet Care Assistant",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content:
                "You are a helpful pet care assistant. Provide friendly, accurate, and helpful advice about pet care, health, training, and general pet-related questions. Keep responses concise but informative.",
            },
            {
              role: "user",
              content: message,
            },
          ],
          stream: false,
          max_tokens: 500,
        }),
      },
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("OpenRouter API error:", errText);
      return res
        .status(500)
        .json({
          error: "Failed to get response from AI service",
          details: errText,
        });
    }

    const data = await response.json();
    const reply =
      data.choices?.[0]?.message?.content ||
      "Sorry, I could not generate a response. Please try again.";

    res.json({ reply });
  } catch (err) {
    console.error("Chat error:", err);
    res
      .status(500)
      .json({ error: "Internal server error while processing your request" });
  }
};
