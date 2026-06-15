import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChatHeader } from "./ChatHeader";
import { ChatMessageList } from "./ChatMessageList";
import { ChatInputArea } from "./ChatInputArea";

const INITIAL_MESSAGE = {
  id: "welcome",
  role: "ai",
  content:
    "Hey 👋 I'm Prince's AI assistant. Ask me anything about his skills, projects, experience or availability.",
};

export const AIAssistantChat = ({ isOpen, onClose, onMinimize }) => {
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (content) => {
    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      role: "user",
      content,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // Mock AI response
    setTimeout(() => {
      setIsTyping(false);
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: `Thanks for asking about "${content}". I am a mock AI right now, but I can tell you Prince is an amazing developer! Here's a quick code snippet to show you how I can render code:

\`\`\`javascript
function hirePrince() {
  console.log("Best decision ever!");
  return true;

}
\`\`\`

Let me know if you want to know more!
THIS FEATURE IS UNDER DEVELOPMENT.`,
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1500);
  };






  //////////////
  //////////////
  //////////
  ////////////////
  //////////////////////////////

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20, transition: { duration: 0.2 } }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-24 right-6 w-[400px] h-[650px] max-h-[calc(100vh-120px)] max-w-[calc(100vw-32px)] z-50 flex flex-col rounded-[24px] overflow-hidden shadow-[0_10px_40px_-10px_rgba(198,255,46,0.15)] bg-[#050505]/90 backdrop-blur-xl border border-primary/20"
        >
          {/* Subtle noise texture overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml;utf8,<svg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22><filter id=%22noiseFilter%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/></svg>')] z-0" />

          {/* Glow orb behind */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none z-0" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-[80px] pointer-events-none z-0" />

          {/* Chat Content */}
          <div className="relative z-10 flex flex-col h-full">
            <ChatHeader onClose={onClose} onMinimize={onMinimize} />
            <ChatMessageList
              messages={messages}
              isTyping={isTyping}
              onActionClick={handleSendMessage}
            />
            <ChatInputArea onSendMessage={handleSendMessage} disabled={isTyping} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

