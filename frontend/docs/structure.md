# Project Structure

This is the official project structure documentation of gear up.

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
