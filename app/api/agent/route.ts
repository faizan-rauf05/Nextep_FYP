export async function POST(req) {
  try {
    const { message } = await req.json();

    const response = await fetch('https://api.elevenlabs.io/v1/agents/YOUR_AGENT_ID/chat', {
      method: 'POST',
      headers: {
        'xi-api-key': process.env.ELEVENLABS_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: message,
      }),
    });

    const data = await response.json();

    return Response.json({
      reply: data.reply || "No response from agent"
    });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}