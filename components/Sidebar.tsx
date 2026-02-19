
import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const navItems = [
    { path: '/', icon: 'grid_view', label: 'Dashboard' },
    { path: '/listings', icon: 'inventory', label: 'Listings' },
    { path: '/orders', icon: 'shopping_cart', label: 'Order Hub' },
    { path: '/messages', icon: 'forum', label: 'Messages', count: 12 },
    { path: '/analytics', icon: 'insights', label: 'Performance' },
  ];

  return (
    <aside className="hidden md:flex flex-col w-72 bg-surface-light dark:bg-surface-dark border-r border-border-light dark:border-border-dark h-screen sticky top-0 shrink-0 z-50">
      <div className="p-8 flex-1 flex flex-col">
        <div className="flex items-center gap-3 mb-12">
          <div className="size-10 bg-primary rounded-[1.25rem] flex items-center justify-center shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-white text-2xl">bolt</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tighter dark:text-white uppercase leading-none">Kaito</span>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Pro Ecosystem</span>
          </div>
        </div>

        <nav className="space-y-2">
          <p className="px-4 text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4">Navigation</p>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) => `w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group ${
                isActive 
                ? 'bg-primary/10 text-primary font-black shadow-sm border border-primary/10' 
                : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              {({ isActive }) => (
                <>
                  <span className={`material-symbols-outlined text-[24px] ${isActive ? 'filled' : ''}`}>
                    {item.icon}
                  </span>
                  <span className="text-sm tracking-tight">{item.label}</span>
                  {item.count && (
                    <span className="ml-auto bg-primary text-white text-[10px] px-2 py-0.5 rounded-lg font-black shadow-lg shadow-primary/20">
                      {item.count}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-8 border-t border-border-light dark:border-border-dark space-y-6 bg-slate-50/50 dark:bg-slate-900/10">
        <div className="bg-surface-light dark:bg-slate-800 p-5 rounded-3xl border border-border-light dark:border-border-dark shadow-sm">
          <div className="flex items-center justify-between mb-3">
             <span className="text-[9px] font-black text-primary uppercase tracking-widest">Growth Plan</span>
             <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">80%</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
            <div className="bg-primary h-full w-[80%] rounded-full shadow-[0_0_10px_rgba(13,89,242,0.4)]" />
          </div>
          <p className="text-[10px] text-slate-500 font-medium mt-3 leading-relaxed">¥1.2M / ¥1.5M goal for Diamond tier badge.</p>
        </div>
        
        <div className="flex items-center gap-4 px-1">
           <div className="size-11 rounded-2xl bg-primary/20 p-0.5 border border-primary/30">
              <img src="https://picsum.photos/seed/kaito/100/100" className="w-full h-full rounded-2xl object-cover" alt="Profile" />
           </div>
           <div className="flex flex-col flex-1 min-w-0">
             <span className="text-sm font-black dark:text-white truncate leading-none mb-1">Kaito Tanaka</span>
             <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Gold Seller</span>
           </div>
           <button className="text-slate-400 hover:text-rose-500 transition-colors shrink-0" aria-label="Logout">
              <span className="material-symbols-outlined text-xl">logout</span>
           </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
