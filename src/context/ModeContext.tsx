import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { modes } from "../modes/modeConfig";

export type ModeId = string;

type ModeContextType = {
  currentMode: ModeId;
  setMode: (modeId: ModeId) => void;
};

const ModeContext = createContext<ModeContextType | undefined>(undefined);

export function ModeProvider({ children }: { children: ReactNode }) {
  const [currentMode, setCurrentMode] = useState<ModeId>(modes[0].id);

  const setMode = (modeId: ModeId) => {
    setCurrentMode(modeId);
  };

  return (
    <ModeContext.Provider value={{ currentMode, setMode }}>
      {children}
    </ModeContext.Provider>
  );
}

export function useMode() {
  const context = useContext(ModeContext);

  if (!context) {
    throw new Error("useMode must be used inside ModeProvider");
  }

  return context;
}
