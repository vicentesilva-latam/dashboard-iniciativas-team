import { Initiative } from "../lib/data";
import { FileText, Search, CheckSquare, Settings, CheckCircle } from "lucide-react";

interface SummaryStatsProps {
  data: Initiative[];
}

export function SummaryStats({ data }: SummaryStatsProps) {
  const stats = [
    { label: "Backlog", value: data.filter(i => i.status === 'Backlog').length, color: "text-slate-400" },
    { label: "Discovery", value: data.filter(i => i.status === 'Discovery').length, color: "text-amber-500" },
    { label: "Priorizado", value: data.filter(i => i.status === 'Priorizado').length, color: "text-[#1b0088]" },
    { label: "En Progreso", value: data.filter(i => i.status === 'En Progreso').length, color: "text-[#eb0045]" },
    { label: "Finalizado", value: data.filter(i => i.status === 'Finalizado').length, color: "text-emerald-500" },
  ];

  return (
    <div className="bg-white border-b border-slate-50 py-6">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap md:flex-nowrap justify-between items-center gap-12">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-1 flex-col gap-1 group min-w-[100px]">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em]">
                  {stat.label}
                </span>
                <div className={`w-1 h-1 rounded-full ${stat.color.replace('text-', 'bg-')}`} />
              </div>
              <span className="text-3xl font-light text-slate-900 tabular-nums tracking-tighter">
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
