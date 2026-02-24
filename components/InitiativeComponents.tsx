import { Initiative } from "../lib/data";
import { 
  CheckCircle2, 
  Clock, 
  PlayCircle, 
  Search, 
  AlertCircle,
  TrendingUp,
  MapPin,
  User,
  Calendar
} from "lucide-react";
import { motion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface InitiativeCardProps {
  initiative: Initiative;
}

export function InitiativeCard({ initiative }: InitiativeCardProps) {
  const isAnomaly = initiative.timeInStateDays > 100 && initiative.status !== 'Finalizado';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "group relative bg-white border border-slate-200 rounded-xl p-5 hover:shadow-md transition-all",
        isAnomaly && "border-red-200 bg-red-50/30"
      )}
    >
      <div className="flex justify-between items-start mb-3">
        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
          {initiative.id}
        </span>
        <div className="flex gap-2">
          {isAnomaly && (
            <div className="flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-[10px] font-bold">
              <AlertCircle size={10} />
              ANOMALÍA TIEMPO
            </div>
          )}
          <span className={cn(
            "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase",
            initiative.priority === 'Critical' ? "bg-purple-100 text-purple-700" :
            initiative.priority === 'High' ? "bg-orange-100 text-orange-700" :
            "bg-slate-100 text-slate-600"
          )}>
            {initiative.priority === 'Critical' ? 'Crítica' : 
             initiative.priority === 'High' ? 'Alta' : 
             initiative.priority === 'Medium' ? 'Media' : 'Baja'}
          </span>
        </div>
      </div>

      <h3 className="text-sm font-semibold text-slate-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
        {initiative.summary}
      </h3>

      <div className="grid grid-cols-2 gap-y-3 mt-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-slate-50 rounded-lg">
            <TrendingUp size={12} className="text-slate-500" />
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] text-slate-400 uppercase font-bold">Journey</span>
            <span className="text-[11px] font-medium text-slate-700">{initiative.journeyStage}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-slate-50 rounded-lg">
            <MapPin size={12} className="text-slate-500" />
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] text-slate-400 uppercase font-bold">País</span>
            <span className="text-[11px] font-medium text-slate-700">{initiative.country}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-slate-50 rounded-lg">
            <Clock size={12} className="text-slate-500" />
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] text-slate-400 uppercase font-bold">Días en Estado</span>
            <span className={cn(
              "text-[11px] font-medium",
              isAnomaly ? "text-red-600 font-bold" : "text-slate-700"
            )}>
              {initiative.timeInStateDays}d
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-slate-50 rounded-lg">
            <User size={12} className="text-slate-500" />
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] text-slate-400 uppercase font-bold">Responsable</span>
            <span className="text-[11px] font-medium text-slate-700 truncate max-w-[80px]">
              {initiative.assignee}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <StatusIcon status={initiative.status} size={14} />
          <span className="text-[11px] font-bold text-slate-600 uppercase">
            {initiative.status}
          </span>
        </div>
        {initiative.targetEnd && (
          <div className="flex items-center gap-1 text-slate-400">
            <Calendar size={10} />
            <span className="text-[10px]">{initiative.targetEnd}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function StatusIcon({ status, size = 16 }: { status: string; size?: number }) {
  switch (status) {
    case 'Finalizado': return <CheckCircle2 size={size} className="text-emerald-500" />;
    case 'En Progreso': return <PlayCircle size={size} className="text-indigo-500" />;
    case 'Discovery': return <Search size={size} className="text-amber-500" />;
    case 'Priorizado': return <AlertCircle size={size} className="text-orange-500" />;
    default: return <Clock size={size} className="text-slate-400" />;
  }
}

export function StatCard({ title, value, icon: Icon, colorClass, trend }: any) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-slate-900">{value}</h3>
          {trend && (
            <p className="text-[10px] mt-2 font-medium text-emerald-600 flex items-center gap-1">
              <TrendingUp size={10} />
              {trend} vs mes anterior
            </p>
          )}
        </div>
        <div className={cn("p-3 rounded-xl", colorClass)}>
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
}
