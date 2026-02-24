'use client';

import React, { useMemo } from 'react';
import { Initiative } from '../lib/data';
import { 
  format, 
  parseISO, 
  differenceInDays, 
  startOfMonth, 
  endOfMonth, 
  addMonths, 
  addDays,
  eachMonthOfInterval,
  min,
  max,
  isBefore,
  isAfter
} from 'date-fns';
import { es } from 'date-fns/locale';
import { motion } from 'motion/react';
import { Calendar, Flag, Clock, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TimelineViewProps {
  data: Initiative[];
  onInitiativeClick?: (id: string, status: string) => void;
}

export function TimelineView({ data, onInitiativeClick }: TimelineViewProps) {
  const today = useMemo(() => new Date('2026-02-24T03:44:01-08:00'), []); // Current system time

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      return parseISO(a.createdDate).getTime() - parseISO(b.createdDate).getTime();
    });
  }, [data]);

  const { timelineRange, months, totalDays } = useMemo(() => {
    // Extended range: July 2025 to Dec 2026 to show history
    const start = new Date('2025-07-01T00:00:00');
    const end = new Date('2026-12-31T23:59:59');

    return {
      timelineRange: { start, end },
      months: eachMonthOfInterval({ start, end }),
      totalDays: differenceInDays(end, start) + 1
    };
  }, []);

  if (!timelineRange) return null;

  const getPosition = (date: string | Date | undefined) => {
    if (!date) return 0;
    const d = typeof date === 'string' ? parseISO(date) : date;
    if (isNaN(d.getTime())) return 0;
    
    // Clip to timeline range
    const effectiveDate = isBefore(d, timelineRange.start) ? timelineRange.start : 
                         isAfter(d, timelineRange.end) ? timelineRange.end : d;
    
    const days = differenceInDays(effectiveDate, timelineRange.start);
    return (days / totalDays) * 100;
  };

  const getTodayPosition = () => {
    const days = differenceInDays(today, timelineRange.start);
    return (days / totalDays) * 100;
  };

  const getMonthWidth = (month: Date) => {
    const start = startOfMonth(month);
    const end = endOfMonth(month);
    const days = differenceInDays(end, start) + 1;
    return (days / totalDays) * 100;
  };

  const statusColors: Record<string, string> = {
    'Backlog': 'bg-slate-300',
    'Discovery': 'bg-amber-400',
    'Priorizado': 'bg-[#1b0088]',
    'En Progreso': 'bg-[#eb0045]',
    'Finalizado': 'bg-emerald-500',
  };

  return (
    <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-100 scrollbar-track-transparent">
        <div className="min-w-[1400px]">
          {/* Timeline Header */}
          <div className="flex border-b border-slate-50 bg-white">
            <div className="w-80 p-8 border-r border-slate-50 sticky left-0 bg-white z-40">
              <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.4em]">Iniciativas</span>
            </div>
            <div className="flex-1 flex relative">
              {months.map((month, idx) => (
                <div 
                  key={idx} 
                  className="border-r border-slate-50 p-6 flex flex-col items-center justify-center"
                  style={{ width: `${getMonthWidth(month)}%` }}
                >
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{format(month, 'MMM', { locale: es })}</span>
                  <span className="text-[8px] font-bold text-slate-200">{format(month, 'yyyy')}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline Body */}
          <div className="divide-y divide-slate-50 relative">
            {sortedData.map((item) => {
              const createdDate = parseISO(item.createdDate);
              const targetEndDate = item.targetEnd ? parseISO(item.targetEnd) : null;
              const resolvedDate = item.resolvedDate ? parseISO(item.resolvedDate) : null;

              const startPos = getPosition(createdDate);
              const todayPos = getTodayPosition();
              const targetEndPos = targetEndDate ? getPosition(targetEndDate) : null;
              const resolvedPos = resolvedDate ? getPosition(resolvedDate) : null;

              let lastDate = createdDate;
              const segments: { status: string, start: Date, end: Date, days: number }[] = [];
              
              if (item.history) {
                item.history.forEach(h => {
                  const nextDate = addDays(lastDate, h.days);
                  segments.push({ status: h.status, start: lastDate, end: nextDate, days: h.days });
                  lastDate = nextDate;
                });
              }
              const currentDays = differenceInDays(resolvedDate || today, lastDate);
              segments.push({ status: item.status, start: lastDate, end: resolvedDate || today, days: currentDays });

              const visibleSegments = segments.map(seg => {
                const s = max([seg.start, timelineRange.start]);
                const e = min([seg.end, timelineRange.end]);
                if (isBefore(e, s)) return null;
                return {
                  status: seg.status,
                  startPos: getPosition(s),
                  endPos: getPosition(e),
                  days: seg.days,
                  fullStart: seg.start,
                  fullEnd: seg.end
                };
              }).filter((s): s is { status: string, startPos: number, endPos: number, days: number, fullStart: Date, fullEnd: Date } => s !== null);

              const barStartPos = visibleSegments.length > 0 ? visibleSegments[0].startPos : startPos;
              const barEndPos = visibleSegments.length > 0 ? visibleSegments[visibleSegments.length - 1].endPos : startPos;
              const barWidth = Math.max(barEndPos - barStartPos, 0.5);

              const isOverdue = targetEndDate && isAfter(today, targetEndDate) && !resolvedDate;

              return (
                <div 
                  key={item.id} 
                  className="flex group hover:bg-slate-50/30 transition-colors cursor-pointer"
                  onClick={() => onInitiativeClick?.(item.id, item.status)}
                >
                  {/* Info Column */}
                  <div className="w-80 p-8 border-r border-slate-50 sticky left-0 bg-white group-hover:bg-slate-50/30 z-30 flex flex-col justify-center">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[8px] font-black text-slate-200 uppercase tracking-widest">{item.id}</span>
                      <span className="text-[9px] font-bold text-slate-300 tabular-nums">{item.timeInStateDays}d</span>
                    </div>
                    <span className="text-xs font-bold text-slate-900 truncate mb-1 group-hover:text-[#1b0088] transition-colors">{item.summary}</span>
                    <span className="text-[9px] font-black text-slate-300 uppercase tracking-tighter">{item.microJourney}</span>
                  </div>

                  {/* Timeline Track */}
                  <div className="flex-1 relative py-10 px-0">
                    {/* Background Grid Lines */}
                    <div className="absolute inset-0 flex pointer-events-none">
                      {months.map((month, idx) => (
                        <div key={idx} className="border-r border-slate-50 shrink-0" style={{ width: `${getMonthWidth(month)}%` }} />
                      ))}
                    </div>

                    {/* Today Line */}
                    <div 
                      className="absolute top-0 bottom-0 w-[1px] bg-[#eb0045] z-20 pointer-events-none opacity-10"
                      style={{ left: `${getTodayPosition()}%` }}
                    />

                    {/* Actual Progress Bar - Thinner & Sober */}
                    <div 
                      className="absolute h-1.5 bg-slate-50 rounded-full top-1/2 -translate-y-1/2 z-10 overflow-hidden flex"
                      style={{ left: `${barStartPos}%`, width: `${barWidth}%` }}
                    >
                      {visibleSegments.map((seg, idx) => {
                        const segWidthPercent = ((seg.endPos - seg.startPos) / barWidth) * 100;
                        return (
                          <div 
                            key={idx}
                            className={cn(
                              "h-full relative", 
                              statusColors[seg.status] || 'bg-slate-100',
                              seg.status !== item.status && "opacity-40"
                            )}
                            style={{ width: `${segWidthPercent}%` }}
                          />
                        );
                      })}
                    </div>

                    {/* Target End Marker - Flag */}
                    {targetEndPos !== null && (
                      <div 
                        className="absolute top-1/2 -translate-y-1/2 z-20 flex flex-col items-center"
                        style={{ left: `${targetEndPos}%` }}
                      >
                        <Flag 
                          size={12} 
                          className={cn(
                            "mb-1",
                            resolvedDate ? "text-emerald-500" : isOverdue ? "text-[#eb0045]" : "text-[#1b0088]"
                          )} 
                          fill="currentColor"
                        />
                        <div className={cn(
                          "w-1.5 h-1.5 rounded-full border border-white",
                          resolvedDate ? "bg-emerald-500" : isOverdue ? "bg-[#eb0045]" : "bg-[#1b0088]"
                        )} />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Timeline Legend - Vibrant */}
      <div className="p-8 bg-white border-t border-slate-50 flex flex-wrap gap-8 items-center">
        {[
          { label: 'Backlog', color: 'bg-slate-300' },
          { label: 'Discovery', color: 'bg-amber-400' },
          { label: 'Priorizado', color: 'bg-[#1b0088]' },
          { label: 'En Progreso', color: 'bg-[#eb0045]' },
          { label: 'Finalizado', color: 'bg-emerald-500' },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <div className={cn("w-1.5 h-1.5 rounded-full", item.color)} />
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{item.label}</span>
          </div>
        ))}
        <div className="flex items-center gap-2 ml-auto">
          <Flag size={10} className="text-slate-300" fill="currentColor" />
          <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Entrega</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-[1px] h-3 bg-[#eb0045] opacity-30" />
          <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Hoy</span>
        </div>
      </div>
    </div>
  );

}
