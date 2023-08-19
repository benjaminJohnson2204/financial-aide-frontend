# Financial Aide Front End

This is the front end for a budgeting website tool I built. It is hosted on Vercel at https://financial-aide-frontend.vercel.app/.

There is a separate back end repository, hosted on a separate domain. Its code can be found at https://github.com/benjaminJohnson2204/FinancialAideBackend.

## Tech Stack

I used React, Next.js, TypeScript, and MaterialUI for the front end.

## How to Run

Before running the project, you must acquire the necessary environment variables (currently, only the location of the back end). See `.env.example` for an example you can use to create your own environment variables.

Local development:

1. Install dependencies: `npm install --force`
2. Run development server: `npm run dev`

Production deployment:

1. Install dependencies: `npm install --force`
2. Build: `npm run build`
3. Start: `npm run start`

## Major Features

- Users can create, view, edit, and delete budgets. A budget is a specific amount of money allocated for a certain time period. Budgets can be yearly, monthly, or weekly.
- Users can assign multiple categories (food, rent, gas, etc.) to each budget. Then can then budget a certain amount of money, or percentage of the budget, to each category.
- Users can create, view, edit, and delete expenses. An expense is something the user spent a certain amount of money on, on a certain date. Every expense falls under a category, allowing users to see how much they spent in total on each category throughout a budget.
- Users can compare their planned spending (how much they allocated to each category of their budget) to their actual spending (how much they spent on expenses of that category). There is a table view, as well as a bar chart and side-by-side pie charts.
- Users can export their data (list of expenses, and planned vs. actual expenses by category) to CSV files to analyze and/or save it.
- Users can create an account and sign in before doing all of the above features. Budgets, categories, and expenses are saved to a user's account, so only they can view them.
