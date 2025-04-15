#  EcoTrack Admin

A React + Vite-powered admin dashboard for managing users, news, and monitoring smart energy data for EcoTrack. Built with Tailwind CSS, Recharts, and Axios.
(asis)

---

##  Tech

-  **React** (Vite)
-  **Tailwind CSS**
-  **Recharts** – for bar chart visualization
-  **Axios** – for API calls
-  **React Router DOM** – for routing

---

##  Getting Started

### 1. **Clone the repository**

```bash
git clone https://github.com/EcoTrack-projectSMISKIs/EcoTrack-Admin-webside.git
cd EcoTrack-Admin-webside
```

### 2. **Install dependencies**

```bash
npm install
```

This will install all required packages including:
- `tailwindcss`
- `postcss`
- `autoprefixer`
- `recharts`
- `axios`
- `react-router-dom`

---

##  Development

To run the app locally:

```bash
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173)

---

## ⚙ Tailwind CSS Setup

Tailwind is already configured in:

- `tailwind.config.js`
- `postcss.config.js`
- `src/index.css`

You can start using utility classes immediately across your JSX files.

---

##  Recharts Usage

We use Recharts for visualizing simple analytics in the Dashboard page:

```jsx
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
```

---

##  Authentication

Admin login is handled via JWT token:
- Stored in `localStorage`
- Sent via `Authorization` headers in requests

---

##  Folder Structure

```
src/
├── assets/          # static images, logos
├── components/      # reusable UI components (Sidebar, SectionWrapper, etc.)
├── pages/           # route pages (Dashboard, Users, News, Settings, Login)
├── index.css        # Tailwind directives
├── main.jsx         # entry point
```

---

##  Features

-  Admin user login with token-based auth
-  User management with inline edit/delete
-  News management with create/edit/delete
-  Dashboard with live chart data
-  Fully responsive and built with Tailwind CSS

---

## 💡 Credits

Built by the EcoTrack Backend Team.

---

## 📜 License

This project is licensed under [MIT](LICENSE).
