"use client";

import { useState, useEffect, useRef } from "react";
import BackgroundDoodles from "./BackgroundDoodles";
import TimeCostClock from "./TimeCostClock";
import ExpenseInput from "./ExpenseInput";
import DoodleArrow from "./DoodleArrow";
import RecentEntries from "./RecentEntries";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpLeft, User, LogOut } from "lucide-react";

export interface ExpenseEntry {
  id: string;
  amount: number;
  date: number;
}

type IncomeType = "daily" | "weekly" | "monthly";

export default function JourneyLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");
  const [loginInput, setLoginInput] = useState("");
  
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  
  // Setup Form States
  const [incomeType, setIncomeType] = useState<IncomeType>("monthly");
  const [incomeAmount, setIncomeAmount] = useState("");
  const [workingDays, setWorkingDays] = useState("22");
  const [workingHours, setWorkingHours] = useState("8");
  
  const [hourlyWage, setHourlyWage] = useState(0);
  const [expenses, setExpenses] = useState<ExpenseEntry[]>([]);
  
  const setupFormRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if user is logged in
    const savedUserId = localStorage.getItem("hisba_user_id");
    if (savedUserId) {
      setIsLoggedIn(true);
      setUserId(savedUserId);
      
      // Load their data
      const savedWage = localStorage.getItem("hisba_hourly_wage");
      const savedExpenses = localStorage.getItem("hisba_expenses_list");
      if (savedWage) {
        setHourlyWage(parseFloat(savedWage));
        setIsSetupComplete(true);
      }
      if (savedExpenses) {
        setExpenses(JSON.parse(savedExpenses));
      }
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn && hourlyWage > 0) {
      localStorage.setItem("hisba_hourly_wage", hourlyWage.toString());
      localStorage.setItem("hisba_expenses_list", JSON.stringify(expenses));
    }
  }, [hourlyWage, expenses, isLoggedIn]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginInput.trim().length > 3) {
      localStorage.setItem("hisba_user_id", loginInput.trim());
      setIsLoggedIn(true);
      setUserId(loginInput.trim());
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("hisba_user_id");
    localStorage.removeItem("hisba_hourly_wage");
    localStorage.removeItem("hisba_expenses_list");
    setIsLoggedIn(false);
    setIsSetupComplete(false);
    setUserId("");
    setHourlyWage(0);
    setExpenses([]);
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = Number(incomeAmount);
    const days = Number(workingDays);
    const hours = Number(workingHours);
    
    if (amount > 0 && hours > 0) {
      let rate = 0;
      if (incomeType === "monthly") {
        rate = amount / (days * hours);
      } else if (incomeType === "weekly") {
        rate = amount / (days * hours);
      } else if (incomeType === "daily") {
        rate = amount / hours;
      }
      setHourlyWage(rate);
      setIsSetupComplete(true);
    }
  };

  const handleAddExpense = (amount: number) => {
    const newExpense = {
      id: Math.random().toString(36).substr(2, 9),
      amount,
      date: Date.now()
    };
    setExpenses(prev => [newExpense, ...prev]);
  };

  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const totalHoursFloat = totalExpenses / (hourlyWage || 1);
  const hours = Math.floor(totalHoursFloat);
  const minutes = Math.round((totalHoursFloat - hours) * 60);

  const handleNumberChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === "" || /^[0-9\b]+$/.test(val)) {
      setter(val);
    }
  };

  const scrollToSetup = () => {
    setupFormRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Switch CTA based on login state
  const handleHeroCTA = () => {
    if (!isLoggedIn) {
      scrollToSetup();
    }
  };

  return (
    <div className="relative min-h-[100vh] w-full overflow-x-hidden flex flex-col items-center pb-48 font-sans">
      
      {/* GUMROAD STYLE NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b-[3px] border-foreground flex items-center justify-between px-8 py-5 shadow-sm">
        {/* Right Side (RTL Start) - Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
          <span className="text-3xl font-black text-accent tracking-tighter">حِسبة</span>
          <span className="text-xl font-bold text-accent ml-2">| Hisba</span>
        </div>
        
        {/* Left Side (RTL End) - Actions */}
        <div className="flex items-center gap-8">
          <a href="#" className="hidden md:block font-bold hover:underline">المميزات</a>
          <a href="#" className="hidden md:block font-bold hover:underline">عن الأداة</a>
          
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <span className="font-bold hidden sm:block bg-gray-100 px-4 py-2 rounded-xl border-2 border-black flex items-center gap-2">
                <User size={16} />
                {userId.includes('@') ? userId.split('@')[0] : userId}
              </span>
              <button onClick={handleLogout} className="font-bold hover:underline text-red-500 flex items-center gap-1">
                <LogOut size={18} />
                خروج
              </button>
            </div>
          ) : (
            <button onClick={scrollToSetup} className="font-bold hover:underline">تسجيل الدخول</button>
          )}

          {!isLoggedIn && (
            <button 
              onClick={scrollToSetup}
              className="gumroad-button-green px-8 py-3 text-sm md:text-base hidden sm:block"
            >
              ابدأ الحساب
            </button>
          )}
        </div>
      </nav>

      {/* RAW SVG VECTOR BACKGROUND ART */}
      <BackgroundDoodles />

      <div className="relative z-10 w-full px-4 pt-32 max-w-5xl flex flex-col items-center pointer-events-none">
        
        <AnimatePresence mode="wait">
          {!isSetupComplete ? (
            <motion.div 
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full flex flex-col items-center pointer-events-auto mt-10"
            >
              {/* HERO SECTION */}
              <div className="text-center mb-20 w-full px-4 relative">
                <h1 className="text-7xl md:text-8xl leading-[1.1] font-black mb-8 mx-auto max-w-4xl sticker-text tracking-tight">
                  اربط دينارك<br/>بعمرك
                </h1>
                
                <p className="text-xl md:text-2xl font-black max-w-3xl mx-auto leading-relaxed text-foreground text-outline-white mt-8">
                  حِسبة هي أداة وعي مالي تحسب لك تكلفة مشترياتك بالساعات والدقائق التي قضيتها من عمرك في العمل لتجني هذا المال.
                </p>
              </div>

              <div ref={setupFormRef} className="w-full max-w-md mb-20 pointer-events-auto space-y-8">
                
                {/* LOGIN FORM (if not logged in) */}
                {!isLoggedIn && (
                  <form onSubmit={handleLogin} className="gumroad-card p-10 flex flex-col space-y-6 bg-white">
                    <h2 className="text-3xl font-black mb-2 text-center text-foreground">تسجيل الدخول</h2>
                    <p className="text-center font-bold text-gray-500 mb-4">ادخل بريدك الإلكتروني أو رقم هاتفك لحفظ بياناتك ولن تضطر لإدخالها مرة أخرى.</p>
                    
                    <div>
                      <input 
                        type="text" 
                        required
                        value={loginInput}
                        onChange={(e) => setLoginInput(e.target.value)}
                        className="w-full text-xl font-bold p-4 border-4 border-foreground outline-none bg-transparent rounded-xl focus:border-accent transition-colors placeholder-gray-300"
                        placeholder="test@example.com أو 0770..."
                      />
                    </div>

                    <button type="submit" className="gumroad-button-green p-4 text-xl w-full text-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-y-[8px] active:translate-x-[8px] active:shadow-none transition-all">
                      دخول
                    </button>
                  </form>
                )}

                {/* SETUP FORM (if logged in but no wage set) */}
                {isLoggedIn && !isSetupComplete && (
                  <form onSubmit={handleCalculate} className="gumroad-card p-10 flex flex-col space-y-8 bg-white">
                    <h2 className="text-3xl font-black mb-4 text-center text-foreground">الإعداد الأولي لدخلك</h2>
                    
                    {/* Income Type Selector */}
                    <div className="flex bg-gray-100 p-2 rounded-2xl border-4 border-black">
                      <button 
                        type="button"
                        onClick={() => setIncomeType("monthly")}
                        className={`flex-1 py-3 font-black text-lg rounded-xl transition-colors ${incomeType === 'monthly' ? 'bg-accent border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' : 'text-gray-500'}`}
                      >شهري</button>
                      <button 
                        type="button"
                        onClick={() => setIncomeType("weekly")}
                        className={`flex-1 py-3 font-black text-lg rounded-xl transition-colors ${incomeType === 'weekly' ? 'bg-accent border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' : 'text-gray-500'}`}
                      >أسبوعي</button>
                      <button 
                        type="button"
                        onClick={() => setIncomeType("daily")}
                        className={`flex-1 py-3 font-black text-lg rounded-xl transition-colors ${incomeType === 'daily' ? 'bg-accent border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' : 'text-gray-500'}`}
                      >يومي</button>
                    </div>

                    <div>
                      <label className="block text-lg font-bold mb-2 text-foreground">
                        {incomeType === 'monthly' ? 'الدخل الشهري' : incomeType === 'weekly' ? 'الدخل الأسبوعي' : 'الدخل اليومي'} (<span className="text-accent">د.ع</span>)
                      </label>
                      <input 
                        type="text" 
                        inputMode="numeric"
                        pattern="[0-9]*"
                        required
                        value={incomeAmount}
                        onChange={handleNumberChange(setIncomeAmount)}
                        className="w-full text-4xl font-black p-4 border-4 border-foreground outline-none bg-transparent rounded-xl focus:border-accent transition-colors text-accent placeholder-gray-200"
                        placeholder={incomeType === 'monthly' ? "1000000" : incomeType === 'weekly' ? "250000" : "50000"}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {incomeType !== 'daily' && (
                        <div>
                          <label className="block text-lg font-bold mb-2 text-foreground">أيام العمل</label>
                          <input 
                            type="text" 
                            inputMode="numeric"
                            pattern="[0-9]*"
                            required
                            value={workingDays}
                            onChange={handleNumberChange(setWorkingDays)}
                            className="w-full text-3xl font-black p-4 border-4 border-foreground outline-none bg-transparent rounded-xl focus:border-accent transition-colors text-center text-accent"
                          />
                        </div>
                      )}
                      <div className={incomeType === 'daily' ? 'col-span-2' : ''}>
                        <label className="block text-lg font-bold mb-2 text-foreground">ساعات/يوم</label>
                        <input 
                          type="text" 
                          inputMode="numeric"
                          pattern="[0-9]*"
                          required
                          value={workingHours}
                          onChange={handleNumberChange(setWorkingHours)}
                          className="w-full text-3xl font-black p-4 border-4 border-foreground outline-none bg-transparent rounded-xl focus:border-accent transition-colors text-center text-accent"
                        />
                      </div>
                    </div>

                    <button type="submit" className="gumroad-button-green p-5 text-2xl mt-4 w-full text-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-y-[8px] active:translate-x-[8px] active:shadow-none transition-all">
                      حفظ وبدء الحساب
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full flex flex-col items-center mt-10 pointer-events-auto"
            >
              
              {/* Reset Setup Button (If they want to change income) */}
              <div className="w-full max-w-2xl flex justify-start mb-6">
                 <button onClick={() => { setIsSetupComplete(false); setHourlyWage(0); localStorage.removeItem("hisba_hourly_wage"); }} className="flex items-center justify-center gap-2 bg-white border-[3px] border-black rounded-full px-6 py-2 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
                  <ArrowUpLeft size={20} strokeWidth={3} className="rotate-45" />
                  تعديل الراتب
                </button>
              </div>

              {/* HERO SECTION ON DASHBOARD (Matching Mockup) */}
              <div className="text-center mb-16 w-full px-4 relative">
                <h1 className="text-7xl md:text-8xl leading-[1.1] font-black mb-8 mx-auto max-w-4xl sticker-text tracking-tight">
                  اربط دينارك<br/>بعمرك
                </h1>
              </div>

              <div className="w-full max-w-lg flex flex-col items-center mt-8">
                {/* Total Time Cost Visualization */}
                <div className="w-full text-center mb-16">
                  <h2 className="text-xl font-bold mb-6 opacity-90 text-foreground text-outline-white">التكلفة الفعلية لمصروفاتك</h2>
                  
                  <div className="gumroad-card p-10 flex justify-center items-center inline-block bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                    <TimeCostClock hours={hours} minutes={minutes} />
                  </div>
                  
                  <div className="mt-8 text-3xl md:text-4xl font-black text-foreground text-outline-white">
                    إجمالي المصروفات: <span className="text-accent">{totalExpenses.toLocaleString()}</span> <span className="text-xl text-accent">د.ع</span>
                  </div>
                </div>

                {/* Floating Action Button for Logging */}
                <ExpenseInput onAddExpense={handleAddExpense} />

                {/* Recent Entries */}
                <div className="w-full mt-16 mb-12">
                   <h3 className="font-black text-3xl mb-8 text-center text-foreground text-outline-white">المصروفات الأخيرة</h3>
                   <RecentEntries entries={expenses} hourlyWage={hourlyWage} />
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
