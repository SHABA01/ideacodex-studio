// src/config/modeConfig.ts

export type StudioMode = {
  id: string;
  label: string;
  icon: string;
};

export const modes: StudioMode[] = [
  {
    id: "reality-lens",
    label: "Reality Lens",
    icon: "fa-solid fa-glasses",
  },
  {
    id: "constraint-engine",
    label: "Constraint Engine",
    icon: "fa-solid fa-sliders",
  },
  {
    id: "idea-funeral",
    label: "Idea Funeral",
    icon: "fa-solid fa-skull",
  },
  {
    id: "minimal-viable-spark",
    label: "Minimal Viable Spark",
    icon: "fa-solid fa-lightbulb",
  },
  {
    id: "reality-breaker",
    label: "Reality Breaker",
    icon: "fa-solid fa-bolt",
  },
  {
    id: "devils-advocate",
    label: "Devil’s Advocate",
    icon: "fa-solid fa-scale-balanced",
  },
  {
    id: "execution-map",
    label: "Execution Map",
    icon: "fa-solid fa-map",
  },
  {
    id: "market-sniper",
    label: "Market Sniper",
    icon: "fa-solid fa-crosshairs",
  },
  {
    id: "risk-radar",
    label: "Risk Radar",
    icon: "fa-solid fa-radar",
  },
  {
    id: "narrative-builder",
    label: "Narrative Builder",
    icon: "fa-solid fa-pen",
  },
  {
    id: "leverage-finder",
    label: "Leverage Finder",
    icon: "fa-solid fa-chart-line",
  },
  {
    id: "signal-extractor",
    label: "Signal Extractor",
    icon: "fa-solid fa-filter",
  },
  {
    id: "decision-matrix",
    label: "Decision Matrix",
    icon: "fa-solid fa-table",
  },
];
