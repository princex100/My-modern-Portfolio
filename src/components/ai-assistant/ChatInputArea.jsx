import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";

export const ChatInputArea = ({ onSendMessage, disabled }) => {
  const [input, setInput] = useState("");
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSendMessage(input.trim());
      setInput("");
      // Reset height
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Auto-grow textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-black/40 backdrop-blur-md border-t border-primary/20 flex items-end gap-2 shrink-0 z-10"
    >
      <textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask about Prince's projects...."
        disabled={disabled}
        className="flex-1 max-h-[120px] min-h-[44px] bg-surface/50 border border-border rounded-2xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary resize-none transition-all scrollbar-hide"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      />
      <button
        type="submit"
        disabled={!input.trim() || disabled}
        className="w-11 h-11 shrink-0 rounded-full bg-primary flex items-center justify-center text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 hover:shadow-[0_0_15px_rgba(198,255,46,0.6)] transition-all duration-300"
        aria-label="Send message"
      >
        <Send className="w-5 h-5 ml-1" />
      </button>
    </form>
  );
};
