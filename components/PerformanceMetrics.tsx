import { Initiative } from "../lib/data";
import { Clock, Info, TrendingUp, Zap, Target, Rocket } from "lucide-react";
import { motion } from "motion/react";

interface PerformanceMetricsProps {
  data: Initiative[];
}

export function PerformanceMetrics({ data }: PerformanceMetricsProps) {
  // Mock calculations for demonstration
  const avgLeadTime = 145;
  const exploringOpportunity = 45;
  const exploringSolution = 30;
  const readyToBuild = 20;
  const buildAndReleasing = 50;

  const stages = [
    { label: "Discovery", value: exploringOpportunity, color: "bg-blue-500" },
    { label: "Design", value: exploringSolution, color: "bg-violet-500" },
    { label: "Prioritization", value: readyToBuild, color: "bg-amber-500" },
    { label: "Execution", value: buildAndReleasing, color: "bg-rose-500" },
  ];

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-8 md:p-12 shadow-sm mb-12">
      <div className="flex flex-col lg:flex-row gap-16 items-start">
        <div className="lg:w-1/3 space-y-8">
          <div className="space-y-3">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Efficiency Metrics</span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Ciclo de Vida</h2>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              Desglose del tiempo promedio por etapa crítica. El <span className="text-slate-900 font-bold underline decoration-[#eb0045] decoration-2 underline-offset-4">Lead Time</span> total refleja la agilidad desde la concepción hasta la entrega.
            </p>
          </div>
          
          <div className="pt-8 border-t border-slate-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-500">
                <Info size={16} />
              </div>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Metodología</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed italic font-medium">
              &quot;Lead Time se calcula como la sumatoria de días en cada estado para iniciativas finalizadas en los últimos 6 meses.&quot;
            </p>
          </div>
        </div>

        <div className="flex-1 w-full">
          <div className="flex flex-col items-center lg:items-end">
            <div className="text-center lg:text-right mb-12">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-3 block">Promedio Global</span>
              <div className="flex items-baseline gap-3 justify-center lg:justify-end">
                <span className="text-8xl font-black text-slate-900 tabular-nums tracking-tighter leading-none">{avgLeadTime}</span>
                <span className="text-sm font-black text-slate-400 uppercase tracking-widest">Días</span>
              </div>
            </div>

            <div className="w-full space-y-8">
              {stages.map((stage, idx) => (
                <div key={idx} className="group">
                  <div className="mb-3 flex items-center justify-between px-1">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stage.label}</span>
                    <span className="text-xs font-black text-slate-900 tabular-nums">{stage.value}d</span>
                  </div>
                  <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(stage.value / avgLeadTime) * 100}%` }}
                      className={cn("h-full transition-all duration-500", stage.color)}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="w-full mt-12 pt-8 border-t border-slate-100 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Backlog</span>
              </div>
              <div className="flex-1 mx-6 h-[1px] border-t border-dashed border-slate-200" />
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-black text-[#eb0045] uppercase tracking-widest">Valor</span>
                <div className="w-2.5 h-2.5 rounded-full bg-[#eb0045]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const cn = (...inputs: any[]) => inputs.filter(Boolean).join(' ');
