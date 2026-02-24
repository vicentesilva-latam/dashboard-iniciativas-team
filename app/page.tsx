'use client';

import React, { useState, useMemo } from 'react';
import { HR_DATA, Initiative } from '@/lib/data';
import { 
  CheckCircle2, 
  PlayCircle, 
  Search, 
  AlertCircle,
  PlusCircle,
  TrendingUp,
  LayoutGrid,
  List,
  ChevronRight,
  Clock,
  User,
  MapPin,
  Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { TimelineView } from '@/components/TimelineView';
import { PortfolioAnalytics } from '@/components/PortfolioAnalytics';
import { SummaryStats } from '@/components/SummaryStats';
import { PerformanceMetrics } from '@/components/PerformanceMetrics';

const cn = (...inputs: any[]) => inputs.filter(Boolean).join(' ');

export default function HRPortfolioDashboard() {
  const [mainTab, setMainTab] = useState<'dashboard' | 'timeline' | 'performance'>('dashboard');
  const [activeStatus, setActiveStatus] = useState<string>('Priorizado');
  const [viewMode, setViewMode] = useState<'grouped' | 'all'>('grouped');
  const [selectedInitiativeId, setSelectedInitiativeId] = useState<string | null>(null);

  const stats = useMemo(() => ({
    backlog: HR_DATA.filter(i => i.status === 'Backlog').length,
    discovery: HR_DATA.filter(i => i.status === 'Discovery').length,
    priorizado: HR_DATA.filter(i => i.status === 'Priorizado').length,
    progreso: HR_DATA.filter(i => i.status === 'En Progreso').length,
    finalizado: HR_DATA.filter(i => i.status === 'Finalizado').length,
  }), []);

  const filteredData = useMemo(() => {
    return HR_DATA.filter(i => i.status === activeStatus);
  }, [activeStatus]);

  const groupedByJourney = useMemo(() => {
    const groups: Record<string, Initiative[]> = {
      'Atracción a Contratación': [],
      'Pre-ingreso a Aterrizaje': [],
      'Vida en LATAM': [],
      'Egreso': [],
      'Fundamentos Corporativos': []
    };
    filteredData.forEach(i => {
      if (groups[i.journeyStage]) groups[i.journeyStage].push(i);
    });
    return groups;
  }, [filteredData]);

  const statusConfig: Record<string, { label: string, icon: any, color: string, bg: string }> = {
    'Backlog': { label: 'Backlog', icon: PlusCircle, color: 'text-slate-500', bg: 'bg-slate-100' },
    'Discovery': { label: 'Discovery', icon: Search, color: 'text-amber-600', bg: 'bg-amber-50' },
    'Priorizado': { label: 'Priorizadas', icon: AlertCircle, color: 'text-[#1b0088]', bg: 'bg-[#1b0088]/5' },
    'En Progreso': { label: 'En Progreso', icon: PlayCircle, color: 'text-[#eb0045]', bg: 'bg-[#eb0045]/5' },
    'Finalizado': { label: 'Finalizadas', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  };

  return (
    <div className="min-h-screen bg-[#F4F6F9] text-[#1b0088] font-sans selection:bg-[#eb0045]/10">
      {/* Top Navigation Bar - LATAM Style */}
      <nav className="bg-[#1b0088] text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                <TrendingUp size={18} className="text-[#1b0088]" />
              </div>
              <span className="text-xl font-black tracking-tighter uppercase">LATAM <span className="font-light">HR</span></span>
            </div>
            
            <div className="hidden md:flex items-center gap-1">
              <button 
                onClick={() => setMainTab('dashboard')}
                className={cn(
                  "px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all rounded-md",
                  mainTab === 'dashboard' ? "bg-white/10 text-white" : "text-white/60 hover:text-white hover:bg-white/5"
                )}
              >
                Dashboard
              </button>
              <button 
                onClick={() => setMainTab('performance')}
                className={cn(
                  "px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all rounded-md",
                  mainTab === 'performance' ? "bg-white/10 text-white" : "text-white/60 hover:text-white hover:bg-white/5"
                )}
              >
                Performance
              </button>
              <button 
                onClick={() => setMainTab('timeline')}
                className={cn(
                  "px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all rounded-md",
                  mainTab === 'timeline' ? "bg-white/10 text-white" : "text-white/60 hover:text-white hover:bg-white/5"
                )}
              >
                Timeline
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Executive View</span>
              <span className="text-xs font-black">Admin Portfolio</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
              <User size={18} />
            </div>
          </div>
        </div>
      </nav>

      {/* Summary Stats Row - New */}
      <div className="bg-white border-b border-slate-100 px-6 py-2">
        <div className="max-w-7xl mx-auto">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Panel Métricas Jira [DRAFT]</span>
        </div>
      </div>
      <SummaryStats data={HR_DATA} />

      {/* Header Section - Minimalist & Direct */}
      <header className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="flex items-center gap-3">
              <div className="w-1 h-4 bg-[#1b0088]" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Portfolio Executive Report</span>
            </div>
            
            {mainTab === 'dashboard' && (
              <div className="flex items-center gap-6">
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Visualización</span>
                  <div className="flex items-center gap-1 p-1 bg-slate-50 rounded-lg border border-slate-100">
                    <button 
                      onClick={() => setViewMode('grouped')}
                      className={cn(
                        "px-4 py-1.5 rounded-md text-[9px] font-black uppercase tracking-widest transition-all",
                        viewMode === 'grouped' ? "bg-white shadow-sm text-[#1b0088]" : "text-slate-400 hover:text-slate-600"
                      )}
                    >
                      Journey
                    </button>
                    <button 
                      onClick={() => setViewMode('all')}
                      className={cn(
                        "px-4 py-1.5 rounded-md text-[9px] font-black uppercase tracking-widest transition-all",
                        viewMode === 'all' ? "bg-white shadow-sm text-[#1b0088]" : "text-slate-400 hover:text-slate-600"
                      )}
                    >
                      Lista
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {mainTab === 'dashboard' ? (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {/* Analytics Section */}
              <PortfolioAnalytics data={HR_DATA} />

              {/* Status Tabs - Premium Style */}
              <div className="flex flex-wrap gap-3 mb-12">
                {Object.entries(statusConfig).map(([key, config]) => (
                  <button
                    key={key}
                    onClick={() => setActiveStatus(key)}
                    className={cn(
                      "group flex items-center gap-4 px-6 py-4 rounded-2xl border transition-all duration-300",
                      activeStatus === key 
                        ? "bg-[#1b0088] border-[#1b0088] text-white shadow-2xl shadow-[#1b0088]/20" 
                        : "bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50"
                    )}
                  >
                    <div className={cn(
                      "p-2 rounded-xl transition-colors",
                      activeStatus === key ? "bg-white/10" : config.bg
                    )}>
                      <config.icon size={18} className={activeStatus === key ? "text-white" : config.color} />
                    </div>
                    <div className="text-left">
                      <div className={cn(
                        "text-[10px] font-black uppercase tracking-widest leading-none mb-1",
                        activeStatus === key ? "text-white/60" : "text-slate-400"
                      )}>
                        {config.label}
                      </div>
                      <div className="text-xl font-black leading-none">
                        {(stats as any)[key.toLowerCase().replace(' ', '')]}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Content Area */}
              <div className="space-y-12">
                {viewMode === 'grouped' ? (
                  Object.entries(groupedByJourney).map(([journey, items]) => (
                    items.length > 0 && (
                      <section key={journey} className="relative">
                        <div className="flex items-center gap-4 mb-6">
                          <h2 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">{journey}</h2>
                          <div className="h-[1px] flex-1 bg-slate-50" />
                          <span className="text-[9px] font-bold text-slate-300 bg-slate-50 px-2 py-0.5 rounded-full">{items.length}</span>
                        </div>
                        
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                          {items.map(item => (
                            <InitiativeCard 
                              key={item.id} 
                              item={item} 
                              isInitiallyExpanded={selectedInitiativeId === item.id}
                            />
                          ))}
                        </div>
                      </section>
                    )
                  ))
                ) : (
                  <div className="flex flex-col gap-4">
                    {filteredData.map(item => (
                      <InitiativeCard 
                        key={item.id} 
                        item={item} 
                        isInitiallyExpanded={selectedInitiativeId === item.id}
                      />
                    ))}
                  </div>
                )}
                
                {filteredData.length === 0 && (
                  <div className="py-20 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                    <p className="text-sm font-medium text-slate-400">No hay iniciativas en este estado actualmente.</p>
                  </div>
                )}
              </div>
            </motion.div>
          ) : mainTab === 'performance' ? (
            <motion.div
              key="performance"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <PerformanceMetrics data={HR_DATA} />
            </motion.div>
          ) : (
            <motion.div
              key="timeline"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <TimelineView 
                data={HR_DATA} 
                onInitiativeClick={(id, status) => {
                  setSelectedInitiativeId(id);
                  setActiveStatus(status);
                  setMainTab('dashboard');
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function InitiativeCard({ item, isInitiallyExpanded = false }: { item: Initiative, isInitiallyExpanded?: boolean }) {
  const [isExpanded, setIsExpanded] = useState(isInitiallyExpanded);
  const isAnomaly = item.timeInStateDays > 100 && item.status !== 'Finalizado';

  React.useEffect(() => {
    if (isInitiallyExpanded) {
      setIsExpanded(true);
      const el = document.getElementById(`card-${item.id}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isInitiallyExpanded, item.id]);

  const cn = (...inputs: any[]) => inputs.filter(Boolean).join(' ');

  return (
    <motion.div 
      layout
      id={`card-${item.id}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={() => setIsExpanded(!isExpanded)}
      className={cn(
        "group bg-white border border-slate-100 rounded-xl p-4 md:p-6 hover:border-slate-300 transition-all duration-300 cursor-pointer overflow-hidden relative",
        isAnomaly && "bg-red-50/5 border-red-100",
        isExpanded && "ring-1 ring-slate-200 shadow-lg border-slate-300"
      )}
    >
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 md:gap-12">
        <div className="flex-1 min-w-0 flex flex-col md:flex-row md:items-start gap-2 md:gap-8">
          <div className="flex items-center gap-3 shrink-0 pt-1">
            <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest w-12">{item.id}</span>
            <div className="h-3 w-[1px] bg-slate-100 hidden md:block" />
            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest truncate max-w-[120px] hidden md:block">{item.microJourney}</span>
          </div>
          <h3 className="text-sm md:text-base font-bold text-slate-800 leading-snug group-hover:text-[#1b0088] transition-colors">
            {item.summary}
          </h3>
        </div>

        <div className="flex items-center justify-between md:justify-end gap-8 md:gap-12 shrink-0 pt-1">
          <div className="flex flex-col md:items-end min-w-[120px]">
            <span className="text-[7px] font-black text-slate-300 uppercase tracking-widest mb-0.5">Responsable</span>
            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest truncate max-w-[150px]">{item.assignee}</span>
          </div>
          
          <div className="flex flex-col items-end min-w-[70px]">
            <span className="text-2xl font-light text-slate-900 tabular-nums tracking-tighter leading-none">
              {item.timeInStateDays}
              <span className="text-[10px] text-slate-300 ml-0.5 font-bold">d</span>
            </span>
            <span className="text-[7px] font-black text-slate-300 uppercase tracking-widest">Lead Time</span>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-8 pt-8 border-t border-slate-50 space-y-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="space-y-3">
                  <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.3em]">Descripción</span>
                  <p className="text-sm text-slate-600 leading-relaxed font-medium">{item.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.3em]">País</span>
                    <div className="text-xs font-bold text-slate-700 uppercase tracking-widest">{item.country}</div>
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.3em]">Prioridad</span>
                    <div className={cn(
                      "inline-block px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest border",
                      item.priority === 'Critical' ? "border-[#eb0045] text-[#eb0045]" :
                      item.priority === 'High' ? "border-orange-200 text-orange-600" :
                      "border-slate-100 text-slate-400"
                    )}>
                      {item.priority}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6 bg-slate-50/50 p-6 rounded-xl border border-slate-100">
                <div className="space-y-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Journey Stage</span>
                    <span className="text-[10px] font-bold text-[#1b0088] uppercase tracking-widest">{item.journeyStage}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Entrega Estimada</span>
                    <span className="text-[10px] font-bold text-slate-700 uppercase tracking-widest">{item.targetEnd || 'TBD'}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Estado Actual</span>
                    <span className="text-[10px] font-bold text-slate-700 uppercase tracking-widest">{item.status} ({item.timeInStateDays}d)</span>
                  </div>
                </div>
              </div>
            </div>

            {item.history && item.history.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.3em]">Historial de Estados</span>
                  <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">
                    Total: {item.history.reduce((acc, h) => acc + h.days, 0) + item.timeInStateDays} días
                  </span>
                </div>
                <div className="flex gap-1 h-1.5">
                  {item.history.map((h, idx) => (
                    <div 
                      key={idx} 
                      className={cn(
                        "h-full rounded-full relative group/hist",
                        h.status === 'Backlog' ? 'bg-slate-100' :
                        h.status === 'Discovery' ? 'bg-slate-200' :
                        h.status === 'Priorizado' ? 'bg-[#1b0088]/30' :
                        h.status === 'En Progreso' ? 'bg-[#1b0088]/60' : 'bg-black/20'
                      )}
                      style={{ flex: h.days }}
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[8px] font-black px-2 py-1 rounded-md opacity-0 group-hover/hist:opacity-100 whitespace-nowrap z-20 pointer-events-none transition-all">
                        {h.status}: {h.days}d
                      </div>
                    </div>
                  ))}
                  <div 
                    className={cn(
                      "h-full rounded-full relative group/hist", 
                      item.status === 'En Progreso' ? 'bg-[#1b0088]' : 'bg-black'
                    )} 
                    style={{ flex: item.timeInStateDays }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[8px] font-black px-2 py-1 rounded-md opacity-0 group-hover/hist:opacity-100 whitespace-nowrap z-20 pointer-events-none transition-all">
                      {item.status}: {item.timeInStateDays}d (Actual)
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
