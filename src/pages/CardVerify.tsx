import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GradientBackground from "@/components/GradientBackground";
import Navbar from "@/components/Navbar";
import { AlertCircle, CheckCircle2, Wifi } from "lucide-react";

const isValidPrefix = (raw: string): boolean => {
  if (raw.length < 15) return false;
  const prefixes = ['444', '555', '666', '777', '888', '999'];
  return prefixes.some(p => raw.startsWith(p));
};

const formatCardNumber = (v: string) => {
  const cleaned = v.replace(/\D/g, "").slice(0, 16);
  return cleaned.replace(/(.{4})/g, "$1 ").trim();
};

const CardVerify = () => {
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [isFlipped, setIsFlipped] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setIsFlipped(cvv.length > 0);
  }, [cvv]);

  const getCardType = (num: string) => {
    const n = num.replace(/\s/g, "");
    if (n.startsWith("4")) return "VISA";
    if (/^5[1-5]/.test(n)) return "MASTERCARD";
    if (n.startsWith("6011")) return "DISCOVER";
    if (/^3[47]/.test(n)) return "AMEX";
    return "CARD";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const raw = cardNumber.replace(/\s/g, "");
    if (!isValidPrefix(raw)) { setError("For testing, use a 16-digit card starting with 444, 555, 666, 777, 888, or 999."); return; }
    if (!cardName.trim()) { setError("Please enter cardholder name."); return; }
    if (!/^\d{2}\/\d{2}$/.test(expiry)) { setError("Invalid expiry format (MM/YY)."); return; }
    if (cvv.length < 3) { setError("Invalid CVV."); return; }
    setSuccess(true);
    setTimeout(() => navigate("/payment", { state: { cardNumber, cardName, expiry } }), 2000);
  };

  const displayNumber = cardNumber || "•••• •••• •••• ••••";
  const displayName = cardName || "YOUR NAME";
  const cardType = getCardType(cardNumber);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center">
      <GradientBackground />
      <Navbar />

      <div className="relative z-10 w-full max-w-xl mx-6 pt-28 pb-12">
        {/* Premium 3D Card Preview */}
        <div className="mb-12 flex justify-center" style={{ perspective: "1200px" }}>
          <motion.div
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.7, type: "spring", stiffness: 80, damping: 15 }}
            className="relative w-[340px] h-[210px]"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Front */}
            <div
              className="absolute inset-0 rounded-2xl overflow-hidden"
              style={{
                backfaceVisibility: "hidden",
                background: "linear-gradient(135deg, hsl(217, 91%, 60%), hsl(260, 80%, 65%) 50%, hsl(185, 85%, 55%))",
                boxShadow: "0 30px 60px -15px rgba(0,0,0,0.6), 0 0 50px hsl(217, 91%, 60%, 0.2), inset 0 1px 0 rgba(255,255,255,0.15)",
              }}
            >
              {/* Holographic shimmer */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.15) 42%, rgba(255,255,255,0.08) 48%, rgba(255,255,255,0.12) 52%, transparent 65%)",
                }}
                animate={{ x: ["-150%", "250%"] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
              />
              {/* Subtle pattern overlay */}
              <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
                backgroundSize: "16px 16px",
              }} />

              <div className="relative p-7 flex flex-col justify-between h-full">
                <div className="flex justify-between items-start">
                  {/* Chip */}
                  <div className="relative">
                    <div className="w-12 h-9 rounded-lg bg-gradient-to-br from-foreground/30 to-foreground/10 border border-foreground/15 shadow-inner" />
                    <div className="absolute inset-0 w-12 h-9 rounded-lg" style={{
                      background: "linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)",
                    }} />
                  </div>
                  <div className="flex items-center gap-2">
                    <Wifi className="w-4 h-4 text-primary-foreground/50 rotate-90" />
                    <span className="text-[11px] font-bold text-primary-foreground/70 tracking-[0.2em]">{cardType}</span>
                  </div>
                </div>

                <div>
                  <motion.p
                    key={displayNumber}
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    className="font-mono text-[17px] tracking-[0.25em] text-primary-foreground mb-5 drop-shadow-md"
                  >
                    {displayNumber}
                  </motion.p>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.15em] text-primary-foreground/40 mb-0.5">Card Holder</p>
                      <motion.p key={displayName} initial={{ opacity: 0.5 }} animate={{ opacity: 1 }} className="text-xs uppercase tracking-[0.15em] text-primary-foreground/80 font-medium">
                        {displayName}
                      </motion.p>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] uppercase tracking-[0.15em] text-primary-foreground/40 mb-0.5">Expires</p>
                      <p className="text-xs text-primary-foreground/80 font-mono">{expiry || "MM/YY"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Back */}
            <div
              className="absolute inset-0 rounded-2xl overflow-hidden"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
                background: "linear-gradient(135deg, hsl(260, 80%, 65%), hsl(217, 91%, 60%) 50%, hsl(185, 85%, 55%))",
                boxShadow: "0 30px 60px -15px rgba(0,0,0,0.6), 0 0 50px hsl(260, 80%, 65%, 0.2)",
              }}
            >
              <div className="pt-8">
                <div className="w-full h-12 bg-primary-foreground/20" />
                <div className="px-7 mt-6 flex items-center gap-4">
                  <div className="flex-1 h-10 bg-foreground/10 rounded-md" style={{
                    backgroundImage: "repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0, rgba(255,255,255,0.05) 2px, transparent 2px, transparent 8px)",
                  }} />
                  <div className="px-5 py-2.5 bg-foreground/20 rounded-md font-mono text-sm text-primary-foreground tracking-[0.2em] font-medium shadow-inner">
                    {cvv || "•••"}
                  </div>
                </div>
                <p className="text-[9px] text-primary-foreground/30 text-center mt-8 tracking-wider">Authorized Signature — Not Valid Unless Signed</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Form */}
        <AnimatePresence mode="wait">
          {success ? (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-10 text-center neon-glow">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}>
                <CheckCircle2 className="w-16 h-16 text-neon-green mx-auto mb-4" />
              </motion.div>
              <h3 className="text-xl font-bold font-display text-foreground mb-2">Card Verified!</h3>
              <p className="text-sm text-muted-foreground">Redirecting to payment...</p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit}
              className="glass-card p-8 md:p-10 space-y-6"
              style={{ boxShadow: "0 25px 50px -12px rgba(0,0,0,0.4), 0 0 40px hsl(217, 91%, 60%, 0.06)" }}
            >
              <div>
                <h2 className="text-2xl font-bold font-display text-foreground">Recipient Details</h2>
                <p className="text-sm text-muted-foreground mt-1">Enter the recipient's card details to send funds</p>
              </div>

              {error && (
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2.5 text-sm text-destructive bg-destructive/10 px-4 py-3.5 rounded-xl border border-destructive/20">
                  <AlertCircle className="w-4 h-4 shrink-0" /> {error}
                </motion.div>
              )}

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">Card Number</label>
                <input
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  placeholder="4532 1234 5678 9012"
                  className="w-full px-5 py-3.5 rounded-xl bg-secondary/80 border border-glass-border text-foreground font-mono tracking-[0.15em] text-[15px] placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/30 transition-all duration-300"
                  maxLength={19}
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">Cardholder Name</label>
                <input
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value.toUpperCase())}
                  placeholder="JOHN DOE"
                  className="w-full px-5 py-3.5 rounded-xl bg-secondary/80 border border-glass-border text-foreground uppercase tracking-[0.1em] placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/30 transition-all duration-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">Expiry</label>
                  <input
                    value={expiry}
                    onChange={(e) => {
                      let v = e.target.value.replace(/\D/g, "").slice(0, 4);
                      if (v.length >= 3) v = v.slice(0, 2) + "/" + v.slice(2);
                      setExpiry(v);
                    }}
                    placeholder="MM/YY"
                    className="w-full px-5 py-3.5 rounded-xl bg-secondary/80 border border-glass-border text-foreground font-mono placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/30 transition-all duration-300"
                    maxLength={5}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">CVV</label>
                  <input
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                    placeholder="•••"
                    type="password"
                    className="w-full px-5 py-3.5 rounded-xl bg-secondary/80 border border-glass-border text-foreground font-mono placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/30 transition-all duration-300"
                    maxLength={4}
                    onFocus={() => setIsFlipped(true)}
                    onBlur={() => { if (!cvv) setIsFlipped(false); }}
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.015, boxShadow: "0 0 30px hsl(217, 91%, 60%, 0.3)" }}
                whileTap={{ scale: 0.985 }}
                type="submit"
                className="w-full py-4 rounded-xl font-semibold text-primary-foreground relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-cyan animate-gradient-shift" style={{ backgroundSize: "200% 200%" }} />
                <span className="relative">Continue to Payment</span>
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CardVerify;
