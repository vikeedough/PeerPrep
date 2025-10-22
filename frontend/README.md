# PeerPrep Frontend

This is the **frontend** for the project, built using [Next.js](https://nextjs.org) and bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).  
It provides the user interface and communicates with the backend API to display and manage data.

---

## Overview

This frontend is structured using the **App Router** (`/app` directory) and leverages **TypeScript**, **Tailwind CSS**, and **React hooks** for UI and state management.

The layout and navigation are defined in `app/layout.tsx`, while the main page content resides in `app/page.tsx`.

---

## 🚀 Getting Started

### 1️⃣ Prerequisites

Make sure you have the following installed:

- **Node.js** ≥ 18
- **npm**, **yarn**, **pnpm**, or **bun**

### 2️⃣ Installation

Clone the repository and install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

# Running the Development Server
Start the local dev server with the following command
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
By default, the app runs on http://localhost:4000 on your browser. If you want to change the port number, update this line
```json
"dev": "next dev --port 4000 --turbopack"
```
located at package.json.

# Tech Stack
- Next.js 14+
- React 18+
- TypeScript
- Tailwind CSS
- Axios (for API calls)
- ESLint + Prettier (for linting and formatting)
