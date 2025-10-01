# Employee & Admin Service Desk Portal

A polished Vite + React + JavaScript template that showcases an admin and employee workspace for service desk operations. The UI takes inspiration from contemporary SaaS dashboards and comes with demo data powered by an in-memory API layer so the experience works end-to-end without additional setup.

## Features

- ⚡️ **Vite + React** with React Router and Context APIs for state management.
- 🎨 **Bootstrap 5** & Bootstrap Icons for responsive layouts and a modern look.
- 👨‍💼 **Admin panel** with dashboard analytics, ticket overview, and collapsible team management tree.
- 👩‍💻 **Employee workspace** to review tickets and raise new requests from a guided form.
- 🔐 **Role-specific authentication** flows with dedicated URLs:
  - `/admin/auth/signin`
  - `/employee/auth/signin`
- 🔌 **Mock API client** that simulates authentication, ticketing, and team data, making it easy to replace with a real backend later.

## Getting started

```bash
npm install
npm run dev
```

The development server defaults to [http://localhost:5173](http://localhost:5173) and will automatically open in your browser.

### Demo credentials

Use the bundled demo accounts to explore both portals:

| Role      | Email               | Password    |
|-----------|---------------------|-------------|
| Admin     | `admin@desk.com`    | `admin123`  |
| Employee  | `employee@desk.com` | `employee123` |

### Project structure

```
ui/employee-admin-portal/
├── src/
│   ├── components/        # Layout, navigation, and reusable UI
│   ├── context/           # Auth & API providers
│   ├── pages/             # Admin, employee, and shared screens
│   ├── services/          # Mock API client (swap with real backend)
│   └── styles/            # Global styles
├── index.html
├── package.json
└── vite.config.js
```

## Customisation tips

- Replace `src/services/mockApi.js` with API calls to your backend; the rest of the app consumes a clean interface via `ApiContext`.
- Update colours, typography, or layout spacing in `src/styles/global.css` to align with your brand.
- Extend routing in `src/App.jsx` to add more admin or employee views (e.g., knowledge base, analytics).

## License

This template follows the same license as the parent project. Adapt and integrate freely within your service desk solutions.
