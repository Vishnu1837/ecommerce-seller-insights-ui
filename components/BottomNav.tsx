
import React from 'react';
import { NavLink } from 'react-router-dom';

const BottomNav: React.FC = () => {
  const navItems = [
    { path: '/', icon: 'home', label: 'Home' },
    { path: '/listings', icon: 'sell', label: 'Listings' },
    { path: '/orders', icon: 'shopping_bag', label: 'Orders', badge: true },
    { path: '/messages', icon: 'chat_bubble', label: 'Messages', count: 12 },
    { path: '/analytics', icon: 'monitoring', label: 'Analytics' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface-light dark:bg-surface-dark border-t border-border-light dark:border-border-dark pb-safe pt-2 px-2 z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
      <div className="flex justify-between items-end pb-3">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) => `flex flex-1 flex-col items-center justify-center gap-1 group transition-all duration-300 ${isActive ? 'text-primary' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
          >
            {({ isActive }) => (
              <>
                <div className={`flex items-center justify-center p-1 rounded-full relative transition-all duration-300 ${isActive ? 'bg-primary/10' : ''
                  }`}>
                  <span className={`material-symbols-outlined text-[24px] ${isActive ? 'filled' : ''}`}>
                    {item.icon}
                  </span>

                  {item.badge && !item.count && (
                    <span className="absolute top-0 right-0 w-2 h-2 bg-orange-500 rounded-full border border-surface-light dark:border-surface-dark"></span>
                  )}

                  {item.count && (
                    <span className="absolute -top-1 -right-1 bg-primary text-white text-[9px] font-bold px-1 rounded-full border border-surface-light dark:border-surface-dark min-w-[16px] h-[16px] flex items-center justify-center">
                      {item.count}
                    </span>
                  )}
                </div>
                <span className={`text-[10px] font-bold ${isActive ? 'opacity-100' : 'font-medium'}`}>
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
