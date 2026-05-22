"use client";

import { motion } from "framer-motion";
import { ExpenseEntry } from "./JourneyLayout";

interface RecentEntriesProps {
  entries: ExpenseEntry[];
  hourlyWage: number;
}

export default function RecentEntries({ entries, hourlyWage }: RecentEntriesProps) {
  if (entries.length === 0) {
    return (
      <div className="text-center p-8 border-4 border-dashed border-foreground/30 rounded-2xl opacity-60">
        <p className="font-bold text-xl">لا توجد مصروفات بعد. أضف مصروفاً جديداً!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-6 w-full pb-32">
      {entries.map((entry, idx) => {
        const timeFloat = entry.amount / (hourlyWage || 1);
        const hours = Math.floor(timeFloat);
        const minutes = Math.round((timeFloat - hours) * 60);

        return (
          <motion.div 
            key={entry.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="gumroad-card p-6 flex justify-between items-center bg-white"
          >
            <div className="flex flex-col">
              <span className="font-black text-2xl">{entry.amount.toLocaleString()} د.ع</span>
              <span className="text-base font-bold opacity-50 mt-1">
                {new Date(entry.date).toLocaleDateString("ar-IQ", { hour: '2-digit', minute:'2-digit' })}
              </span>
            </div>
            
            <div className="bg-foreground text-background px-5 py-3 rounded-xl flex items-center font-bold text-lg border-2 border-foreground">
              <span className="mr-3 opacity-80">تكلف:</span>
              <span className="font-black">
                {hours > 0 && `${hours}س `} {minutes}د
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
