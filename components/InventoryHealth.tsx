
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip as ChartTooltip, CartesianGrid } from 'recharts';
import { SALES_DISTRIBUTION, TURNOVER_DATA } from '../constants';

const InventoryHealth: React.FC = () => {
  const COLORS = ['#0d59f2', '#6366f1', '#06b6d4', '#FF6B6B'];

  return (
    <div className="p-4 md:p-0 space-y-8 max-w-6xl mx-auto w-full">
      <header className="mb-8">
        <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Inventory Intelligence</h2>
        <p className="text-slate-500 mt-1">Real-time health metrics and stock optimization</p>
      </header>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Active', value: '1,240', trend: '+5.2%', icon: 'inventory_2' },
          { label: 'Sell-through', value: '42.8%', trend: '+1.8%', icon: 'trending_up' },
          { label: 'Needs Attention', value: '12', trend: '-2', icon: 'error', urgent: true },
          { label: 'Potential Payout', value: '¥2.4M', trend: 'Healthy', icon: 'payments' },
        ].map((stat, i) => (
          <div key={i} className={`p-6 rounded-2xl border border-border-light dark:border-border-dark shadow-sm flex flex-col justify-between ${stat.urgent ? 'bg-coral/5 border-coral/20' : 'bg-surface-light dark:bg-surface-dark'}`}>
            <div className="flex items-center justify-between">
               <span className="material-symbols-outlined text-slate-400">{stat.icon}</span>
               <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${stat.urgent ? 'bg-coral/10 text-coral' : 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600'}`}>
                {stat.trend}
               </span>
            </div>
            <div className="mt-4">
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">{stat.label}</p>
              <div className={`text-2xl font-black tracking-tighter ${stat.urgent ? 'text-coral' : 'dark:text-white'}`}>{stat.value}</div>
            </div>
          </div>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sales Distribution */}
        <div className="bg-surface-light dark:bg-surface-dark p-8 rounded-2xl border border-border-light dark:border-border-dark shadow-sm">
          <div className="flex justify-between items-start mb-10">
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">Category Distribution</h3>
              <p className="text-xs text-slate-500 mt-1">Performance by product vertical</p>
            </div>
          </div>
          
          <div className="flex flex-col xl:flex-row items-center justify-center gap-12">
            <div className="relative w-56 h-56 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={SALES_DISTRIBUTION}
                    innerRadius={75}
                    outerRadius={105}
                    paddingAngle={8}
                    dataKey="value"
                    animationBegin={200}
                    animationDuration={1500}
                  >
                    {SALES_DISTRIBUTION.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} className="focus:outline-none" />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-3xl font-black text-slate-900 dark:text-white">¥1.2M</span>
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Volume</span>
              </div>
            </div>

            <div className="flex flex-col gap-4 w-full">
              {SALES_DISTRIBUTION.map((item, idx) => (
                <div key={item.name} className="flex items-center gap-4 w-full p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: COLORS[idx] }}></span>
                  <span className="text-sm text-slate-600 dark:text-slate-300 font-bold">{item.name}</span>
                  <div className="flex-1 bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden mx-2">
                    <div className="h-full rounded-full" style={{ backgroundColor: COLORS[idx], width: `${item.value}%` }} />
                  </div>
                  <span className="text-sm font-black text-slate-900 dark:text-white tabular-nums w-10 text-right">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Turnover Analysis */}
        <div className="bg-surface-light dark:bg-surface-dark p-8 rounded-2xl border border-border-light dark:border-border-dark shadow-sm flex flex-col">
           <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">Stock Turn-thru</h3>
                <p className="text-xs text-slate-500 mt-1">Inventory velocity by month</p>
              </div>
           </div>
           <div className="flex-1 h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={TURNOVER_DATA} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.05} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#888888', fontWeight: 600}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#888888', fontWeight: 600}} />
                  <ChartTooltip 
                    cursor={{fill: 'rgba(0,0,0,0.02)'}}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.2)', backgroundColor: '#1e1e1e', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Bar 
                    dataKey="value" 
                    fill="#0d59f2" 
                    radius={[10, 10, 0, 0]} 
                    barSize={60}
                    animationDuration={2500}
                  />
                </BarChart>
              </ResponsiveContainer>
           </div>
           <div className="mt-8 pt-6 border-t border-border-light dark:border-border-dark flex justify-around">
             <div className="text-center">
                <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Avg TTL</p>
                <p className="text-xl font-black text-slate-900 dark:text-white">14.2 Days</p>
             </div>
             <div className="text-center border-l border-border-light dark:border-border-dark pl-8">
                <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Efficiency Score</p>
                <p className="text-xl font-black text-emerald-500">92/100</p>
             </div>
           </div>
        </div>
      </div>

      {/* Critical Items Section - Wide View */}
      <section className="space-y-6 pb-12">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-2xl font-black tracking-tight flex items-center gap-3">
            Critical Alerts
            <span className="flex h-6 px-2 items-center justify-center rounded-lg bg-coral text-[12px] font-black text-white shadow-lg shadow-coral/30">Action Required</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl border-l-8 border-coral shadow-sm flex items-center gap-6 group hover:shadow-lg hover:shadow-coral/5 transition-all duration-300">
            <div className="shrink-0 size-24 bg-slate-200 dark:bg-slate-800 rounded-2xl overflow-hidden border border-border-light dark:border-border-dark relative">
               <img src="https://picsum.photos/seed/sony/200/200" alt="Product" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
               <div className="absolute top-2 right-2 size-3 bg-coral rounded-full animate-ping" />
            </div>
            <div className="flex-1 flex flex-col justify-between h-full">
               <div>
                 <span className="inline-flex items-center rounded-lg bg-coral/10 px-2.5 py-1 text-[10px] font-black text-coral ring-1 ring-inset ring-coral/20 uppercase mb-2">High View No-Buy</span>
                 <h4 className="text-lg font-black dark:text-white">Sony WH-1000XM4</h4>
                 <p className="text-xs text-slate-500">45 days listed • 1,280 Views • 0 Offers</p>
               </div>
               <button className="mt-4 w-fit flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-xs font-black text-white shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all active:scale-95">
                  <span className="material-symbols-outlined text-[18px]">sell</span>
                  Drop Price -5%
                </button>
            </div>
          </div>

          <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl border-l-8 border-orange-400 shadow-sm flex items-center gap-6 group hover:shadow-lg hover:shadow-orange-400/5 transition-all duration-300">
            <div className="shrink-0 size-24 bg-slate-200 dark:bg-slate-800 rounded-2xl overflow-hidden border border-border-light dark:border-border-dark">
               <img src="https://picsum.photos/seed/denim/200/200" alt="Product" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
            <div className="flex-1 flex flex-col justify-between h-full">
               <div>
                 <span className="inline-flex items-center rounded-lg bg-orange-100 dark:bg-orange-900/30 px-2.5 py-1 text-[10px] font-black text-orange-600 dark:text-orange-400 ring-1 ring-inset ring-orange-500/20 uppercase mb-2">Low Visibility</span>
                 <h4 className="text-lg font-black dark:text-white">Vintage Denim Jacket</h4>
                 <p className="text-xs text-slate-500">62 days listed • 12 Views • Poor SEO</p>
               </div>
               <button className="mt-4 w-fit flex items-center justify-center gap-2 rounded-xl border-2 border-slate-200 dark:border-slate-800 px-6 py-2.5 text-xs font-black text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95">
                  <span className="material-symbols-outlined text-[18px]">photo_camera</span>
                  Update Photos
                </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InventoryHealth;
