
import React from 'react';
import { useLocation } from 'react-router-dom';

interface HeaderProps {
  isDarkMode: boolean;
  onToggleDark: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, onToggleDark }) => {
  const location = useLocation();

  const getTitle = () => {
    switch (location.pathname) {
      case '/': return 'Control Center';
      case '/listings': return 'Listings';
      case '/orders': return 'Order Hub';
      case '/messages': return 'Messages';
      case '/analytics': return 'Performance';
      default: return 'Control Center';
    }
  };

  const title = getTitle();

  return (
    <header className="flex items-center justify-between px-5 py-4 md:px-8 md:py-6 bg-background-light/60 dark:bg-background-dark/60 backdrop-blur-xl sticky top-0 z-40 border-b border-border-light dark:border-border-dark">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <h1 className="text-xl md:text-2xl font-black tracking-tighter text-slate-900 dark:text-white uppercase leading-none">
            {title}
          </h1>
          {location.pathname === '/' && (
            <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-500 text-[9px] font-black uppercase tracking-tighter">
              Operational
            </span>
          )}
        </div>
        {location.pathname === '/' && (
          <span className="hidden md:inline-block text-[10px] text-slate-500 dark:text-slate-500 font-black uppercase tracking-[0.2em] mt-1">Live Market Intelligence Hub</span>
        )}
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {/* Desktop Search Bar */}
        <div className="hidden lg:flex relative w-80">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-lg">search</span>
          <input
            type="text"
            placeholder="System search (⌘K)"
            className="w-full bg-slate-100 dark:bg-slate-900 border border-transparent focus:border-primary/20 rounded-2xl py-2.5 pl-11 pr-4 text-xs font-bold focus:ring-0 transition-all placeholder:text-slate-500 dark:text-slate-200"
          />
        </div>

        <div className="flex items-center gap-1 md:gap-2">
          <button
            onClick={onToggleDark}
            className="p-2.5 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-slate-600 dark:text-slate-400 border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
            aria-label="Toggle Dark Mode"
          >
            <span className="material-symbols-outlined text-xl">
              {isDarkMode ? 'light_mode' : 'dark_mode'}
            </span>
          </button>

          <button className="relative p-2.5 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700 group">
            <span className="material-symbols-outlined text-xl text-slate-600 dark:text-slate-400">notifications</span>
            <span className="absolute top-3 right-3 w-2 h-2 bg-rose-500 rounded-full border-2 border-background-light dark:border-background-dark group-hover:scale-125 transition-transform" />
          </button>
        </div>

        <div className="md:hidden flex items-center ml-2 border-l border-border-light dark:border-border-dark pl-3">
          <div className="size-9 rounded-full bg-primary/20 p-0.5 border border-primary/30">
            <img src="https://picsum.photos/seed/kaito/100/100" className="w-full h-full rounded-full object-cover" alt="User" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
