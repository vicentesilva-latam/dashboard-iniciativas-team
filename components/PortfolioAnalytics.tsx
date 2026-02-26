import { Initiative } from "../lib/data";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie
} from "recharts";
import { BarChart2, PieChart as PieChartIcon } from "lucide-react";
import { PerformanceMetrics } from "./PerformanceMetrics";

interface AnalyticsProps {
  data: Initiative[];
}

export function PortfolioAnalytics({ data }: AnalyticsProps) {
  const statusData = [
    { name: 'Discovery', value: data.filter(i => i.status === 'Discovery').length, color: '#3b82f6' },
    { name: 'En Progreso', value: data.filter(i => i.status === 'En Progreso').length, color: '#1b0088' },
    { name: 'Finalizado', value: data.filter(i => i.status === 'Finalizado').length, color: '#10b981' },
    { name: 'Backlog', value: data.filter(i => i.status === 'Backlog').length, color: '#94a3b8' },
  ];

  const journeyData = [
    { name: 'Atracción a Contratación', value: data.filter(i => i.journeyStage === 'Atracción a Contratación').length },
    { name: 'Pre-ingreso a Aterrizaje', value: data.filter(i => i.journeyStage === 'Pre-ingreso a Aterrizaje').length },
    { name: 'Vida en LATAM', value: data.filter(i => i.journeyStage === 'Vida en LATAM').length },
    { name: 'Egreso', value: data.filter(i => i.journeyStage === 'Egreso').length },
    { name: 'Fundamentos Corporativos', value: data.filter(i => i.journeyStage === 'Fundamentos Corporativos').length },
  ].filter(j => j.value > 0);

  const journeyColors = ['#1b0088', '#eb0045', '#10b981', '#f59e0b', '#6366f1'];

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        <div className="bg-white border-t border-slate-100 pt-8">
          <div className="flex items-center justify-between mb-10">
            <div className="space-y-1">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Estado del Portafolio</h3>
              <p className="text-[11px] text-slate-500 font-medium">Distribución por fase actual</p>
            </div>
          </div>
          <div className="h-[240px] w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <BarChart data={statusData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 9, fontWeight: 700, fill: '#64748b' }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 9, fontWeight: 700, fill: '#64748b' }}
                />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                    padding: '12px'
                  }}
                  itemStyle={{ fontSize: '11px', fontWeight: 'bold' }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={32}>
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border-t border-slate-100 pt-8">
          <div className="flex items-center justify-between mb-10">
            <div className="space-y-1">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Iniciativas por Journey Stage</h3>
              <p className="text-[11px] text-slate-500 font-medium">Concentración estratégica</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="h-[240px] w-[240px] shrink-0 min-w-0">
              <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <PieChart>
                  <Pie
                    data={journeyData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={95}
                    paddingAngle={4}
                    dataKey="value"
                    stroke="none"
                  >
                    {journeyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={journeyColors[index % journeyColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '12px', 
                      border: 'none', 
                      boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                      padding: '12px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 grid grid-cols-1 gap-y-3">
              {journeyData.map((entry, index) => (
                <div key={entry.name} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: journeyColors[index % journeyColors.length] }} />
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest group-hover:text-slate-900 transition-colors">{entry.name}</span>
                  </div>
                  <span className="text-xs font-black text-slate-900 tabular-nums">{entry.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
