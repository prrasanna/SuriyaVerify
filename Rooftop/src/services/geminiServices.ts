import type { VerificationResult } from "../types";
import { GoogleGenerativeAI } from "@google/generative-ai";

// ----------------------------------------
// INIT GEMINI CLIENT
// ----------------------------------------
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

// =====================================================
// 1️⃣ TEXT VERIFICATION (Prompt → Plain Text → JSON parsed outside)
// =====================================================
export async function verifySolarInstallation(input: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const result = await model.generateContent(input);

    return result.response.text().trim();
  } catch (error) {
    console.error("❌ Error in verifySolarInstallation:", error);
    throw new Error("Failed to analyze text input");
  }
}

// =====================================================
// 2️⃣ IMAGE VERIFICATION — STRICT VALID JSON
// =====================================================
export async function verifySolarInstallationFromImage(
  base64: string,
  mimeType: string
): Promise<VerificationResult> {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    // STRICT JSON PROMPT
    const prompt = `
      Analyze this rooftop image and return ONLY valid JSON.
      NO explanations. NO extra text. ONLY a JSON object.

      Required JSON format:

      {
        "sample_id": "",
        "qc_status": "VERIFIABLE" | "NOT_VERIFIABLE",
        "has_solar": true,
        "confidence": 0.95,

        "panel_count_est": 0,
        "capacity_kw_est": 0,

        "lat": 0,
        "lon": 0,

        "pv_area_sqm_est": 0,
        "panel_type_est": "",

        "image_metadata": {
          "source": "",
          "capture_date": ""
        },

        "qc_notes": [],

        "potential_panel_count_est": 0,
        "potential_capacity_kw_est": 0,
        "potential_pv_area_sqm_est": 0,
        "potential_placement_recommendation": "",
        "potential_panel_type_recommendation": ""
      }
    `;

    // IMAGE + PROMPT INPUT
    const response = await model.generateContent([
      {
        inlineData: {
          data: base64,
          mimeType,
        },
      },
      { text: prompt },
    ]);

    const rawText = response.response.text().trim();

    // DEBUG (optional)
    // console.log("🔵 RAW AI OUTPUT:", rawText);

    // Parse JSON safely
    try {
      return JSON.parse(rawText) as VerificationResult;
    } catch (err) {
      console.error("❌ AI returned invalid JSON:", rawText);
      throw new Error("AI returned invalid JSON. Cannot parse result.");
    }
  } catch (error) {
    console.error("❌ Error in verifySolarInstallationFromImage:", error);
    throw new Error("Failed to analyze image data");
  }
}
