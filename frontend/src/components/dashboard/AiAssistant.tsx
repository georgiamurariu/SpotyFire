"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, X, Bot, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatMessage } from "@/types";
import { useUser } from "@stackframe/stack";
import { API_URL } from "@/lib/api";

interface ChatResponse {
  response: string;
  suggested_actions?: string[];
  claim_summary?: Record<string, unknown>;
}

const renderMarkdown = (text: string) => {
  let html = text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(
      /`(.+?)`/g,
      '<code class="bg-slate-700 px-1 rounded text-green-400">$1</code>'
    )
    .replace(
      /^### (.+)$/gm,
      '<h3 class="text-base font-bold mt-2 mb-1">$1</h3>'
    )
    .replace(/^## (.+)$/gm, '<h2 class="text-lg font-bold mt-2 mb-1">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-xl font-bold mt-2 mb-1">$1</h1>')
    .replace(/^- (.+)$/gm, '<li class="ml-4">• $1</li>')
    .replace(/^\d+\. (.+)$/gm, '<li class="ml-4">$1</li>')
    .replace(/\n/g, "<br/>");
  return html;
};

export default function AiAssistant() {
  const user = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Bună! Sunt SpotyBot, asistentul tău pentru monitorizarea terenurilor. Cum te pot ajuta astăzi?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [suggestedActions, setSuggestedActions] = useState<string[]>([]);

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const chatRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPosition({
        x: window.innerWidth - 460,
        y: window.innerHeight - 650,
      });
    }
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const accessToken = await user
        ?.getAuthJson()
        .then((auth) => auth?.accessToken);

      const response = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        },
        body: JSON.stringify({
          message: userMessage.content,
          context: null,
          conversation_history: messages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data: ChatResponse = await response.json();

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      if (data.suggested_actions && data.suggested_actions.length > 0) {
        setSuggestedActions(data.suggested_actions);
      }
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "Îmi pare rău, a apărut o eroare. Vă rugăm să încercați din nou.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestedPrompt = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <>
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-16 w-16 rounded-full bg-green-600 hover:bg-green-700 shadow-lg z-9999"
          size="icon"
        >
          <MessageCircle className="h-7 w-7" />
        </Button>
      )}

      {isOpen && (
        <div
          ref={chatRef}
          className="fixed top-4 pt-20 right-4 bottom-4 w-[45vw] min-w-[350px] max-w-[500px] bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 flex flex-col z-9999 overflow-hidden"
        >
          <div className="bg-green-600 p-4 flex items-center justify-between select-none">
            <div className="flex items-center gap-2">
              <Bot className="h-6 w-6 text-white" />
              <div>
                <h3 className="font-semibold text-white">SpotyBot</h3>
                <p className="text-xs text-green-200">Agent de Teren AI</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-green-700"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {suggestedActions.length > 0 && (
            <div className="px-3 py-2 bg-slate-800/80 border-b border-slate-700">
              <p className="text-xs text-slate-400 mb-1.5">Acțiuni sugerate:</p>
              <div className="flex flex-wrap gap-1.5">
                {suggestedActions.map((action, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setInput(action);
                      setSuggestedActions([]);
                    }}
                    className="text-xs bg-green-600/20 text-green-400 px-2.5 py-1 rounded-full hover:bg-green-600/30 flex items-center gap-1 border border-green-600/30"
                  >
                    <Sparkles className="h-3 w-3" />
                    {action}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2 ${
                    message.role === "user"
                      ? "bg-green-600 text-white rounded-br-md"
                      : "bg-slate-800 text-slate-200 rounded-bl-md"
                  }`}
                >
                  {message.role === "assistant" ? (
                    <div
                      className="text-sm prose prose-invert prose-sm max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: renderMarkdown(message.content),
                      }}
                    />
                  ) : (
                    <p className="text-sm">{message.content}</p>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-800 rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex gap-1">
                    <span
                      className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <span
                      className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-3 border-t border-slate-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Scrie un mesaj..."
                className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <Button
                onClick={handleSend}
                size="icon"
                className="bg-green-600 hover:bg-green-700"
                disabled={!input.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
