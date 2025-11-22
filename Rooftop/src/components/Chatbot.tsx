import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { Bot, X, Send, Sun } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useTranslations } from "../hooks/useTranslations";

interface ChatbotProps {
  language: string;
}

const Chatbot: React.FC<ChatbotProps> = ({ language }) => {
  const { t } = useTranslations(language);

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<
    { role: "user" | "model"; content: string }[]
  >([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const chatSessionRef: any = useRef(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll
  useLayoutEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Autofocus input when opened
  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  // Initialize Gemini chat
  useEffect(() => {
    const initializeChat = async () => {
      try {
        const genAI = new GoogleGenerativeAI(
          import.meta.env.VITE_GEMINI_API_KEY
        );

        const model = genAI.getGenerativeModel({
          model: "gemini-2.0-flash",
          systemInstruction: t("chatbot.system.prompt"),
        });

        const chat = model.startChat({
          history: [],
        });

        chatSessionRef.current = chat;

        setMessages([{ role: "model", content: t("chatbot.welcome") }]);
      } catch (err) {
        console.error("Failed to initialize Gemini:", err);
        setMessages([
          {
            role: "model",
            content: "AI service is unavailable. Please try again later.",
          },
        ]);
      }
    };

    if (isOpen) initializeChat();
  }, [language, isOpen, t]);

  const handleToggleChat = () => setIsOpen((prev) => !prev);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed || isLoading) return;

    const newUserMessage = { role: "user" as const, content: trimmed };

    setMessages((prev) => [
      ...prev,
      newUserMessage,
      { role: "model", content: "" },
    ]);
    setInputValue("");
    setIsLoading(true);

    try {
      if (!chatSessionRef.current) throw new Error("Chat session missing");

      const result = await chatSessionRef.current.sendMessageStream(trimmed);

      let fullText = "";

      for await (const chunk of result.stream) {
        const text = chunk.text();
        fullText += text;

        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "model", content: fullText };
          return updated;
        });
      }

      if (!fullText.trim()) {
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "model",
            content: "I couldn't generate a response. Try again.",
          };
          return updated;
        });
      }
    } catch (err) {
      console.error("Send error:", err);
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "model",
          content: "Something went wrong. Please try again later.",
        };
        return updated;
      });
    }

    setIsLoading(false);
  };

  return (
    <>
      {/* Floating Chat Icon */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={handleToggleChat}
          className="w-16 h-16 bg-sky-500/80 dark:bg-fuchsia-600/80 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-all"
        >
          {isOpen ? <X size={32} /> : <Bot size={32} />}
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[90vw] max-w-sm h-[70vh] max-h-[600px] flex flex-col glass-pane rounded-2xl shadow-2xl z-50 animate-scale-in">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/30">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-full">
                <Sun className="text-yellow-400" size={24} />
              </div>
              <h3 className="font-bold text-lg">{t("chatbot.title")}</h3>
            </div>
            <button onClick={handleToggleChat}>
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2 mb-4 ${
                  msg.role === "user" ? "justify-end" : ""
                }`}
              >
                {msg.role === "model" && (
                  <div className="w-8 h-8 rounded-full bg-sky-500/50 flex items-center justify-center">
                    <Bot size={20} className="text-white" />
                  </div>
                )}

                <div
                  className={`max-w-[75%] p-3 text-sm rounded-2xl ${
                    msg.role === "user"
                      ? "bg-sky-500 text-white rounded-br-none"
                      : "bg-white/60 dark:bg-slate-700/60 rounded-bl-none"
                  }`}
                >
                  {msg.role === "model" && msg.content === "" && isLoading ? (
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-75"></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150"></div>
                    </div>
                  ) : (
                    <p style={{ whiteSpace: "pre-wrap" }}>{msg.content}</p>
                  )}
                </div>
              </div>
            ))}

            <div ref={messagesEndRef}></div>
          </div>

          {/* Input Box */}
          <form
            onSubmit={handleSendMessage}
            className="p-4 border-t border-white/30 flex gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              placeholder={t("chatbot.placeholder")}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading}
              className="flex-1 p-2 bg-white/30 rounded-full outline-none"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="p-3 bg-sky-500 text-white rounded-full"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;
