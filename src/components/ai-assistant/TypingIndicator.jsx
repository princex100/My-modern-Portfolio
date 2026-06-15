import { motion } from "framer-motion";

export const TypingIndicator = () => {
  return (
    <div className="flex items-center space-x-1.5 p-1 h-6">
      {[0, 1, 2].map((dot) => (
        <motion.div
          key={dot}
          className="w-2 h-2 bg-primary rounded-full"
          initial={{ opacity: 0.3, y: 0 }}
          animate={{
            opacity: [0.3, 1, 0.3],
            y: [0, -4, 0],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: dot * 0.2,
            ease: "easeInOut",
          }}
          style={{
            boxShadow: "0 0 8px rgba(198, 255, 46, 0.4)", // Lime glow
          }}
        />
      ))}
    </div>
  );
};
