# Interview Dashboard

A modern Next.js dashboard application for managing student interviews with authentication, data visualization, and feedback management.

## ✨ Features

- **Authentication System**: Secure login with token-based authentication
- **Dashboard**: Interactive charts and KPI cards with data visualization
- **Student Management**: View, search, and manage student profiles
- **Feedback System**: Submit and manage interview feedback
- **Responsive Design**: Mobile-friendly interface with modern UI components
## 🛠 Tech Stack

- **Framework**: Next.js 15.5.5 with App Router
- **Language**: TypeScript
- **Styling**: SCSS + Tailwind CSS
- **Charts**: Chart.js with React Chart.js 2
- **UI Components**: Radix UI primitives
- **Form Handling**: Formik with Yup validation
- **Icons**: Lucide React

## 🔧 Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api

# Optional: Add other environment variables as needed
# NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Required Environment Variables:**
- `NEXT_PUBLIC_API_BASE_URL`: Base URL for your backend API endpoints

## 📦 Installation & Setup

### Prerequisites
- Node.js (version 18 or higher)
- npm, yarn, pnpm, or bun package manager

### Step-by-step Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd interview
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables**
   ```bash
   # Create environment file
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Verify installation**
   ```bash
   npm run lint
   ```

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

The application will start on [http://localhost:3000](http://localhost:3000)

### Production Build
```bash
# Build the application
npm run build

# Start production server
npm run start
```

### Development Features
- **Turbopack**: Enabled for faster development builds
- **Hot Reload**: Automatic page refresh on file changes
- **TypeScript**: Full type checking and IntelliSense support

## 📁 Project Structure

The project follows a co-located file structure where components and their styles are kept in the same folder:

```
interview/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   └── auth/login/           # Authentication endpoints
│   ├── dashboard/                # Dashboard page
│   │   ├── page.tsx              # Dashboard component
│   │   └── dashboard.module.scss # Dashboard styles
│   ├── login/                    # Login page
│   │   ├── page.tsx              # Login component
│   │   └── login.scss            # Login styles
│   ├── students/                 # Student management
│   │   ├── page.tsx              # Students list
│   │   ├── [id]/                 # Dynamic student details
│   │   │   ├── page.tsx          # Student detail page
│   │   │   ├── studentDetails.module.scss
│   │   │   └── FeedbackForm/     # Feedback component
│   │   └── types/                # Type definitions
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
│
├── components/                   # Reusable components
│   ├── common/                   # Shared components
│   │   ├── InfoCard.tsx          # Card component
│   │   └── InfoCard.module.scss  # Card styles
│   ├── dashboardComponent/       # Dashboard-specific components
│   │   ├── BarChart/            # Bar chart component
│   │   ├── LineChart/           # Line chart component
│   │   └── KPICards/            # KPI cards component
│   ├── loginPageComponent/       # Login page components
│   ├── sidebar/                  # Sidebar navigation
│   ├── studentDetails/          # Student detail components
│   └── ui/                      # UI primitives (shadcn/ui)
│
├── lib/                         # Utility functions
│   ├── useAuth.ts               # Authentication hook
│   ├── useDebounce.ts           # Debounce hook
│   └── utils.ts                 # General utilities
│
├── public/                      # Static assets
│   ├── icons/                   # SVG icons
│   ├── images/                  # Images
│   └── fonts/                   # Custom fonts
│
├── tempData.ts                  # Temporary data for development
└── Configuration files...
```

### File Organization Philosophy
- **Co-location**: Components and their styles are in the same folder
- **Feature-based**: Related functionality grouped together
- **Type Safety**: TypeScript definitions alongside components
- **Modular SCSS**: Component-specific styling with CSS modules

## 📚 Libraries Used

### Core Dependencies
- **Next.js** (15.5.5): React framework with App Router
- **React** (19.1.0): UI library
- **TypeScript** (^5): Type safety and development experience
- **Sass** (^1.93.2): SCSS preprocessing

### UI & Styling
- **Tailwind CSS** (^4): Utility-first CSS framework
- **shadcn/ui**: Copy-paste component library built on Radix UI and Tailwind CSS
- **lucide-react** (^0.545.0): Icon library

### Charts & Data Visualization
- **chart.js** (^4.5.1): Chart library
- **react-chartjs-2** (^5.3.0): React wrapper for Chart.js

### Form Handling
- **formik** (^2.4.6): Form library


### Development Tools
- **@tailwindcss/postcss** (^4): PostCSS integration
- **tw-animate-css** (^1.4.0): Animation utilities

## 📜 Available Scripts

**add this in env**
NEXT_PUBLIC_API_BASE_URL=https://dummyjson.com

