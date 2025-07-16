# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `pnpm dev` or `npm run dev` - Start development server with Turbopack (faster builds)
- `pnpm build` or `npm run build` - Build production bundle
- `pnpm start` or `npm run start` - Start production server
- `pnpm lint` or `npm run lint` - Run ESLint for code quality checks

## Project Architecture

This is a Next.js 15 application using the App Router with TypeScript and Tailwind CSS.

### Technology Stack
- **Framework**: Next.js 15.4.1 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4 with CSS variables
- **UI Components**: Configured for shadcn/ui components with Lucide React icons
- **Fonts**: Geist Sans and Geist Mono via next/font

### Project Structure
- `app/` - Next.js App Router pages and layouts
  - `layout.tsx` - Root layout with font configuration
  - `page.tsx` - Home page component
  - `globals.css` - Global styles and Tailwind directives
- `lib/` - Shared utilities
  - `utils.ts` - Contains `cn()` utility for conditional class merging (clsx + tailwind-merge)
- `components/` - Reusable React components (configured for shadcn/ui)
- `public/` - Static assets

### Configuration Files
- `components.json` - shadcn/ui configuration with "new-york" style and path aliases
- `tsconfig.json` - TypeScript config with `@/*` path alias mapping to root
- `eslint.config.mjs` - ESLint with Next.js core-web-vitals and TypeScript rules
- `next.config.ts` - Next.js configuration (currently minimal)

### Code Conventions
- Uses shadcn/ui component patterns with class-variance-authority for component variants
- Path aliases: `@/components`, `@/lib/utils`, `@/components/ui`, etc.
- Tailwind utility-first CSS with the `cn()` helper for conditional classes
- TypeScript strict mode enabled