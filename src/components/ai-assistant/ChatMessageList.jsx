import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChatMessageBubble } from "./ChatMessageBubble";
import { TypingIndicator } from "./TypingIndicator";

export const ChatMessageList = ({ messages, isTyping, onActionClick }) => {
  const scrollRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const quickActions = ["View Projects", "Tech Stack", "Experience", "Contact Prince"];

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto p-4 space-y-6 scroll-smooth"
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
        ::-webkit-scrollbar {
          display: none;
        }
      `,
        }}
      />

      {/* Initial Welcome & Quick Actions */}
      {messages.length === 1 && messages[0].role === "ai" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="flex flex-wrap gap-2 mt-4"
        >
          {quickActions.map((action, i) => (
            <button
              key={action}
              onClick={() => onActionClick(action)}
              className="text-xs px-3 py-1.5 rounded-full border border-primary/40 text-primary hover:bg-primary/10 hover:border-primary hover:shadow-[0_0_10px_rgba(198,255,46,0.3)] transition-all"
            >
              {action}
            </button>
          ))}
        </motion.div>
      )}

      {/* Messages */}
      {messages.map((message) => (
        <ChatMessageBubble key={message.id} message={message} />
      ))}

      {/* Typing Indicator */}
      {isTyping && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-start"
        >
          <div className="bg-surface/80 backdrop-blur-md border border-primary/20 rounded-2xl rounded-bl-sm px-4 py-3 w-fit shadow-md">
            <TypingIndicator />
          </div>
        </motion.div>
      )}
    </div>
  );
};
