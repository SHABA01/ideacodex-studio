export type StudioMode = {
  id: string;
  label: string;
  icon: string;
};

export const modes: StudioMode[] = [
  {
    id: "reality-lens",
    label: "Reality Lens",
    icon: "fa-solid fa-glasses"
  },
  {
    id: "constraint-engine",
    label: "Constraint Engine",
    icon: "fa-solid fa-sliders"
  },
  {
    id: "idea-funeral",
    label: "Idea Funeral",
    icon: "fa-solid fa-skull"
  }
];
