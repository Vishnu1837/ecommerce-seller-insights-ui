
import { Metric, ActivityItem, Transaction, SalesData, DashboardAlert } from './types';

export const METRICS: Metric[] = [
  { label: 'Net Revenue', value: '¥1,240,500', change: '+12.4%', trend: 'up', type: 'sales' },
  { label: 'Active Inventory', value: '1,402', change: '+2.1%', trend: 'up', type: 'listings' },
  { label: 'Pending Shipments', value: '5', change: '-2', trend: 'down', type: 'ship' },
  { label: 'Customer Inquiry', value: '12', change: 'New', trend: 'neutral', type: 'messages' },
];

export const DASHBOARD_ALERTS: DashboardAlert[] = [
  { id: 'alt-1', type: 'inventory', message: 'Low stock: Sony WH-1000XM4 (2 units left)', actionLabel: 'Restock Now', priority: 'high' },
  { id: 'alt-2', type: 'shipping', message: 'Address verification needed for TRX-9928', actionLabel: 'Verify', priority: 'medium' },
  { id: 'alt-3', type: 'payment', message: 'Monthly payout of ¥450,200 is processing', actionLabel: 'View Schedule', priority: 'low' },
];

export const ACTIVITY: ActivityItem[] = [
  { id: 'act-1', type: 'sale', title: 'Item Sold', subtitle: "Vintage Denim Jacket", value: '¥12,500', time: 'Just now', isNew: true },
  { id: 'act-2', type: 'offer', title: 'New Offer', subtitle: 'Sony Alpha A7 III', value: '¥185,000', time: '12m ago' },
  { id: 'act-3', type: 'expiring', title: 'Listing Expiring', subtitle: 'Rare Pokemon Card', time: '1h left' },
  { id: 'act-4', type: 'sale', title: 'Item Sold', subtitle: "Mechanical Watch", value: '¥42,000', time: '3h ago' },
];

// 30 Days of Granular Data for the Interactive Trend
export const CHART_DATA = Array.from({ length: 30 }, (_, i) => ({
  date: `Nov ${i + 1}`,
  sales: Math.floor(Math.random() * 5000) + 4000 + (i * 150),
  orders: Math.floor(Math.random() * 10) + 5
}));

export const TRANSACTIONS: Transaction[] = Array.from({ length: 5000 }, (_, i) => ({
  id: `TRX-${10000 - i}`,
  itemName: `${['Camera', 'Scarf', 'Boots', 'Lens', 'Watch'][i % 5]} - #${i + 1}`,
  buyerName: `user_${i}`,
  price: `¥${(Math.floor(Math.random() * 50) + 5) * 1000}`,
  date: 'Oct 24, 2024',
  status: ['Awaiting Shipment', 'In Transit', 'Completed', 'Dispute'][i % 4] as Transaction['status'],
  image: `https://picsum.photos/seed/${i + 100}/200/200`
}));

export const SALES_DISTRIBUTION: SalesData[] = [
  { name: 'Electronics', value: 40 },
  { name: 'Fashion', value: 35 },
  { name: 'Home', value: 15 },
  { name: 'Others', value: 10 },
];

export const TURNOVER_DATA = [
  { name: 'Jun', value: 45 },
  { name: 'Jul', value: 55 },
  { name: 'Aug', value: 60 },
  { name: 'Sep', value: 85 },
];
