const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Initialize Gemini
const apiKey = process.env.API_KEY;
if (!apiKey) {
  console.warn("Warning: API_KEY not set in environment variables.");
}
const ai = new GoogleGenAI({ apiKey: apiKey });

// Schemas (Matched with Frontend)
const coordinateResponseSchema = {
  type: Type.OBJECT,
  properties: {
    sample_id: { type: Type.STRING },
    lat: { type: Type.NUMBER },
    lon: { type: Type.NUMBER },
    has_solar: { type: Type.BOOLEAN },
    confidence: { type: Type.NUMBER },
    panel_count_est: { type: Type.INTEGER },
    pv_area_sqm_est: { type: Type.NUMBER },
    capacity_kw_est: { type: Type.NUMBER },
    qc_status: { type: Type.STRING, enum: ["VERIFIABLE", "NOT_VERIFIABLE"] },
    qc_notes: { type: Type.ARRAY, items: { type: Type.STRING } },
    bbox_or_mask: { type: Type.STRING },
    image_metadata: {
      type: Type.OBJECT,
      properties: {
        source: { type: Type.STRING },
        capture_date: { type: Type.STRING },
      },
      required: ["source", "capture_date"],
    },
    potential_panel_count_est: { type: Type.INTEGER },
    potential_pv_area_sqm_est: { type: Type.NUMBER },
    potential_capacity_kw_est: { type: Type.NUMBER },
  },
  required: [
    "sample_id", "lat", "lon", "has_solar", "confidence", "panel_count_est",
    "pv_area_sqm_est", "capacity_kw_est", "qc_status", "qc_notes", "image_metadata"
  ],
};

const imageResponseSchema = {
  type: Type.OBJECT,
  properties: {
    sample_id: { type: Type.STRING },
    has_solar: { type: Type.BOOLEAN },
    confidence: { type: Type.NUMBER },
    panel_count_est: { type: Type.INTEGER },
    pv_area_sqm_est: { type: Type.NUMBER },
    capacity_kw_est: { type: Type.NUMBER },
    qc_status: { type: Type.STRING, enum: ["VERIFIABLE", "NOT_VERIFIABLE"] },
    qc_notes: { type: Type.ARRAY, items: { type: Type.STRING } },
    bbox_or_mask: { type: Type.STRING },
    image_metadata: {
      type: Type.OBJECT,
      properties: {
        source: { type: Type.STRING },
        capture_date: { type: Type.STRING },
      },
      required: ["source", "capture_date"],
    },
    potential_panel_count_est: { type: Type.INTEGER },
    potential_pv_area_sqm_est: { type: Type.NUMBER },
    potential_capacity_kw_est: { type: Type.NUMBER },
    panel_type_est: { type: Type.STRING },
    potential_placement_recommendation: { type: Type.STRING },
    potential_panel_type_recommendation: { type: Type.STRING },
  },
  required: [
    "sample_id", "has_solar", "confidence", "panel_count_est",
    "pv_area_sqm_est", "capacity_kw_est", "qc_status", "qc_notes", "image_metadata"
  ],
};

// Routes
app.post('/api/verify', async (req, res) => {
  try {
    const site = req.body;
    const userDataProvided = site.has_solar !== undefined || site.panel_count !== undefined || site.area_sqm !== undefined;

    const userDataPrompt = `
      User-Submitted Data (for verification purposes):
      - Solar Panels Present?: ${site.has_solar ?? 'Not provided'}
      - Panel Count: ${site.panel_count ?? 'Not provided'}
      - Rooftop Area (sqm): ${site.area_sqm ?? 'Not provided'}
    `;

    const prompt = `
      You are an advanced AI model specialized in analyzing satellite imagery for rooftop solar panel installations.
      Act as if you have analyzed a recent, high-resolution satellite image for the given coordinate.
      
      Coordinate: Lat ${site.latitude}, Lon ${site.longitude}, ID ${site.sample_id}
      ${userDataProvided ? userDataPrompt : ''}

      Task:
      1. Verify if solar panels are present (has_solar).
      2. If TRUE: Estimate panel_count_est (8-24), pv_area_sqm_est, capacity_kw_est. Set potential_* to 0.
      3. If FALSE: Set existing fields to 0. Analyze potential (potential_panel_count_est, etc).
      4. Compare with user data in qc_notes if provided.
      5. Provide confidence (0.75-0.99) and metadata.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: coordinateResponseSchema,
      },
    });

    const result = JSON.parse(response.text);
    
    // Consistency Check
    if (!result.has_solar) {
        result.panel_count_est = 0;
        result.pv_area_sqm_est = 0;
        result.capacity_kw_est = 0;
    } else {
        result.potential_panel_count_est = 0;
        result.potential_pv_area_sqm_est = 0;
        result.potential_capacity_kw_est = 0;
    }

    res.json(result);
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/verify-image', async (req, res) => {
  try {
    const { imageBase64, mimeType } = req.body;
    
    const prompt = `
      Analyze the provided rooftop image for solar panel installations.
      1. Check Image Quality: If blurry/obstructed, set qc_status='NOT_VERIFIABLE', has_solar=false, all estimates 0.
      2. If Clear: Determine has_solar.
      3. If has_solar=TRUE: Estimate existing capacity/panels, determine panel_type_est.
      4. If has_solar=FALSE: Estimate potential capacity/panels, provide recommendations.
      5. Set confidence and metadata (Source: User Upload).
    `;

    const imagePart = {
      inlineData: {
        mimeType: mimeType,
        data: imageBase64,
      },
    };

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: {
        parts: [imagePart, { text: prompt }],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: imageResponseSchema,
      },
    });

    const result = JSON.parse(response.text);
    
    if (!result.has_solar) {
        result.panel_count_est = 0;
        result.pv_area_sqm_est = 0;
        result.capacity_kw_est = 0;
    } else {
        result.potential_panel_count_est = 0;
        result.potential_pv_area_sqm_est = 0;
        result.potential_capacity_kw_est = 0;
    }

    res.json(result);
  } catch (error) {
    console.error('Image API Error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});