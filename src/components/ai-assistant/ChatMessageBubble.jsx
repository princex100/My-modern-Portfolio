import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { cn } from "../../lib/utils";

export const ChatMessageBubble = ({ message }) => {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-md",
          isUser
            ? "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-br-sm"
            : "bg-surface/80 backdrop-blur-md border border-primary/20 text-foreground rounded-bl-sm",
        )}
      >
        <div
          className={cn(
            "prose prose-sm max-w-none",
            isUser ? "text-primary-foreground" : "text-foreground dark:prose-invert",
          )}
        >
          <ReactMarkdown
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <div className="rounded-md overflow-hidden my-2 border border-primary/20">
                    <SyntaxHighlighter
                      {...props}
                      children={String(children).replace(/\n$/, "")}
                      style={vscDarkPlus}
                      language={match[1]}
                      PreTag="div"
                      customStyle={{ margin: 0, background: "#000000", fontSize: "0.8rem" }}
                    />
                  </div>
                ) : (
                  <code
                    {...props}
                    className={cn(
                      "px-1 py-0.5 rounded-sm",
                      isUser ? "bg-black/20" : "bg-primary/10 text-primary",
                      className,
                    )}
                  >
                    {children}
                  </code>
                );
              },
              p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>,
              a: ({ children, href }) => (
                <a
                  href={href}
                  className={cn(
                    "underline font-medium hover:text-white transition-colors",
                    isUser ? "text-primary-foreground" : "text-primary",
                  )}
                  target="_blank"
                  rel="noreferrer"
                >
                  {children}
                </a>
              ),
              ul: ({ children }) => <ul className="list-disc pl-4 mb-2 space-y-1">{children}</ul>,
              ol: ({ children }) => (
                <ol className="list-decimal pl-4 mb-2 space-y-1">{children}</ol>
              ),
              li: ({ children }) => <li>{children}</li>,
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
      </div>
    </motion.div>
  );
};
