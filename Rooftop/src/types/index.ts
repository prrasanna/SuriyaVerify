// ----------------------------------------------
// 1. Site Data

import type { ReactNode } from "react";

// ----------------------------------------------
export interface SiteData {
  capture_date: ReactNode;
  sample_id: string;
  latitude: number;
  longitude: number;
}

// ----------------------------------------------
// 2. QC Status Enum
// ----------------------------------------------
export type QCStatus = 'VERIFIABLE' | 'NOT_VERIFIABLE';

// ----------------------------------------------
// 3. Verification Result (MERGED & CLEANED)
// ----------------------------------------------
export interface VerificationResult {
  sample_id: string;

  // QC status from enum
  qc_status: QCStatus;

  // Solar detection
  has_solar: boolean;

  confidence: number;
  panel_count_est?: number;
  capacity_kw_est?: number;

  // Location (optional)
  lat?: number;
  lon?: number;

  // Extra details
  pv_area_sqm_est?: number;
  panel_type_est?: string;

  image_metadata: {
    source: string;
    capture_date: string;
  };

  // Notes
  qc_notes?: string[];

  // Potential future estimates
  potential_panel_count_est?: number;
  potential_capacity_kw_est?: number;
  potential_pv_area_sqm_est?: number;
  potential_placement_recommendation?: string;
  potential_panel_type_recommendation?: string;

  // Optional generic message
  message?: string;
}
