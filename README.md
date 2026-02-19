# Seller Hub - Kaito

A high-performance, React-based dashboard designed for C2C e-commerce sellers. This application provides real-time insights, efficient transaction management, and AI-driven recommendations to help sellers optimize their business.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Gemini AI](https://img.shields.io/badge/Gemini_AI-8E75B2?style=for-the-badge&logo=google-bard&logoColor=white)

## ✨ Key Features

### 1. Interactive Dashboard (Live Pulse)
- **Real-Time Simulation:** Simulates live sales data and activity feeds (New Sales, Offers) to provide a dynamic "pulse" of the business.
- **Data Visualization:** Interactive area charts using `Recharts` to visualize 30-day sales trends with custom tooltips.
- **AI-Powered Insights:** Integrates **Google Gemini API** to analyze current metrics and generate actionable growth strategies for the seller.

### 2. efficient Transaction Management
- **Custom Virtual Scrolling:** Implements a custom virtual list architecture to handle thousands of transaction rows with 60fps scrolling performance, preventing DOM bloat.
- **Advanced Filtering:** Client-side search and filtering capabilities by ID, Item Name, or Buyer.

### 3. Modern UI/UX
- **Dark Mode Support:** Fully responsive dark/light mode toggle with persistent state.
- **Responsive Design:** Optimized layouts for both desktop dashboards and mobile quick-views.
- **Glassmorphism & Gradients:** Uses a modern aesthetic with subtle gradients and glass-morphism effects.

## 🛠️ Tech Stack

- **Frontend Framework:** React 19
- **Build Tool:** Vite
- **Styling:** Tailwind CSS (via CDN for rapid prototyping)
- **Routing:** React Router DOM
- **Data Visualization:** Recharts
- **AI Integration:** Google GenAI SDK (`@google/genai`)
- **Icons:** Google Material Symbols

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Vishnu1837/ecommerce-seller-insights-ui.git
   cd ecommerce-seller-insights-ui
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   To use the AI features, you need a Google Gemini API key.
   Create a `.env` file in the root directory and add:
   ```env
   API_KEY=your_google_gemini_api_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open in Browser**
   Navigate to `http://localhost:5173` to view the application.

## 📂 Project Structure

```
ecommerce-seller-insights-ui/
├── components/          # React components
│   ├── HomeDashboard.tsx    # Main dashboard with charts & AI
│   ├── TransactionList.tsx  # Virtualized transaction list
│   ├── InventoryHealth.tsx  # Inventory analytics
│   ├── Sidebar.tsx          # Navigation sidebar
│   ├── Header.tsx           # Top navigation and theme toggle
│   └── BottomNav.tsx        # Mobile navigation
├── constants.ts         # Mock data and configuration
├── types.ts             # TypeScript interfaces
├── App.tsx              # Main application entry and routing
├── index.html           # HTML entry point (Tailwind CDN)
└── vite.config.ts       # Vite configuration
```

## ⚠️ Note on Rendering vs Real Data
This project is a **UI Prototype**. While the AI integration works with a real API key, the sales data and transaction history are currently simulated using mock data (`constants.ts`) to demonstrate the UI capabilities and performance optimizations.
