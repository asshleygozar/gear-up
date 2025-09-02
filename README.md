# GearUp

An organized and accesible financial manager dedicated to track personal finances such as money and investments. The goal of this application is to provide an organized and standard way of building financial wealth through organized financial management toward a financially-free future.

## Features

- **Easy money tracking**:

  - track personal finances such as cash and bank accounts
  - records income, expenses, and current balance for quick overview

- **Financial report**

  - generate monthly/yearly financial report in pdf format
  - structured and organized financial report format

- **Set goals**

  - provides comprehensive and structured saving page for future goals

- **Budget setting**

  - limit expense spending with budgeting constraint

- **Data visualization**

  - Bar chart
  - Line chart
  - Pie chart

## Technology Stack

- **Frontend**

  - Next.js 15
  - React
  - Typescipt
  - Tailwind
  - Lucide icon (For icons)
  - Shadcn/ui Components
  - Recharts (For data visualization)

- **Backend**

  - Next.js API route
  - Zod (For form data validation)
  - Prisma (For ORM)
  - Postgresql (For data persistence)

- **Resources and API**

  - [date-fns](https://github.com/date-fns/date-fns) for date formatting

## Prerequisites

- Node.js >= 22.14.0
- Postgresql installed locally or via docker

## Installation and Setup

- **Install dependencies**

  ```
    # Clone the repository
    git clone https://github.com/asshleygozar/gear-up.git

    # Go to the project directory
    cd gear-up

    # Install dependencies
    npm install
  ```

- **Set up local database**

  - use postgresql for local database

- **Change environment variables**

  ```
    DATABASE_URL=<postgresql://user/:password@localhost:5432/dbname>
    JWT_SECRET_TOKEN=<your-own-jwt-token>
  ```

- **Generate prisma schema**

  ```
    # For initializing prisma schema with env config
    npx prisma init

    # Migrate current database model to your local database
    npx prisma migrate dev --name init
  ```

- **Run the application**

  ```
    # Run nextjs application
    npm run dev
  ```

## Directory Structure

```
project-root/
├── app
|  ├── (auth)
|  |  ├── signin
|  |  └── signup
|  ├── (marketing)
|  |  ├── about
|  |  ├── layout.tsx
|  |  └── page.tsx
|  ├── dashboard
|  |  ├── accounts
|  |  ├── investments
|  |  ├── layout.tsx
|  |  ├── page.tsx
|  |  └── settings
|  ├── favicon.ico
|  ├── globals.css
|  └── layout.tsx
├── components
|  ├── Brand.tsx
|  ├── CreateAccountModal.tsx
|  ├── LeftSidebar.tsx
|  ├── MainModal.tsx
|  ├── ModalNavigation.tsx
|  ├── NewTransactionModal.tsx
|  ├── RightSideBar.tsx
|  └── ui
|     ├── button.tsx
|     ├── card-chart.tsx
|     ├── card.tsx
|     ├── chart.tsx
|     ├── Form.tsx
|     ├── Icons.tsx
|     ├── input.tsx
|     ├── ModalNavButton.tsx
|     ├── Navbutton.tsx
|     ├── separator.tsx
|     ├── sheet.tsx
|     ├── sidebar.tsx
|     ├── skeleton.tsx
|     ├── table.tsx
|     └── tooltip.tsx
├── components.json
├── context
|  ├── useNavigation.tsx
|  └── useStorage.tsx
├── controller
|  └── auth.ts
├── docs
|  ├── api.md
|  └── database.md
├── eslint.config.mjs
├── hooks
|  └── use-mobile.ts
├── lib
|  ├── generated
|  |  └── prisma
|  ├── session.ts
|  └── utils.ts
├── model
|  └── user.ts
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── prisma
|  ├── migrations
|  |  ├── 20250819075849_prisma_update
|  |  └── migration_lock.toml
|  └── schema.prisma
├── public
|  ├── file.svg
|  ├── globe.svg
|  ├── next.svg
|  ├── vercel.svg
|  └── window.svg
├── README.md
├── styles
|  ├── accounts.module.css
|  ├── components
|  |  ├── left-side-bar.module.css
|  |  ├── main-modal.module.css
|  |  ├── modal-navigation.module.css
|  |  ├── modal.module.css
|  |  ├── right-side-bar.module.css
|  |  └── ui
|  └── create-account.module.css
├── test
├── tsconfig.json
├── utils
|  └── accounts.ts
└── vitest.config.mts
```

© Asshley Gozar All rights reserved
