import { RequestHandler } from "express";

export const handleChat: RequestHandler = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "No message provided" });
    }

    const OPENROUTER_API_KEY =
      process.env.OPENROUTER_API_KEY;

    if (!OPENROUTER_API_KEY) {
      return res.status(500).json({
        error: "OpenRouter API key not configured. Please set OPENROUTER_API_KEY environment variable.",
      });
    }

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
          model: "deepseek/deepseek-chat",
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
      let errorDetails = `HTTP ${response.status}: ${response.statusText}`;
      try {
        const errText = await response.text();
        console.error("OpenRouter API error:", errText);
        errorDetails = errText;
      } catch (readError) {
        console.error("Could not read error response:", readError);
      }
      return res.status(500).json({
        error: "Failed to get response from AI service",
        details: errorDetails,
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
