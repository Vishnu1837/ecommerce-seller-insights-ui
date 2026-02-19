# High-Performance C2C Seller Insights Dashboard

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Recharts](https://img.shields.io/badge/Recharts-22B573?style=for-the-badge&logo=databricks&logoColor=white)
![UI/UX](https://img.shields.io/badge/UI%2FUX-Design_First-blueviolet?style=for-the-badge)
![Performance](https://img.shields.io/badge/Performance-Virtual_Scrolling-orange?style=for-the-badge)

## Overview
This project is a frontend prototype of a "Seller Insights" dashboard, engineered specifically to handle the massive data density and scale required by top-tier Customer-to-Customer (C2C) marketplaces in Japan. 

Drawing on over four years of experience in digital marketing and social media strategy, this UI moves beyond a standard CRUD application. It is designed for high-volume power sellers, bridging the gap between raw e-commerce data and actionable business insights by prioritizing rendering performance, real-time UI states, and a premium visual hierarchy.

## ✨ Key Features & Technical Highlights

### 1. Main Seller Hub (Live Pulse)
* **Real-Time Data Simulation:** A highly responsive grid layout featuring live metric updates (Sales, Active Listings, Pending Shipments) simulating WebSocket streams.
* **Interactive Data Visualization:** Integrates `Recharts` for a buttery-smooth 30-day sales trend line graph, complete with custom frosted-glass tooltips for precise data hover states.

### 2. Transaction Management (DOM Optimization)
* **Virtual Scrolling Architecture:** Built to handle thousands of transaction rows without browser lag. Implements virtualized lists (rendering only the DOM nodes visible on the screen) to guarantee a flawless 60fps scrolling experience.
* **Complex UI States:** Features color-coded status badges and dynamic "loading skeleton" states to visually represent infinite scrolling and data fetching.

### 3. Inventory Health & Analytics
* **Marketing-Driven UI:** An "Action Required" widget that acts as an intelligent assistant. It flags specific inventory items (e.g., high views, zero offers) and suggests concrete optimization strategies (e.g., price drops, cover photo updates).
* **Category Breakdown:** A sleek, animated donut chart breaking down sales volume by product category to help sellers identify winning niches.

## 🛠️ Tech Stack & Architecture
* **Frontend Framework:** React.js
* **Data Visualization:** Recharts
* **Performance Optimization:** `react-window` / `@tanstack/react-virtual`
* **Styling:** CSS Grid & Flexbox (Dark Mode / Glassmorphism aesthetic)
* **Animation:** Framer Motion

## 🚀 Getting Started

To run this project locally and explore the UI components:

```bash
# 1. Clone the repository
git clone [https://github.com/yourusername/your-repo-name.git](https://github.com/yourusername/your-repo-name.git)

# 2. Navigate into the directory
cd your-repo-name

# 3. Install dependencies
npm install

# 4. Start the development server
npm start
