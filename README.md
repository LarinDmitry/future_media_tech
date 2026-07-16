# DISPATCH — Message Board

A modern, high-performance message board application built with Next.js 16, React 19, and Redux Toolkit, styled with Tailwind CSS v4.

---

## Live Demo

You can check out the live application here: [App](https://larindmitry.github.io/future_media_tech/)

---

## Quick Start & Setup

Follow these steps to run the application locally.

### 1. Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18.x or higher) and `npm` (or `yarn`/`pnpm`) installed.

### 2. Installation
Clone the repository and install the dependencies:
```bash
# Navigate to the project folder
cd future_media_tech

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open http://localhost:3000 in your browser to see the application.

### 3. Running Tests
The project uses Vitest + React Testing Library for lightning-fast unit and snapshot testing.
```bash
# Run tests in watch mode
npm run test

# Run tests once (e.g., for CI pipelines)
npm run test:run
```

## Credentials for entering

Without a login you will have a guest title (if you try to go by link for a feed page).

```
john@dispatch.dev  123456
dima@dispatch.dev  777777
test@dispatch.dev  654321
```

## Folder Structure
The project follows a Feature-Based / Domain-Driven directory structure.

```
src/
├── app/                        # Next.js App Router root
│   ├── components/
│   │   └── BaseComponents/     # Globally reusable atomic UI components
│   │       └── BaseInput/      # Self-contained Input with styles, types, and tests
│   │           ├── __snapshots__/
│   │           ├── BaseInput.tsx
│   │           ├── BaseInput.test.tsx
│   │           ├── index.ts
│   │           └── types.ts
│   ├── feed/                   # Feed Feature Module (co-located layout/page & components)
│   │   ├── components/         # Local components only used within the feed
│   │   │   ├── FeedList.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── MessageCard.tsx
│   │   │   ├── PostForm.tsx
│   │   │   └── Sidebar.tsx
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── utils.ts
└── store/                      # Global State Management (Redux Toolkit)
    ├── features/               # Redux slices (e.g., messages/feed slice)
    ├── hook.ts                 # Typed Redux hooks (useAppDispatch, useAppSelector)
    ├── store.ts                # Redux store configuration
    └── StoreProvider.tsx       # Client-side wrapper for Redux integration in Next.js
```

## Future Roadmap & Suggestions
1. Enhanced Testing
   * Integration Tests: Implement Cypress to run end-to-end (E2E) tests simulating real user flows
   * Extended Unit Testing: Expand Vitest coverage across all components, slices, and pages
2. Server-Side Features
   * Transition mock static messaging and users states to API Routes (now it works in redux state without a page refresh)
3. Time tracker
   * For editing messages can be updated publish time (now just fixed first publish) and ordering message
