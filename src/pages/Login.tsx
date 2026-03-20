import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GradientBackground from "@/components/GradientBackground";
import Navbar from "@/components/Navbar";
import { Mail, ArrowRight, KeyRound, CheckCircle2 } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<"email" | "otp" | "success">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      const next = document.getElementById(`otp-${index + 1}`);
      next?.focus();
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setStep("otp");
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.every((d) => d)) {
      if (email.toLowerCase() === 'admin@nine8.com') {
        localStorage.setItem('role', 'admin');
      } else {
        localStorage.setItem('role', 'user');
      }
      setStep("success");
    }
  };

  useEffect(() => {
    if (step === "success") {
      const timer = setTimeout(() => {
        if (localStorage.getItem('role') === 'admin') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [step, navigate]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center">
      <GradientBackground />
      <Navbar />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md mx-6"
      >
        <div className="glass-card p-8 md:p-10" style={{ boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5), 0 0 50px hsl(217, 91%, 60%, 0.08)" }}>
          {step === "email" && (
            <motion.form key="email" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleEmailSubmit}>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/10">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold font-display text-center text-foreground mb-2">Welcome to nine<span className="gradient-text">8</span></h2>
              <p className="text-sm text-muted-foreground text-center mb-8">Enter your email to receive a verification code</p>
              
              <div className="mb-6">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-5 py-3.5 rounded-xl bg-secondary/80 border border-glass-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/30 transition-all duration-300"
                  required
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 0 30px hsl(217, 91%, 60%, 0.3)" }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3.5 rounded-xl font-semibold text-primary-foreground flex items-center justify-center gap-2 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-cyan animate-gradient-shift" style={{ backgroundSize: "200% 200%" }} />
                <span className="relative flex items-center gap-2">Send Code <ArrowRight className="w-4 h-4" /></span>
              </motion.button>
            </motion.form>
          )}

          {step === "otp" && (
            <motion.form key="otp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleOtpSubmit}>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-primary/10 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-accent/10">
                <KeyRound className="w-8 h-8 text-accent" />
              </div>
              <h2 className="text-2xl font-bold font-display text-center text-foreground mb-2">Enter OTP</h2>
              <p className="text-sm text-muted-foreground text-center mb-8">
                We sent a 6-digit code to <span className="text-foreground">{email}</span>
              </p>

              <div className="flex gap-3 justify-center mb-8">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    className="w-12 h-14 text-center text-xl font-bold rounded-xl bg-secondary/80 border border-glass-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/30 transition-all duration-300"
                  />
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 0 30px hsl(217, 91%, 60%, 0.3)" }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3.5 rounded-xl font-semibold text-primary-foreground relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-cyan animate-gradient-shift" style={{ backgroundSize: "200% 200%" }} />
                <span className="relative">Verify & Login</span>
              </motion.button>

              <button type="button" onClick={() => setStep("email")} className="w-full mt-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                ← Back to email
              </button>
            </motion.form>
          )}

          {step === "success" && (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="w-20 h-20 rounded-full bg-neon-green/10 flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle2 className="w-10 h-10 text-neon-green" />
              </motion.div>
              <h2 className="text-2xl font-bold font-display text-foreground mb-2">Welcome!</h2>
              <p className="text-sm text-muted-foreground mb-6">You've been successfully authenticated.</p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
