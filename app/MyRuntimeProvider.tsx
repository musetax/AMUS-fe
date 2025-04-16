"use client";
 
import type { ReactNode } from "react";
import {
 
  type ChatModelAdapter,
} from "@assistant-ui/react";
 



export const MyModelAdapter: ChatModelAdapter = {
    async *run({ messages, abortSignal, context }) {
      const stream = 'hhhhhihihihihi'
      console.log('hiihhihiih')
   
      let text = "";
      for await (const part of stream) {
        text += part || "";
   
        yield {
          content: [{ type: "text", text }],
        };
      }
    },
  };