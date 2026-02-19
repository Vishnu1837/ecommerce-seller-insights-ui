
export enum View {
  Home = 'Home',
  Listings = 'Listings',
  Orders = 'Orders',
  Messages = 'Messages',
  Analytics = 'Analytics',
}

export interface Metric {
  label: string;
  value: string | number;
  change?: string;
  trend: 'up' | 'down' | 'neutral';
  type: 'sales' | 'listings' | 'ship' | 'messages';
}

export interface ActivityItem {
  id: string;
  type: 'sale' | 'offer' | 'expiring';
  title: string;
  subtitle: string;
  value?: string;
  time: string;
  isNew?: boolean;
}

export interface DashboardAlert {
  id: string;
  type: 'inventory' | 'shipping' | 'payment';
  message: string;
  actionLabel: string;
  priority: 'high' | 'medium' | 'low';
}

export interface Transaction {
  id: string;
  itemName: string;
  buyerName: string;
  price: string;
  date: string;
  status: 'Awaiting Shipment' | 'In Transit' | 'Completed' | 'Dispute';
  image: string;
}

export interface SalesData {
  name: string;
  value: number;
}

export interface AIInsight {
  title: string;
  content: string;
  confidence: number;
}
