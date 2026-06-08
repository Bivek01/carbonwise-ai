import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the API with the key from environment variables
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

// Helper to sanitize payload to avoid prompt injection or invalid data types
const sanitizeFootprintData = (data) => {
  if (!data || typeof data !== 'object') throw new Error("Invalid footprint data structure.");
  return {
    totalEmissionsKg: Number(data.totalEmissionsKg) || 0,
    transport: data.transport ? {
      type: String(data.transport.type || ''),
      distanceKmPerDay: Number(data.transport.distanceKmPerDay) || 0,
    } : null,
    electricity: data.electricity ? {
      kwhPerMonth: Number(data.electricity.kwhPerMonth) || 0,
    } : null,
    diet: data.diet ? {
      type: String(data.diet.type || ''),
    } : null
  };
};

const generateLocalFallback = (data) => {
  const recommendations = [];

  // Transport
  if (data.transport && data.transport.distanceKmPerDay > 15 && data.transport.type !== 'none') {
    recommendations.push({
      title: "Optimize Your Commute",
      description: `You travel about ${data.transport.distanceKmPerDay}km per day. Consider carpooling, public transit, or an EV to cut down emissions.`,
      impact: "High",
      difficulty: "Medium",
      category: "Transport"
    });
  } else {
    recommendations.push({
      title: "Maintain Vehicle Efficiency",
      description: "Keep tires properly inflated and avoid idling to ensure maximum fuel efficiency during your commutes.",
      impact: "Low",
      difficulty: "Easy",
      category: "Transport"
    });
  }

  // Electricity
  if (data.electricity && data.electricity.kwhPerMonth > 300) {
    recommendations.push({
      title: "Reduce Home Energy Use",
      description: `Your monthly usage of ${data.electricity.kwhPerMonth} kWh is high. Switch to LED bulbs, unplug phantom loads, and use a smart thermostat.`,
      impact: "High",
      difficulty: "Easy",
      category: "Energy"
    });
  } else {
    recommendations.push({
      title: "Green Energy Transition",
      description: "Your energy usage is well-managed. To improve further, look into renewable energy plans offered by your utility.",
      impact: "Medium",
      difficulty: "Medium",
      category: "Energy"
    });
  }

  // Diet
  if (data.diet && (data.diet.type.toLowerCase().includes('meat') || data.diet.type.toLowerCase().includes('mixed'))) {
    recommendations.push({
      title: "Incorporate Plant-Based Meals",
      description: "Reducing meat consumption by just 1-2 days a week can drastically lower your dietary carbon footprint.",
      impact: "High",
      difficulty: "Medium",
      category: "Diet"
    });
  } else {
    recommendations.push({
      title: "Eat Local & Seasonal",
      description: "Continue your sustainable diet by purchasing locally sourced and seasonal produce to reduce transport emissions.",
      impact: "Medium",
      difficulty: "Easy",
      category: "Diet"
    });
  }

  // General Shopping
  recommendations.push({
    title: "Embrace the Circular Economy",
    description: "Before buying new, check if you can repair, buy second-hand, or borrow. Reducing consumption prevents manufacturing emissions.",
    impact: "Medium",
    difficulty: "Medium",
    category: "Shopping"
  });

  const final = recommendations.slice(0, 4);
  final.isFallback = true;
  return final;
};

export const getSustainabilityInsights = async (footprintData) => {
  let safeData;
  try {
    safeData = sanitizeFootprintData(footprintData);
  } catch (err) {
    throw new Error('Invalid footprint data structure.');
  }

  if (!apiKey) {
    // If no API key, bypass error and use fallback immediately
    if (import.meta.env.DEV) console.warn("No API key found. Using local fallback.");
    return generateLocalFallback(safeData);
  }

  try {
    const prompt = `
      You are an expert AI Sustainability Coach. 
      Analyze the following user carbon footprint data:
      ${JSON.stringify(safeData, null, 2)}
      
      Provide 3 to 4 personalized, highly specific, and actionable recommendations to reduce their emissions. Focus on the areas with the highest impact based on their data.
      
      Respond strictly with a valid JSON array of objects. Do not include any markdown formatting like \`\`\`json. Just the raw JSON array.
      
      Each object must have exactly these keys:
      - "title": A short, catchy title for the recommendation (string).
      - "description": A clear explanation of what to do and why it helps based on their specific data (string, max 2-3 sentences).
      - "impact": The potential emission reduction impact. Must be exactly one of: "High", "Medium", "Low".
      - "difficulty": How hard it is to implement. Must be exactly one of: "Easy", "Medium", "Hard".
      - "category": The area of focus. Must be exactly one of: "Energy", "Transport", "Diet", "Shopping", "Water".
    `;

    // 15 second timeout to prevent indefinite hanging
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('API Request Timeout')), 15000)
    );

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const result = await Promise.race([
      model.generateContent(prompt),
      timeoutPromise
    ]);

    const response = result.response;
    let text = response.text();
    
    // Attempt to parse the JSON. Clean up any accidental markdown formatting.
    text = text.replace(/```json/gi, '').replace(/```/g, '').trim();
    const insights = JSON.parse(text);
    
    return insights;
  } catch (error) {
    // Log the API failure in development
    if (import.meta.env.DEV) {
      console.error('[Dev Only] Error fetching insights from Gemini. Falling back to local rules:', error);
    }
    
    // Fallback to local rule-based recommendations regardless of error type
    return generateLocalFallback(safeData);
  }
};
