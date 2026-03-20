import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GradientBackground from "@/components/GradientBackground";
import Navbar from "@/components/Navbar";
import { Download, Users, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";



const Admin = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState<Tables<"transactions">[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("role") !== "admin") {
      navigate("/login");
      return;
    }

    const fetchTransactions = async () => {
      const localData = JSON.parse(localStorage.getItem('mockTransactions') || '[]');
      try {
        const { data, error } = await supabase.from('transactions').select('*').order('created_at', { ascending: false });
        if (!error && data) {
          // Merge local data that hasn't made it to the DB yet
          const dbIds = new Set(data.map((t: any) => t.id));
          const uniqueLocal = localData.filter((t: any) => !dbIds.has(t.id));
          setTransactions([...uniqueLocal, ...data]);
        } else {
          console.error("Supabase fetch error:", error);
          setTransactions(localData);
        }
      } catch (err) {
        setTransactions(localData);
      }
      setLoading(false);
    };

    fetchTransactions();
  }, [navigate]);

  const exportToCSV = () => {
    // Define headers matching the Supabase columns we want to show
    const headers = ["ID", "Transaction ID", "Amount", "Currency", "Status", "Description", "Date"];
    
    // Map data to CSV rows
    const csvRows = [
      headers.join(","),
      ...transactions.map(t => 
        [
          t.id, 
          t.transaction_id, 
          t.amount, 
          t.currency, 
          t.status, 
          `"${t.description || ''}"`, 
          `"${new Date(t.created_at).toLocaleString()}"`
        ].join(",")
      )
    ];
    
    // Combine rows
    const csvString = csvRows.join("\n");
    
    // Create Blob and trigger download
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "admin_users_export.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-background relative pb-20">
      <GradientBackground />
      <Navbar />

      <div className="relative z-10 pt-28 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-bold font-display text-foreground flex items-center gap-3">
                <Users className="w-8 h-8 text-primary" /> Admin Support Dashboard
              </h1>
              <p className="text-muted-foreground mt-2">View user login and transaction information.</p>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={exportToCSV}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors"
            >
              <Download className="w-4 h-4" /> Export Excel
            </motion.button>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}>
            <div className="glass-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border bg-secondary/50">
                      <th className="p-5 font-semibold text-sm text-foreground">Transaction ID</th>
                      <th className="p-5 font-semibold text-sm text-foreground">Details</th>
                      <th className="p-5 font-semibold text-sm text-foreground">Amount</th>
                      <th className="p-5 font-semibold text-sm text-foreground">Status</th>
                      <th className="p-5 font-semibold text-sm text-foreground">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-muted-foreground"><Loader2 className="w-6 h-6 animate-spin mx-auto text-primary" /></td>
                      </tr>
                    ) : transactions.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-muted-foreground">No transactions found in Supabase. Make a payment to see data.</td>
                      </tr>
                    ) : transactions.map((t, idx) => (
                      <motion.tr 
                        key={t.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + Math.min(idx * 0.05, 1) }}
                        className="border-b border-border/50 hover:bg-secondary/30 transition-colors"
                      >
                        <td className="p-5 text-sm font-mono text-muted-foreground">{t.transaction_id}</td>
                        <td className="p-5 text-sm font-medium text-foreground">{t.description || "—"}</td>
                        <td className="p-5 text-sm font-mono text-muted-foreground">{t.currency} {t.amount}</td>
                        <td className="p-5 text-sm font-medium text-foreground capitalize">
                          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-neon-green/10 text-neon-green">{t.status}</span>
                        </td>
                        <td className="p-5 text-sm text-muted-foreground">{new Date(t.created_at).toLocaleString()}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
