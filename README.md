# 1Fi Marketplace Implementation

This is the implementation of the 1Fi Marketplace as per the SDE Intern Assignment. It is built as a standalone frontend application but uses the publicly observable 1Fi experience as the visual reference and recreates its design language through reusable components and local design tokens.

## Setup & Run

1. Make sure you have Node.js installed.
2. Run `npm install` to install dependencies.
3. Run `npm run dev` to start the Vite development server.

## Architecture

- **`src/components/layout/`**: Contains shared layout components like `MarketplaceHeader` and `BottomNavigation`.
- **`src/components/marketplace/`**: Reusable components specific to the marketplace (e.g., `ProductCard`, `ProductGrid`).
- **`src/pages/`**: Screen-level components mapped to routes (`Shop`, `ProductDetails`, `EmiSelection`, `Checkout`).
- **`src/services/`**: Mock API layer `marketplaceApi.js` to simulate asynchronous data fetching and eligibility checks.
- **`src/data/`**: Static mock JSON data for products and EMI plans.

## Assumptions & Limitations

- **Mock Data**: Due to the lack of an existing backend, products, variants, and EMI plans are mocked in `src/data/`.
- **Eligibility Simulation**: The final checkout step simulates an eligibility check that takes 1.2 seconds and has an 80% success rate to demonstrate state management (checking, eligible, error).
- **TypeScript**: The prompt originally asked for TypeScript, but the implementation was done using vanilla JavaScript (`.jsx`) as per the user's specific request ("do not use typeScript").
- **Styling**: Uses Tailwind CSS v4 configured with the extracted 1Fi design tokens (colors, fonts, borders).

## Responsive Strategy

The application is built **mobile-first**, matching the existing 1Fi feel. Tailwind's standard breakpoints will allow it to stretch on tablet and desktop, but the layout remains optimal for mobile screens (e.g., max 480px width containers would be best for production).
