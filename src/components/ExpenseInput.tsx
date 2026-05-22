"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Mic, Send } from "lucide-react";

interface ExpenseInputProps {
  onAddExpense: (amount: number) => void;
}

export default function ExpenseInput({ onAddExpense }: ExpenseInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.lang = "ar-IQ";
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        recognitionRef.current.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          // Extract numbers from transcript (e.g. "خمسة الاف" or "5000")
          const numbers = transcript.match(/\d+/g);
          if (numbers) {
            setAmount(numbers.join(""));
          } else {
            // Simple fallback for arabic words if needed, or just let them type
            const map: {[key:string]: string} = { "الف": "1000", "الفين": "2000", "خمسة": "5", "عشرة": "10" };
            let val = "";
            Object.keys(map).forEach(k => {
              if (transcript.includes(k)) val = map[k];
            });
            if (val) setAmount(val);
          }
          setIsRecording(false);
        };

        recognitionRef.current.onerror = () => {
          setIsRecording(false);
        };
        
        recognitionRef.current.onend = () => {
          setIsRecording(false);
        };
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amount);
    if (!isNaN(val) && val > 0) {
      onAddExpense(val);
      setAmount("");
      setIsOpen(false);
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === "" || /^[0-9\b]+$/.test(val)) {
      setAmount(val);
    }
  };

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      alert("عذراً، متصفحك لا يدعم الإدخال الصوتي.");
      return;
    }
    
    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  return (
    <>
      <div className="fixed bottom-8 left-0 right-0 flex justify-center z-40 pointer-events-none">
        <button
          onClick={() => setIsOpen(true)}
          className="gumroad-button-green pointer-events-auto rounded-full px-10 py-5 text-2xl flex items-center gap-3 shadow-2xl text-foreground border-4 border-black"
        >
          <Plus size={32} />
          شنو تريد تشتري؟
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-background/90 backdrop-blur-md z-40"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 bg-white border-t-8 border-foreground z-50 rounded-t-[3rem] p-8 md:p-12 max-h-[90vh] overflow-y-auto shadow-[0_-20px_50px_rgba(0,0,0,0.15)]"
            >
              <div className="max-w-md mx-auto relative mt-4">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="absolute -top-12 left-0 p-3 opacity-80 hover:opacity-100 transition-opacity bg-white text-foreground rounded-full border-4 border-foreground"
                >
                  <X size={28} />
                </button>
                
                <h2 className="text-5xl font-black mb-10 text-foreground">تكلفة جديدة</h2>

                {isRecording ? (
                  <div className="flex flex-col items-center justify-center space-y-8 py-10">
                    <div className="flex items-center justify-center space-x-4 h-32">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{ height: ["20%", "100%", "20%"] }}
                          transition={{
                            repeat: Infinity,
                            duration: 0.6,
                            delay: i * 0.1,
                            ease: "easeInOut",
                          }}
                          className="w-5 rounded-full bg-accent"
                        />
                      ))}
                    </div>
                    <p className="font-bold animate-pulse text-2xl text-accent">تحدث الآن بالمبلغ...</p>
                    <button 
                      onClick={toggleRecording}
                      className="gumroad-button px-10 py-4 rounded-xl text-xl"
                    >
                      إلغاء
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col space-y-10">
                    <div>
                      <label className="block text-2xl font-bold mb-4 opacity-70 text-foreground">المبلغ (دينار عراقي)</label>
                      <input 
                        type="text" 
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={amount}
                        onChange={handleAmountChange}
                        placeholder="0"
                        className="w-full text-8xl font-black outline-none bg-transparent placeholder-gray-300 border-b-8 border-foreground pb-4 focus:border-accent transition-colors text-foreground"
                        autoFocus
                      />
                    </div>
                    
                    <div className="flex gap-4 pt-4">
                      <button 
                         type="submit"
                         disabled={!amount}
                         className="gumroad-button-green p-5 rounded-2xl flex items-center justify-center flex-[3] text-3xl disabled:opacity-50 text-foreground"
                       >
                         <span className="ml-3">تسجيل</span>
                         <Send size={32} className="rotate-180" />
                       </button>
                       <button 
                         type="button"
                         onClick={toggleRecording}
                         className="p-5 border-4 border-foreground rounded-2xl flex items-center justify-center flex-1 bg-white hover:bg-gray-100 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-[4px] active:translate-x-[4px] active:shadow-none cursor-pointer text-accent"
                       >
                         <Mic size={36} />
                       </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
