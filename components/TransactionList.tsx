
import React, { useState, useRef, useMemo, useEffect } from 'react';
import { TRANSACTIONS } from '../constants';

const ITEM_HEIGHT = 80; // height of each transaction row in pixels
const BUFFER = 5; // number of extra items to render above and below the visible area

const TransactionList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [scrollTop, setScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(600);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => 
    TRANSACTIONS.filter(t => 
      t.itemName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      t.buyerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.id.toLowerCase().includes(searchTerm.toLowerCase())
    ), [searchTerm]
  );

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContainerHeight(containerRef.current.clientHeight);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  const startIndex = Math.max(0, Math.floor(scrollTop / ITEM_HEIGHT) - BUFFER);
  const endIndex = Math.min(filtered.length - 1, Math.floor((scrollTop + containerHeight) / ITEM_HEIGHT) + BUFFER);
  
  const visibleItems = filtered.slice(startIndex, endIndex + 1);
  const totalHeight = filtered.length * ITEM_HEIGHT;

  return (
    <div className="flex flex-col h-full md:h-[calc(100vh-140px)] bg-background-light dark:bg-background-dark max-w-6xl mx-auto w-full">
      {/* Search & Filter Bar */}
      <div className="p-4 md:px-0 mb-4 bg-background-light dark:bg-background-dark sticky top-0 z-10 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Order Management</h2>
            <p className="text-xs text-slate-500 font-medium">Tracking {filtered.length.toLocaleString()} individual transactions</p>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all">
              <span className="material-symbols-outlined text-[18px]">add</span>
              New Listing
            </button>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined text-[20px]">search</span>
            <input 
              type="text" 
              placeholder="Search by ID, Item, or Buyer..."
              className="w-full h-12 pl-12 pr-4 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-2xl text-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder-slate-400 shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-3 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-2xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm">
              <span className="material-symbols-outlined text-[18px]">tune</span>
              Filters
            </button>
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-3 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-2xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm">
              <span className="material-symbols-outlined text-[18px]">ios_share</span>
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Virtualized List Container */}
      <div 
        ref={containerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto relative rounded-2xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark shadow-sm scroll-smooth"
      >
        <div style={{ height: `${totalHeight}px`, position: 'relative' }}>
          {visibleItems.map((trx, index) => {
            const actualIndex = startIndex + index;
            return (
              <div 
                key={trx.id} 
                style={{ 
                  height: `${ITEM_HEIGHT}px`, 
                  top: `${actualIndex * ITEM_HEIGHT}px`,
                  position: 'absolute',
                  width: '100%'
                }}
                className="px-4 py-2 border-b border-border-light dark:border-border-dark hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors flex items-center gap-4 group"
              >
                <div className="shrink-0 size-12 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden border border-border-light dark:border-border-dark">
                  <img loading="lazy" src={trx.image} alt="" className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-500" />
                </div>
                
                <div className="flex-1 min-w-0 grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
                  <div className="col-span-1 md:col-span-2">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate pr-2 leading-tight">
                      {trx.itemName}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[10px] font-bold text-primary uppercase">{trx.id}</span>
                      <span className="text-slate-300 dark:text-slate-700 text-[10px]">•</span>
                      <span className="text-[10px] text-slate-500 font-medium">To: {trx.buyerName}</span>
                    </div>
                  </div>

                  <div className="hidden md:block">
                     <span className="text-xs text-slate-500 font-medium">{trx.date}</span>
                  </div>
                  
                  <div className="flex flex-col items-end justify-center md:items-start">
                    <span className="text-sm font-black text-slate-900 dark:text-white tabular-nums">
                      {trx.price}
                    </span>
                    <span className={`inline-flex items-center gap-1 mt-1 text-[9px] font-black uppercase tracking-wider ${
                      trx.status === 'Completed' ? 'text-emerald-500' :
                      trx.status === 'Dispute' ? 'text-red-500' :
                      trx.status === 'Awaiting Shipment' ? 'text-orange-500' :
                      'text-blue-500'
                    }`}>
                      {trx.status}
                    </span>
                  </div>
                </div>

                <div className="hidden md:flex shrink-0 items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                   <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                      <span className="material-symbols-outlined text-[18px]">visibility</span>
                   </button>
                   <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                      <span className="material-symbols-outlined text-[18px]">more_vert</span>
                   </button>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-slate-400 p-12 text-center">
            <span className="material-symbols-outlined text-6xl mb-4 text-slate-200 dark:text-slate-800">search_off</span>
            <p className="text-lg font-bold">No transactions found</p>
            <p className="text-sm">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionList;
