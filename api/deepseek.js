export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const apiKey = process.env.DEEPSEEK_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: "DEEPSEEK_API_KEY no está configurada en Vercel"
    });
  }

  try {
    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        temperature: 0.2,
        messages: req.body.messages || []
      })
    });

    const data = await response.json();

    return res.status(response.status).json(data);
  } catch (error) {
    return res.status(500).json({
      error: "No se pudo conectar con DeepSeek",
      detail: error.message
    });
  }
}
