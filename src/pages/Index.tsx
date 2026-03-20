import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import FloatingCards from "@/components/FloatingCards";
import GradientBackground from "@/components/GradientBackground";
import Navbar from "@/components/Navbar";
import { ArrowRight, Shield, Zap, CreditCard, BarChart3 } from "lucide-react";

const features = [
  { icon: Shield, title: "Bank-Grade Security", desc: "256-bit encryption with real-time fraud detection" },
  { icon: Zap, title: "Instant Payments", desc: "Process any payment in under 3 seconds" },
  { icon: CreditCard, title: "Smart Cards", desc: "Virtual and physical cards with spending controls" },
  { icon: BarChart3, title: "Live Analytics", desc: "Real-time dashboards for every transaction" },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <GradientBackground />
      <Navbar />

      {/* Hero */}
      <section className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary border border-glass-border mb-6"
              >
                <span className="w-2 h-2 rounded-full bg-neon-green animate-glow-pulse" />
                <span className="text-xs font-medium text-muted-foreground">Trusted by 50,000+ users across India</span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-bold font-display leading-tight mb-6">
                <span className="text-foreground">The Future of</span>
                <br />
                <span className="gradient-text">Digital Payments</span>
              </h1>

              <p className="text-lg text-muted-foreground max-w-md mb-8 leading-relaxed">
                A premium fintech platform built for India. Send money, verify cards, manage finances, and track spending — all in one place.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: "0 0 30px hsl(217, 91%, 60%, 0.4)" }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate("/verify")}
                  className="group relative px-8 py-4 rounded-xl font-semibold text-primary-foreground overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-cyan animate-gradient-shift" style={{ backgroundSize: "200% 200%" }} />
                  <span className="relative flex items-center gap-2">
                    Get Started <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate("/dashboard")}
                  className="px-8 py-4 rounded-xl font-semibold border border-glass-border bg-secondary/50 text-foreground hover:bg-secondary transition-colors"
                >
                  View Dashboard
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <FloatingCards />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">
              Built for <span className="gradient-text">Modern India</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Every feature designed to make payments seamless and secure.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5, boxShadow: "0 0 30px hsl(217, 91%, 60%, 0.15)" }}
                className="glass-card p-6 group transition-shadow duration-500"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold font-display text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="glass-card p-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center neon-glow">
            {[
              { value: "₹9.8Cr+", label: "Processed" },
              { value: "50K+", label: "Users" },
              { value: "99.9%", label: "Uptime" },
              { value: "<3s", label: "Avg Speed" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <p className="text-3xl md:text-4xl font-bold font-display gradient-text">{s.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">© 2026 nine8. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <span className="hover:text-foreground cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-foreground cursor-pointer transition-colors">Terms</span>
            <span className="hover:text-foreground cursor-pointer transition-colors">Support</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
