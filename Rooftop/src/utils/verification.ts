import type { SiteData, VerificationResult } from "../types";
import { verifySolarInstallation as geminiVerify } from "../services/geminiServices";

/**
 * Builds a prompt from SiteData and sends it to Gemini.
 * Returns a parsed VerificationResult object.
 */
export const verifySolarInstallation = async (
  site: SiteData
): Promise<VerificationResult> => {

  const prompt = `
  Analyze the following site for solar installation.

  Sample ID: ${site.sample_id}
  Latitude: ${site.latitude}
  Longitude: ${site.longitude}

  Return output in STRICT VALID JSON ONLY.
  Use this structure:

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

  // Call Gemini (returns TEXT → must parse)
  const responseText = await geminiVerify(prompt);

  try {
    const cleanJson = responseText.trim();
    return JSON.parse(cleanJson) as VerificationResult;
  } catch (err) {
    console.error("Invalid JSON returned from Gemini:\n", responseText);
    throw new Error("Gemini returned malformed JSON. Check console for details.");
  }
};
