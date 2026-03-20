import { motion } from "framer-motion";

const cards = [
  { color: "from-neon-blue via-accent to-neon-purple", name: "PLATINUM", number: "4532 •••• •••• 7890", delay: 0.2, x: -120, y: -40, rotate: -12 },
  { color: "from-neon-purple via-neon-blue to-neon-cyan", name: "GOLD", number: "5412 •••• •••• 3456", delay: 0.5, x: 80, y: 20, rotate: 8 },
  { color: "from-neon-cyan via-neon-green to-neon-blue", name: "STUDENT", number: "6011 •••• •••• 1234", delay: 0.8, x: -40, y: 80, rotate: -4 },
];

const FloatingCards = () => {
  return (
    <div className="relative w-full h-[400px] flex items-center justify-center">
      {cards.map((card, i) => (
        <motion.div
          key={i}
          initial={{ y: -600, rotate: -20 + i * 10, opacity: 0 }}
          animate={{ y: card.y, x: card.x, rotate: card.rotate, opacity: 1 }}
          transition={{ delay: card.delay, duration: 1.2, type: "spring", stiffness: 60, damping: 15 }}
          className="absolute"
        >
          <motion.div
            animate={{ y: [0, -15, 0], rotate: [card.rotate, card.rotate + 2, card.rotate] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
            className={`w-[300px] h-[185px] rounded-2xl bg-gradient-to-br ${card.color} p-6 relative overflow-hidden`}
            style={{
              perspective: "1000px",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px hsl(217, 91%, 60%, 0.15), inset 0 1px 0 rgba(255,255,255,0.1)",
            }}
          >
            {/* Holographic shine */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 45%, rgba(255,255,255,0.05) 50%, transparent 55%)",
              }}
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
            />
            
            {/* Chip */}
            <div className="w-11 h-8 rounded-md bg-gradient-to-br from-foreground/25 to-foreground/10 backdrop-blur-sm mb-5 border border-foreground/10 shadow-inner" />
            
            {/* Card number */}
            <p className="font-mono text-[15px] tracking-[0.2em] text-primary-foreground/90 mb-5 drop-shadow-sm">
              {card.number}
            </p>
            
            {/* Card name */}
            <div className="flex justify-between items-end">
              <p className="text-xs uppercase tracking-[0.15em] text-primary-foreground/60 font-medium">
                nine8 {card.name}
              </p>
              <div className="flex -space-x-2">
                <div className="w-7 h-7 rounded-full bg-primary-foreground/25 shadow-sm" />
                <div className="w-7 h-7 rounded-full bg-primary-foreground/15 shadow-sm" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingCards;
