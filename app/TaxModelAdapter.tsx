"use client";
 
import type { ReactNode } from "react";
import {
 
  type ChatModelAdapter,
} from "@assistant-ui/react";
 import axios from "axios";



 
 
 export const TaxModelAdapter = (sessionId: string): ChatModelAdapter => ({
  async *run({ messages, abortSignal, context }) {
    try {
      console.log(messages, "messages", abortSignal, "abortSignal", context, "context");

      const count = 5;
      const start = messages.length > count ? messages.length - count : 0;
      const history: string[] = [];

      const message: any = messages;
      for (let i = message.length - 1; i >= start; i--) {
        const text = message[i].content[0].text;
        if (message[i].role === "user") {
          history.push(`user:${text}`);
        } else {
          history.push(`assistant:${text}`);
        }
      }

      const userMessage = message[message.length - 1].content[0].text;

      const response = await axios.post(
        `https://amus-devapi.musetax.com/api/chat/${sessionId}/message`,
        { message: userMessage },
        // { signal: abortSignal }
      );

      console.log(response, "response");

      const text = response.data.response || "No response";
      const suggestions = ["What are the tax benefits?", "Can I deduct this expense?"];

      yield {
        content: [{ type: "text", text }],
        metadata: {
          custom: {
            suggestions
          }
      }
    }
    } catch (error: any) {
      console.error("Error in TaxModelAdapter:", error);

      yield {
        content: [
          {
            type: "text",
            text: "Sorry, something went wrong. Please try again.",
          },
        ],
      };
    }
  },
});
