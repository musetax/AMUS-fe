"use client";

import { Thread } from "@/components/chatbot/assistant-ui/thread";
import { ThreadList } from "@/components/chatbot/assistant-ui/thread-list";
import TaxDetails from "@/components/chatbot/taxDetails";
import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useChatRuntime } from "@assistant-ui/react-ai-sdk";

export const Assistant = () => {
  const runtime = useChatRuntime({
    api: "/api/chat",
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <div className="flex justify-between px-4 py-5">
        <div className="grid h-dvh grid-cols-1 gap-x-2 px-4 py-4 w-full">
          <Thread />
        </div>
        <div className="block w-96 min-w-[352px] ">
          <TaxDetails />
        </div>
      </div>
    </AssistantRuntimeProvider>
  );
};
