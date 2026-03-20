import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import GradientBackground from "@/components/GradientBackground";
import {
  CreditCard, TrendingUp, Users, Activity, ArrowUpRight, Calendar,
  CheckCircle2, Clock
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

// Aggregated data from mock_cards_1000_rows.csv
const cardsOverTime = [
  { year: "2020", cards: 142 },
  { year: "2021", cards: 168 },
  { year: "2022", cards: 185 },
  { year: "2023", cards: 198 },
  { year: "2024", cards: 175 },
  { year: "2025", cards: 132 },
];

const monthlyRegistrations = [
  { month: "Jan", cards: 85 }, { month: "Feb", cards: 78 }, { month: "Mar", cards: 92 },
  { month: "Apr", cards: 88 }, { month: "May", cards: 95 }, { month: "Jun", cards: 82 },
  { month: "Jul", cards: 79 }, { month: "Aug", cards: 86 }, { month: "Sep", cards: 74 },
  { month: "Oct", cards: 91 }, { month: "Nov", cards: 83 }, { month: "Dec", cards: 67 },
];

const expiryDistribution = [
  { name: "2026", value: 98, color: "hsl(217, 91%, 60%)" },
  { name: "2027", value: 142, color: "hsl(260, 80%, 65%)" },
  { name: "2028", value: 118, color: "hsl(185, 85%, 55%)" },
  { name: "2029", value: 156, color: "hsl(150, 80%, 50%)" },
  { name: "2030", value: 168, color: "hsl(45, 90%, 55%)" },
  { name: "2031", value: 152, color: "hsl(340, 75%, 60%)" },
  { name: "2032", value: 166, color: "hsl(280, 70%, 60%)" },
];

const recentCards = [
  { id: 26, userId: 93, last4: "2453", expiry: "05/2030", created: "2025-03-06" },
  { id: 33, userId: 51, last4: "3067", expiry: "03/2032", created: "2025-03-12" },
  { id: 31, userId: 160, last4: "1820", expiry: "01/2026", created: "2025-01-26" },
  { id: 16, userId: 13, last4: "5304", expiry: "11/2029", created: "2025-01-08" },
  { id: 20, userId: 179, last4: "6532", expiry: "11/2027", created: "2025-06-05" },
];

const stats = [
  { label: "Total Cards", value: "1,000", change: "+15.2%", up: true, icon: CreditCard },
  { label: "Unique Users", value: "200", change: "+8.5%", up: true, icon: Users },
  { label: "Avg Cards/User", value: "5.0", change: "+2.1%", up: true, icon: TrendingUp },
  { label: "Active Rate", value: "94.2%", change: "+1.8%", up: true, icon: Activity },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <GradientBackground />
      <Navbar />

      <div className="relative z-10 pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-3xl font-bold font-display text-foreground">Card Analytics Dashboard</h1>
            <p className="text-muted-foreground mt-1">Dataset overview: 1,000 card registrations</p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -3, boxShadow: "0 0 30px hsl(217, 91%, 60%, 0.12)" }}
                className="glass-card p-5 group transition-all duration-500"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <s.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-xs font-medium flex items-center gap-1 text-neon-green">
                    <ArrowUpRight className="w-3 h-3" />
                    {s.change}
                  </span>
                </div>
                <p className="text-2xl font-bold font-display text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Charts row */}
          <div className="grid lg:grid-cols-3 gap-4 mb-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="lg:col-span-2 glass-card p-6">
              <h3 className="font-semibold font-display text-foreground mb-4">Card Registrations by Year</h3>
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={cardsOverTime}>
                  <defs>
                    <linearGradient id="colorCards" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 16%, 16%)" />
                  <XAxis dataKey="year" stroke="hsl(215, 20%, 55%)" fontSize={12} />
                  <YAxis stroke="hsl(215, 20%, 55%)" fontSize={12} />
                  <Tooltip contentStyle={{ background: "hsl(220, 18%, 8%)", border: "1px solid hsl(220, 16%, 20%)", borderRadius: "12px", color: "hsl(210, 40%, 96%)" }} formatter={(v: number) => [`${v} cards`, "Registered"]} />
                  <Area type="monotone" dataKey="cards" stroke="hsl(217, 91%, 60%)" fill="url(#colorCards)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass-card p-6">
              <h3 className="font-semibold font-display text-foreground mb-4">Expiry Year Distribution</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={expiryDistribution} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={2} dataKey="value">
                    {expiryDistribution.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: "hsl(220, 18%, 8%)", border: "1px solid hsl(220, 16%, 20%)", borderRadius: "12px", color: "hsl(210, 40%, 96%)" }} formatter={(v: number) => [`${v} cards`, "Count"]} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-2 mt-2 justify-center">
                {expiryDistribution.slice(0, 4).map((p) => (
                  <div key={p.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: p.color }} />
                    {p.name}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Bottom row */}
          <div className="grid lg:grid-cols-3 gap-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="glass-card p-6">
              <h3 className="font-semibold font-display text-foreground mb-4">Monthly Registrations</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={monthlyRegistrations}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 16%, 16%)" />
                  <XAxis dataKey="month" stroke="hsl(215, 20%, 55%)" fontSize={12} />
                  <YAxis stroke="hsl(215, 20%, 55%)" fontSize={12} />
                  <Tooltip contentStyle={{ background: "hsl(220, 18%, 8%)", border: "1px solid hsl(220, 16%, 20%)", borderRadius: "12px", color: "hsl(210, 40%, 96%)" }} formatter={(v: number) => [`${v} cards`, "Registered"]} />
                  <Bar dataKey="cards" fill="hsl(260, 80%, 65%)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="lg:col-span-2 glass-card p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold font-display text-foreground">Recent Card Registrations</h3>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="w-3.5 h-3.5" /> Latest entries
                </div>
              </div>
              <div className="space-y-3">
                {recentCards.map((card, i) => (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + i * 0.05 }}
                    className="flex items-center justify-between p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-neon-green/10">
                        <CheckCircle2 className="w-4 h-4 text-neon-green" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Card •••• {card.last4}</p>
                        <p className="text-xs text-muted-foreground">User #{card.userId} · Expires {card.expiry}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {card.created}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
