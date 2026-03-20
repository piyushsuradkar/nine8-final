import { motion } from "framer-motion";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import GradientBackground from "@/components/GradientBackground";
import Navbar from "@/components/Navbar";
import { CheckCircle2, Receipt, Loader2, Printer } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Payment = () => {
  const location = useLocation();
  const { cardNumber = "4532 1234 5678 7890", cardName = "JOHN DOE" } = location.state || {};
  const last4 = cardNumber.replace(/\D/g, "").slice(-4) || "7890";

  const [paid, setPaid] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [txId] = useState("TXN-" + Math.random().toString(36).substring(2, 10).toUpperCase());
  const [now] = useState(new Date());
  const [amount, setAmount] = useState("");

  const handlePayment = async () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    setIsProcessing(true);
    
    // Create an offline backup record for the Admin page demo
    const offlineTx = {
      id: txId,
      amount: Number(amount),
      currency: 'INR',
      status: 'completed',
      transaction_id: txId,
      description: `Transferred to ${cardName} (Card •••• ${last4})`,
      created_at: new Date().toISOString()
    };
    const existing = JSON.parse(localStorage.getItem('mockTransactions') || '[]');
    localStorage.setItem('mockTransactions', JSON.stringify([offlineTx, ...existing]));

    try {
      const { error } = await supabase.from('transactions').insert({
        amount: Number(amount),
        currency: 'INR',
        status: 'completed',
        transaction_id: txId,
        description: `Transferred to ${cardName} (Card •••• ${last4})`
      });

      if (error) {
        console.error("Supabase Error:", error);
        // Proceed visually for the demo even if DB fails
      }
    } catch (e: any) {
      console.error(e);
    }
    
    setPaid(true);
    setIsProcessing(false);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center">
      <div className="print:hidden">
        <GradientBackground />
        <Navbar />
      </div>

      <div className="relative z-10 w-full max-w-md mx-6 pt-24 print:pt-0 print:mx-0 print:max-w-none">
        {!paid ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8 neon-glow">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Receipt className="w-7 h-7 text-primary" />
            </div>
            <h2 className="text-2xl font-bold font-display text-center text-foreground mb-2">Confirm Payment</h2>
            <p className="text-sm text-muted-foreground text-center mb-8">Review your payment details</p>

            <div className="space-y-4 mb-8">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">Enter Amount (₹)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="e.g. 5000"
                  className="w-full px-5 py-3.5 rounded-xl bg-secondary/80 border border-glass-border text-foreground text-lg font-medium placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/30 transition-all duration-300"
                />
              </div>
            </div>

            <div className="text-xs text-muted-foreground bg-secondary/50 p-3 rounded-xl mb-6">
              Funds will be securely transferred to Card ending in <span className="text-foreground font-mono">•••• {last4}</span>.
            </div>

            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 0 30px hsl(217, 91%, 60%, 0.3)" }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePayment}
              disabled={isProcessing || !amount}
              className="w-full py-3.5 rounded-xl font-semibold text-primary-foreground relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-cyan animate-gradient-shift" style={{ backgroundSize: "200% 200%" }} />
              <span className="relative flex items-center justify-center gap-2">
                {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : amount ? `Pay ₹${Number(amount).toLocaleString("en-IN")}` : "Enter Amount"}
              </span>
            </motion.button>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center">
            
            {/* The White Receipt */}
            <div className="w-full bg-white text-black p-8 rounded-xl shadow-2xl mb-8 print:shadow-none print:p-0 print:mb-0">
              <div className="border-b-2 border-dashed border-gray-300 pb-6 mb-6 text-center">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4 print:hidden">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold font-display uppercase tracking-wider mb-1">Payment Receipt</h3>
                <p className="text-gray-500 text-sm">Thank you for your transaction.</p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm border-b border-gray-100 pb-2">
                  <span className="text-gray-500">Transaction ID</span>
                  <span className="font-mono font-medium">{txId}</span>
                </div>
                <div className="flex justify-between text-sm border-b border-gray-100 pb-2">
                  <span className="text-gray-500">Date & Time</span>
                  <span className="font-medium">{now.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-sm border-b border-gray-100 pb-2">
                  <span className="text-gray-500">Paid To</span>
                  <span className="font-medium">{cardName}</span>
                </div>
                <div className="flex justify-between text-sm border-b border-gray-100 pb-2">
                  <span className="text-gray-500">Destination</span>
                  <span className="font-mono font-medium">Card (•••• {last4})</span>
                </div>
                <div className="flex justify-between text-sm border-b border-gray-100 pb-2">
                  <span className="text-gray-500">Status</span>
                  <span className="font-medium text-green-600">SUCCESS</span>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center mb-6">
                <span className="font-bold text-gray-700">Amount Sent</span>
                <span className="text-2xl font-bold text-black border-none">₹{Number(amount).toLocaleString("en-IN")}</span>
              </div>
              
              <div className="text-center text-xs text-gray-400 mt-8 pt-6 border-t border-gray-100">
                <p>This is a computer-generated receipt.</p>
                <p>nine8 payment platform.</p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePrint}
              className="w-full py-3.5 rounded-xl bg-secondary text-foreground font-semibold flex items-center justify-center gap-2 border border-glass-border print:hidden"
            >
              <Printer className="w-5 h-5" /> Print Receipt
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Payment;
