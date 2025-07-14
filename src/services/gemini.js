// src/services/gemini.js
// src/services/gemini.js
const API_KEY = "AIzaSyDHrfJCcqqvlZkmNR2WT3-A0flqsOVcmNs"; // Replace with your actual API key
const GEMINI_ENDPOINT = "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent";

export const gemini = {
  generateContent: async (prompt) => {
    const response = await fetch(`${GEMINI_ENDPOINT}?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gemini API Error: ${errorText}`);
    }

    const data = await response.json();
    return {
      response: {
        text: () => data.candidates?.[0]?.content?.parts?.[0]?.text || "No response from Gemini."
      }
    };
  }
};
export default gemini;