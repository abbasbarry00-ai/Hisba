"use client";

import { useState, useEffect, useRef } from "react";
import BackgroundDoodles from "./BackgroundDoodles";
import TimeCostClock from "./TimeCostClock";
import ExpenseInput from "./ExpenseInput";
import DoodleArrow from "./DoodleArrow";
import RecentEntries from "./RecentEntries";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpLeft } from "lucide-react";

export interface ExpenseEntry {
  id: string;
  amount: number;
  date: number;
}

export default function JourneyLayout() {
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [monthlySalary, setMonthlySalary] = useState("");
  const [workingDays, setWorkingDays] = useState("22");
  const [workingHours, setWorkingHours] = useState("8");
  
  const [hourlyWage, setHourlyWage] = useState(0);
  const [expenses, setExpenses] = useState<ExpenseEntry[]>([]);
  
  const setupFormRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedWage = localStorage.getItem("hisba_hourly_wage");
    const savedExpenses = localStorage.getItem("hisba_expenses_list");
    if (savedWage && savedExpenses) {
      setHourlyWage(parseFloat(savedWage));
      setExpenses(JSON.parse(savedExpenses));
      setIsSetupComplete(true);
    }
  }, []);

  useEffect(() => {
    if (hourlyWage > 0) {
      localStorage.setItem("hisba_hourly_wage", hourlyWage.toString());
      localStorage.setItem("hisba_expenses_list", JSON.stringify(expenses));
    }
  }, [hourlyWage, expenses]);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (monthlySalary && workingDays && workingHours) {
      const rate = Number(monthlySalary) / (Number(workingDays) * Number(workingHours));
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

  const resetApp = () => {
    localStorage.removeItem("hisba_hourly_wage");
    localStorage.removeItem("hisba_expenses_list");
    setIsSetupComplete(false);
    setExpenses([]);
    setHourlyWage(0);
    setMonthlySalary("");
  };

  const handleNumberChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === "" || /^[0-9\b]+$/.test(val)) {
      setter(val);
    }
  };

  const scrollToSetup = () => {
    setupFormRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-[100vh] w-full overflow-x-hidden flex flex-col items-center pb-48">
      
      {/* GUMROAD STYLE NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b-4 border-foreground flex items-center justify-between px-6 py-4">
        {/* Right Side (RTL Start) - Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
          <span className="text-3xl font-black text-accent tracking-tighter">حِسبة</span>
          <span className="text-xl font-bold opacity-60 ml-2 tracking-wide">| Hisba</span>
        </div>
        
        {/* Left Side (RTL End) - Actions */}
        <div className="flex items-center gap-6">
          <a href="#" className="hidden md:block font-medium hover:underline opacity-80">المميزات</a>
          <a href="#" className="hidden md:block font-medium hover:underline opacity-80">عن الأداة</a>
          <button className="font-semibold hover:underline ml-2">تسجيل الدخول</button>
          {!isSetupComplete && (
            <button 
              onClick={scrollToSetup}
              className="gumroad-button px-6 py-3 text-sm md:text-base hidden sm:block"
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
              className="w-full flex flex-col items-center pointer-events-auto"
            >
              {/* HERO SECTION */}
              <div className="text-center mt-12 mb-20 md:mb-32 w-full px-4">
                <h1 className="text-5xl md:text-7xl leading-tight font-black mb-8 text-foreground tracking-tight mx-auto max-w-4xl">
                  اربط دينارك<br/>بعمرك
                </h1>
                <p className="text-lg md:text-xl font-medium opacity-70 max-w-2xl mx-auto leading-relaxed">
                  حِسبة هي أداة وعي مالي تحسب لك تكلفة مشترياتك بالساعات والدقائق التي قضيتها من عمرك في العمل لتجني هذا المال.
                </p>
                <div className="mt-12">
                  <button 
                    onClick={scrollToSetup}
                    className="gumroad-button-green px-10 py-5 text-xl sm:hidden"
                  >
                    ابدأ الحساب
                  </button>
                </div>
              </div>

              {/* SETUP FORM */}
              <div ref={setupFormRef} className="w-full max-w-md mb-20 pointer-events-auto">
                <form onSubmit={handleCalculate} className="gumroad-card p-10 flex flex-col space-y-8 bg-white">
                  <h2 className="text-3xl font-black mb-4 text-center text-foreground">الإعداد الأولي</h2>
                  
                  <div>
                    <label className="block text-lg font-bold mb-2 text-foreground">الراتب الشهري (<span className="text-accent">د.ع</span>)</label>
                    <input 
                      type="text" 
                      inputMode="numeric"
                      pattern="[0-9]*"
                      required
                      value={monthlySalary}
                      onChange={handleNumberChange(setMonthlySalary)}
                      className="w-full text-4xl font-black p-4 border-4 border-foreground outline-none bg-transparent rounded-xl focus:border-accent transition-colors text-accent placeholder-gray-200"
                      placeholder="1000000"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-lg font-bold mb-2 text-foreground">أيام العمل/شهر</label>
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
                    <div>
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
                    احسب القيمة الساعية
                  </button>
                </form>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-lg flex flex-col items-center mt-8 pointer-events-auto"
            >
              {/* Hourly Rate Setup Result */}
              <div className="w-full text-center mb-16 relative">
                <button 
                  onClick={resetApp}
                  className="absolute -top-12 -left-2 flex items-center justify-center gap-2 gumroad-button-green px-4 py-2 text-sm z-20"
                >
                  <ArrowUpLeft size={18} strokeWidth={3} />
                  رجوع
                </button>

                <div className="gumroad-card w-full p-8 relative bg-white">
                  <h2 className="text-2xl font-bold mb-4 opacity-90 text-foreground">قيمة ساعة عملك</h2>
                  <div className="text-6xl md:text-7xl font-black text-accent">
                    {Math.round(hourlyWage).toLocaleString()} <span className="text-3xl text-accent">د.ع</span>
                  </div>
                </div>
              </div>

              <DoodleArrow className="mb-12 rotate-180 scale-x-[-1] text-accent" />

              {/* Total Time Cost Visualization */}
              <div className="w-full text-center mb-16">
                <h2 className="text-xl font-bold mb-6 opacity-90 text-foreground">التكلفة الفعلية لمصروفاتك</h2>
                
                <div className="gumroad-card p-10 flex justify-center items-center inline-block bg-white">
                  <TimeCostClock hours={hours} minutes={minutes} />
                </div>
                
                <div className="mt-8 text-3xl md:text-4xl font-black text-foreground">
                  إجمالي المصروفات: <span className="text-accent">{totalExpenses.toLocaleString()}</span> <span className="text-xl text-accent">د.ع</span>
                </div>
              </div>

              <DoodleArrow className="mb-12 rotate-180 scale-x-[-1] text-accent" />

              {/* Recent Entries */}
              <div className="w-full mb-12">
                 <h3 className="font-black text-3xl mb-8 text-center text-foreground">المصروفات الأخيرة</h3>
                 <RecentEntries entries={expenses} hourlyWage={hourlyWage} />
              </div>

              {/* Floating Action Button for Logging */}
              <ExpenseInput onAddExpense={handleAddExpense} />

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
