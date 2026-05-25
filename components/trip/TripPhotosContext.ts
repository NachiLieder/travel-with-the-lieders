"use client";

import { createContext } from "react";

export type TripPhoto = {
  id: string;
  filename?: string;
  src: string;
  large?: string;
  medium?: string;
  thumb?: string;
  width?: number;
  height?: number;
  caption?: string;
  altText?: string;
};

export type TripPhotosContextValue = {
  gallery: TripPhoto[];
  open: (index: number) => void;
  resolve: (
    idOrMatch: string
  ) => { index: number; photo: TripPhoto } | null;
};

export const TripPhotosContext =
  createContext<TripPhotosContextValue | null>(null);
