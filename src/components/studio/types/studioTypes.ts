export type StudioBlock = {
  id: string;
  type: "text" | "section" | "export";
  tool: string;
  title: string;
  content: string;
  createdAt: number;
};

export type StudioProject = {
  id: string;
  name: string;
  description?: string;
  blocks: StudioBlock[];
  lastUpdated: number;
};

export type ToolOutput = {
  title: string;
  content: string;
};
