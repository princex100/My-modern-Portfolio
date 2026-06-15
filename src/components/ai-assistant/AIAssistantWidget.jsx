import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X } from "lucide-react";
import { AIAssistantChat } from "./AIAssistantChat";

export const AIAssistantWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <AIAssistantChat
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onMinimize={() => setIsOpen(false)}
      />

      <motion.button
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-tr from-primary to-primary/80 text-primary-foreground flex items-center justify-center shadow-[0_0_20px_rgba(198,255,46,0.3)] z-50 group hover:shadow-[0_0_30px_rgba(198,255,46,0.5)] transition-shadow duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Toggle AI Assistant"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-8 h-8" />
            </motion.div>
          ) : (
            <motion.div
              key="bot"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <Bot className="w-8 h-8 drop-shadow-[0_0_8px_rgba(0,0,0,0.5)]" />
              {/* Tooltip / Hint on hover when closed */}
              <AnimatePresence>
                {isHovered && !isOpen && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="absolute -top-12 -right-2 bg-surface text-foreground text-xs font-medium px-3 py-1.5 rounded-lg whitespace-nowrap border border-primary/20 shadow-lg"
                  >
                    Ask Prince AI ✨
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
};
