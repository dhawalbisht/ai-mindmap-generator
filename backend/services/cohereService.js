import config from '../config/config.js';

export const generateFlowchartData = async (topic) => {
  const prompt = `Generate a list of key concepts with brief definitions for creating a mind map on the topic: ${topic}. Limit responses to 5-10 sentences per concept.`;

  try {
    const response = await fetch('https://api.cohere.ai/v1/generate', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.cohereApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'command',
        prompt: prompt,
        max_tokens: 300,
        temperature: 0.3,
      }),
    });

    const data = await response.json();
    return data.generations[0].text.trim();
  } catch (error) {
    console.error('Error in generateFlowchartData:', error);
    throw error;
  }
};