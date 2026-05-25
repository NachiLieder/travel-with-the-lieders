"use client";

/**
 * Helper to access the TripPhotosContext without throwing if the provider
 * isn't mounted. Used by <Gallery>, which should degrade to a no-op click
 * handler if rendered outside a <TripPhotosProvider>.
 */

import { useContext } from "react";
import {
  TripPhotosContext,
  type TripPhoto,
} from "./TripPhotosContext";

export type { TripPhoto };

export function useTripPhotosOptional() {
  return useContext(TripPhotosContext);
}
