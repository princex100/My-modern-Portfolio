import { Bot, Minus, X } from "lucide-react";

export const ChatHeader = ({ onMinimize, onClose }) => {
  return (
    <div className="h-[72px] sticky top-0 flex items-center justify-between px-4 bg-black/40 backdrop-blur-md border-b border-primary/20 shrink-0 z-10">
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
            <Bot className="w-5 h-5 text-primary drop-shadow-[0_0_8px_rgba(198,255,46,0.6)]" />
          </div>
          {/* Online indicator */}
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-primary rounded-full border border-black shadow-[0_0_5px_rgba(198,255,46,0.8)]" />
        </div>

        {/* Title & Subtitle */}
        <div className="flex flex-col">
          <h3 className="text-foreground font-semibold text-sm tracking-tight leading-tight">
            Ask Prince AI
          </h3>
          <p className="text-muted-foreground text-xs font-medium">Portfolio Assistant</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-1 text-muted-foreground">
        <button
          onClick={onMinimize}
          className="p-1.5 hover:bg-white/10 hover:text-foreground rounded-md transition-colors"
          aria-label="Minimize"
        >
          <Minus className="w-4 h-4" />
        </button>
        <button
          onClick={onClose}
          className="p-1.5 hover:bg-destructive/20 hover:text-destructive rounded-md transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
