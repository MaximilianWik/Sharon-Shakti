export type Work = {
  slug: string;
  title: string;
  style: string;
  placement: string;
  year: number;
  seed: number;
  span?: "tall" | "wide" | "normal";
};

// Placeholder catalogue. Replace `seed`-driven plates with real photographs
// (drop files in /public/works and swap <Placeholder> for next/image).
export const works: Work[] = [
  { slug: "the-mourner", title: "The Mourner", style: "Horror Realism", placement: "Full back", year: 2025, seed: 3, span: "tall" },
  { slug: "ossuary", title: "Ossuary", style: "Blackwork", placement: "Forearm sleeve", year: 2025, seed: 7 },
  { slug: "veil", title: "Veil", style: "Dark Art", placement: "Sternum", year: 2024, seed: 12, span: "wide" },
  { slug: "relic", title: "Relic", style: "Blackwork", placement: "Thigh", year: 2024, seed: 19 },
  { slug: "the-host", title: "The Host", style: "Horror Realism", placement: "Chest", year: 2024, seed: 23, span: "tall" },
  { slug: "wound", title: "Wound", style: "Dark Art", placement: "Calf", year: 2023, seed: 31 },
  { slug: "saint-of-flies", title: "Saint of Flies", style: "Horror Realism", placement: "Half sleeve", year: 2023, seed: 41, span: "wide" },
  { slug: "marrow", title: "Marrow", style: "Blackwork", placement: "Spine", year: 2023, seed: 47 },
  { slug: "effigy", title: "Effigy", style: "Dark Art", placement: "Hand", year: 2022, seed: 53 },
];
