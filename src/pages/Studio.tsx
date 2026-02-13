import React from "react";
import { useStudioProjects } from "../hooks/useStudioProjects";
import { useStudioTool } from "../hooks/useStudioTool";

import StudioLayout from "../components/studio/layout/StudioLayout";
import StudioTopbar from "../components/studio/layout/StudioTopbar";
import StudioCanvas from "../components/studio/canvas/StudioCanvas";
import AIBar from "../components/studio/assistants/AIBar";
import { mockAIResponse } from "../components/studio/assistants/mockAI";

export default function Studio() {
  const { project, addBlock } = useStudioProjects();

  return (
    <StudioLayout
      topbar={
        <StudioTopbar
          projectName={project.name}
          onOpenTools={tool.openLauncher}
        />
      }
    
      canvas={<StudioCanvas blocks={project.blocks} />}
      
      aiBar={
        <AIBar
          onSend={(text) => {
            // 1️⃣ User message
            const userBlock = {
              id: Date.now().toString(),
              role: "user",
              content: text,
              createdAt: Date.now()
            };
          
            addBlock(userBlock);
          
            // 2️⃣ Mock AI response
            setTimeout(() => {
              addBlock(mockAIResponse(text));
            }, 600);
          }}
        />
      }
    />
  );
}
