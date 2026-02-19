
import React, { useState, useEffect, useCallback } from 'react';
import { METRICS, ACTIVITY, CHART_DATA, DASHBOARD_ALERTS } from '../constants';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { DashboardAlert, ActivityItem, AIInsight } from '../types';
import { GoogleGenAI } from "@google/genai";

const HomeDashboard: React.FC = () => {
  const [alerts, setAlerts] = useState<DashboardAlert[]>(DASHBOARD_ALERTS);
  const [feed, setFeed] = useState<ActivityItem[]>(ACTIVITY);
  const [insight, setInsight] = useState<AIInsight | null>(null);
  const [isGeneratingInsight, setIsGeneratingInsight] = useState(false);
  const [revenue, setRevenue] = useState(1240500);

  // Optimistic Alert Dismissal
  const dismissAlert = (id: string) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  // Real-time Revenue & Activity Simulation (Mercari-style dynamic feel)
  useEffect(() => {
    const revenueTimer = setInterval(() => {
      setRevenue(prev => prev + Math.floor(Math.random() * 500));
    }, 5000);

    const activityTimer = setInterval(() => {
      const newItem: ActivityItem = {
        id: `act-${Date.now()}`,
        type: 'sale',
        title: 'New Sale!',
        subtitle: ['iPhone Case', 'Vintage Tee', 'Gaming Mouse', 'Desk Mat'][Math.floor(Math.random() * 4)],
        value: `¥${(Math.floor(Math.random() * 10) + 1) * 1000}`,
        time: 'Just now',
        isNew: true
      };
      setFeed(prev => [newItem, ...prev.slice(0, 5)]);
    }, 15000);

    return () => {
      clearInterval(revenueTimer);
      clearInterval(activityTimer);
    };
  }, []);

  // AI-Powered Growth Insight (Technical Flex using Gemini API)
  const generateAIInsight = useCallback(async () => {
    setIsGeneratingInsight(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "Analyze current sales trend: ¥1.2M revenue, +12% growth, 4.8% conversion. Provide a brief, high-impact growth insight for a marketplace seller in Japan. Keep it under 50 words. Format as JSON with title and content fields.",
        config: { responseMimeType: "application/json" }
      });
      
      const result = JSON.parse(response.text || '{}');
      setInsight({
        title: result.title || "Inventory Velocity Optimization",
        content: result.content || "Your electronics category is outperforming. Consider dynamic pricing for stagnant listings to boost overall turn-thru rate.",
        confidence: 94
      });
    } catch (err) {
      console.error("AI Insight failed", err);
    } finally {
      setIsGeneratingInsight(false);
    }
  }, []);

  useEffect(() => {
    generateAIInsight();
  }, [generateAIInsight]);

  return (
    <div className="flex flex-col gap-6 md:gap-8 animate-in fade-in slide-in-from-bottom-2 duration-700 pb-12">
      
      {/* SECTION 1: Dynamic Metric Cards (The Top horizontal of the F-pattern) */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-4 md:px-0">
        {METRICS.map((metric) => (
          <div key={metric.label} className="group relative bg-surface-light dark:bg-surface-dark p-6 rounded-3xl border border-border-light dark:border-border-dark shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-500 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="flex items-center justify-between relative z-10 mb-5">
              <div className={`p-3 rounded-2xl ${
                metric.type === 'sales' ? 'bg-primary/10 text-primary' :
                metric.type === 'listings' ? 'bg-purple-500/10 text-purple-500' :
                metric.type === 'ship' ? 'bg-orange-500/10 text-orange-500' :
                'bg-emerald-500/10 text-emerald-500'
              }`}>
                <span className="material-symbols-outlined text-[24px] group-hover:scale-110 transition-transform">
                  {metric.type === 'sales' ? 'query_stats' :
                   metric.type === 'listings' ? 'inventory_2' :
                   metric.type === 'ship' ? 'local_shipping' : 'chat_bubble'}
                </span>
              </div>
              <div className={`flex items-center gap-1 text-[11px] font-black uppercase px-2.5 py-1 rounded-lg ${
                metric.trend === 'up' ? 'text-emerald-500 bg-emerald-500/10' :
                metric.trend === 'down' ? 'text-rose-500 bg-rose-500/10' :
                'text-slate-500 bg-slate-500/10'
              }`}>
                <span className="material-symbols-outlined text-[14px]">
                  {metric.trend === 'up' ? 'trending_up' : metric.trend === 'down' ? 'trending_down' : 'horizontal_rule'}
                </span>
                {metric.change}
              </div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.15em] mb-1">{metric.label}</h3>
              <p className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white tabular-nums">
                {metric.type === 'sales' ? `¥${revenue.toLocaleString()}` : metric.value}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* SECTION 2: Interactive Data & AI Insights (The Middle of the F-pattern) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-4 md:px-0">
        
        {/* Main Performance Area (Left Focus) */}
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-surface-light dark:bg-surface-dark rounded-[2.5rem] p-8 md:p-10 border border-border-light dark:border-border-dark shadow-sm relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
              <div>
                <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Sales Intelligence</h2>
                <p className="text-sm text-slate-500 font-medium">Daily performance analysis & revenue flow</p>
              </div>
              <div className="flex bg-slate-100 dark:bg-slate-900/50 p-1.5 rounded-2xl border border-border-light dark:border-border-dark">
                {['Daily', 'Weekly', 'Monthly'].map(tab => (
                  <button key={tab} className={`px-6 py-2 text-[11px] font-black rounded-xl transition-all ${tab === 'Daily' ? 'bg-white dark:bg-slate-800 shadow-md text-primary' : 'text-slate-400 hover:text-slate-600'}`}>
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-[340px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={CHART_DATA}>
                  <defs>
                    <linearGradient id="primaryGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0d59f2" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#0d59f2" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#888" strokeOpacity={0.05} />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fontSize: 10, fill: '#64748b', fontWeight: 700}} 
                    dy={15}
                    interval={5}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fontSize: 10, fill: '#64748b', fontWeight: 700}}
                    tickFormatter={(v) => `¥${v/1000}k`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#121212', 
                      border: 'none', 
                      borderRadius: '20px', 
                      boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
                      padding: '16px 20px'
                    }}
                    itemStyle={{ color: '#fff', fontSize: '15px', fontWeight: '800' }}
                    labelStyle={{ color: '#0d59f2', fontSize: '10px', textTransform: 'uppercase', fontWeight: '900', letterSpacing: '0.1em', marginBottom: '8px' }}
                    cursor={{ stroke: '#0d59f2', strokeWidth: 2 }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="sales" 
                    stroke="#0d59f2" 
                    strokeWidth={4} 
                    fillOpacity={1} 
                    fill="url(#primaryGrad)"
                    animationDuration={2000}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Activity Feed (F-Pattern continuation) */}
          <section className="bg-surface-light dark:bg-surface-dark rounded-[2rem] border border-border-light dark:border-border-dark overflow-hidden shadow-sm">
            <div className="flex items-center justify-between p-6 border-b border-border-light dark:border-border-dark">
              <h2 className="text-lg font-black text-slate-900 dark:text-white">Live Stream</h2>
              <button className="text-[11px] font-black text-primary hover:bg-primary/5 px-4 py-1.5 rounded-full transition-all uppercase tracking-widest">View History</button>
            </div>
            <div className="divide-y divide-border-light dark:divide-border-dark">
              {feed.map((item) => (
                <div key={item.id} className={`flex items-center gap-5 p-6 transition-all hover:bg-slate-50 dark:hover:bg-slate-800/40 group ${item.isNew ? 'bg-primary/[0.02] dark:bg-primary/[0.04]' : ''}`}>
                  <div className={`size-14 rounded-[1.25rem] flex items-center justify-center shrink-0 shadow-sm border border-transparent group-hover:border-current/20 transition-all ${
                    item.type === 'sale' ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600' :
                    item.type === 'offer' ? 'bg-blue-100 dark:bg-blue-900/40 text-primary' :
                    'bg-orange-100 dark:bg-orange-900/40 text-orange-600'
                  }`}>
                    <span className="material-symbols-outlined text-[28px]">
                      {item.type === 'sale' ? 'point_of_sale' : item.type === 'offer' ? 'gavel' : 'history'}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <h4 className="text-base font-black text-slate-900 dark:text-white truncate">{item.title}</h4>
                      {item.isNew && (
                        <span className="size-2 rounded-full bg-primary animate-ping" />
                      )}
                    </div>
                    <p className="text-xs text-slate-500 font-bold truncate mt-1 uppercase tracking-tight opacity-70">{item.subtitle}</p>
                  </div>
                  <div className="text-right shrink-0">
                    {item.value && (
                      <p className="text-base font-black text-slate-900 dark:text-white tabular-nums tracking-tighter">{item.value}</p>
                    )}
                    <p className="text-[10px] text-slate-400 font-black uppercase mt-1">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar Insights (Right Column of the F-pattern) */}
        <section className="flex flex-col gap-6">
          
          {/* AI Growth Consultant Card */}
          <div className="bg-slate-900 dark:bg-black rounded-[2.5rem] p-8 border border-slate-800 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4">
              <span className="material-symbols-outlined text-primary/30 text-5xl rotate-12 group-hover:rotate-0 transition-transform duration-1000">auto_awesome</span>
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6">
                 <span className="bg-primary px-3 py-1 rounded-full text-[10px] font-black text-white uppercase tracking-widest">AI Consultant</span>
                 {isGeneratingInsight && <span className="size-2 rounded-full bg-primary animate-pulse" />}
              </div>
              
              {insight ? (
                <div className="animate-in fade-in slide-in-from-right duration-1000">
                  <h3 className="text-xl font-black text-white tracking-tight mb-3 leading-tight">{insight.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed font-medium mb-6">
                    {insight.content}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                       <div className="w-10 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: `${insight.confidence}%` }} />
                       </div>
                       <span className="text-[10px] text-slate-500 font-bold uppercase">{insight.confidence}% confidence</span>
                    </div>
                    <button 
                      onClick={generateAIInsight}
                      className="text-slate-400 hover:text-white transition-colors"
                      aria-label="Regenerate"
                    >
                      <span className="material-symbols-outlined text-lg">refresh</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 py-4">
                  <div className="h-6 bg-slate-800 rounded-full w-3/4 animate-pulse" />
                  <div className="h-20 bg-slate-800 rounded-2xl animate-pulse" />
                </div>
              )}
            </div>
          </div>

          {/* Attention Center (Critical Alerts) */}
          <div className="bg-surface-light dark:bg-surface-dark rounded-[2.5rem] p-8 border border-border-light dark:border-border-dark shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-black text-slate-900 dark:text-white">Action Center</h3>
              <span className="px-2.5 py-1 bg-rose-500 text-white text-[10px] font-black rounded-full shadow-lg shadow-rose-500/20">{alerts.length} Tasks</span>
            </div>
            
            <div className="space-y-4">
              {alerts.length > 0 ? alerts.map((alert) => (
                <div key={alert.id} className={`p-5 rounded-3xl border transition-all animate-in slide-in-from-right duration-300 group hover:shadow-lg ${
                  alert.priority === 'high' ? 'bg-rose-50/50 dark:bg-rose-950/10 border-rose-100 dark:border-rose-900/30' :
                  alert.priority === 'medium' ? 'bg-orange-50/50 dark:bg-orange-950/10 border-orange-100 dark:border-orange-900/30' :
                  'bg-blue-50/50 dark:bg-blue-950/10 border-blue-100 dark:border-blue-900/30'
                }`}>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <p className={`text-sm font-bold leading-snug ${
                      alert.priority === 'high' ? 'text-rose-700 dark:text-rose-400' :
                      alert.priority === 'medium' ? 'text-orange-700 dark:text-orange-400' :
                      'text-blue-700 dark:text-blue-400'
                    }`}>{alert.message}</p>
                    <button 
                      onClick={() => dismissAlert(alert.id)}
                      className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors shrink-0 p-1"
                    >
                      <span className="material-symbols-outlined text-[20px]">close</span>
                    </button>
                  </div>
                  <button className={`w-full py-3 rounded-2xl text-xs font-black transition-all active:scale-[0.97] ${
                    alert.priority === 'high' ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/25 hover:bg-rose-600' :
                    alert.priority === 'medium' ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25 hover:bg-orange-600' :
                    'bg-primary text-white shadow-lg shadow-primary/25 hover:bg-primary-dark'
                  }`}>
                    {alert.actionLabel}
                  </button>
                </div>
              )) : (
                <div className="py-16 flex flex-col items-center text-center">
                  <div className="size-16 rounded-full bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-3xl text-emerald-500">done_all</span>
                  </div>
                  <h4 className="text-base font-black text-slate-900 dark:text-white">Optimal Efficiency</h4>
                  <p className="text-xs text-slate-500 mt-1 font-medium">No bottlenecks detected in your ops.</p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Stats Card */}
          <div className="bg-gradient-to-br from-primary to-primary-dark p-8 rounded-[2.5rem] shadow-2xl shadow-primary/30 flex flex-col justify-between h-56 relative overflow-hidden group">
             <div className="absolute -right-8 -bottom-8 size-48 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-1000" />
             <div className="relative z-10">
                <p className="text-white/70 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Payout Schedule</p>
                <p className="text-white text-3xl font-black tracking-tighter italic">¥450,200</p>
                <p className="text-white/60 text-xs font-bold mt-1">Estimated Deposit: Nov 28</p>
             </div>
             <div className="relative z-10 flex items-center justify-between">
                <div className="flex -space-x-2">
                   {[1,2,3].map(i => (
                     <div key={i} className="size-8 rounded-full border-2 border-primary bg-slate-200" />
                   ))}
                   <div className="size-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-[10px] font-black text-white">+8</div>
                </div>
                <span className="material-symbols-outlined text-white text-3xl">account_balance_wallet</span>
             </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomeDashboard;
