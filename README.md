# Greenie Web Application

## Description

Greenie Web Application is an eco-friendly platform designed to promote sustainability through challenges, gamification, and community engagement.

## Technologies Used

- ReactJS + TailwindCSS
- Node.js v22.x
- GitHub Actions for CI

## Setup and Installation

### Prerequisites

- Node.js v22.x
- npm (Node package manager)

### Steps to Set Up

1. Clone the repository

   ```bash
   git clone https://github.com/dizzpy/Greenie-Web.git
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Run the development server
   ```bash
   npm run dev
   ```

### Running in Production

1. Build the project

   ```bash
   npm run build
   ```

2. Start the production server
   ```bash
   npm run start
   ```

## Contributing

1. Fork the repository.
2. Create a new branch: `git checkout -b feat/your-feature-branch`.
3. Make your changes.
4. Commit your changes: `git commit -m "feat: Add feature description"`.
5. Push to your branch: `git push origin your-feature-branch`.
6. Create a pull request to merge your changes into the main branch.

## CI/CD

We use GitHub Actions for continuous integration. The project is built on every pull request. Once merged, Vercel automatically deploys the updated project.

## Folder Structure

```
📂 project-root
┣ 📂 src
┃ ┣ 📂 assets            # Images, icons, fonts
┃ ┣ 📂 components        # Reusable UI components (Navbar, Button, etc.)
┃ ┃ ┣ 📂 common          # Shared UI components (Button, Modal, etc.)
┃ ┃ ┣ 📂 layout          # Navbar, Sidebar, Footer
┃ ┣ 📂 pages             # Main pages/screens
┃ ┃ ┣ 📂 auth            # Login, Register, Forgot Password
┃ ┃ ┣ 📂 feed            # User feed, posts, comments
┃ ┃ ┣ 📂 challenges      # Challenge listing, details
┃ ┃ ┣ 📂 leaderboard     # Leaderboard, rankings
┃ ┃ ┣ 📂 shop            # Store, Cart, Checkout, Redeem points
┃ ┃ ┣ 📂 settings        # User settings, profile
┃ ┃ ┗ 📜 NotFound.jsx    # 404 Page
┃ ┣ 📂 services          # API calls (REST API)
┃ ┃ ┣ 📜 authService.js  # Authentication API
┃ ┃ ┣ 📜 challengeService.js # Challenges API
┃ ┃ ┣ 📜 leaderboardService.js # Leaderboard API
┃ ┃ ┣ 📜 shopService.js  # E-commerce API
┃ ┃ ┗ 📜 userService.js  # Profile API
┃ ┣ 📂 store             # Global state management (Redux/Zustand)
┃ ┣ 📂 utils             # Helper functions, constants
┃ ┣ 📂 routes            # React Router configuration
┃ ┣ 📜 App.jsx           # Main App Component
┃ ┣ 📜 main.jsx          # ReactDOM render file
┃ ┗ 📜 index.css         # Global styles
┣ 📜 .gitignore
┣ 📜 README.md
┣ 📜 package.json
┗ 📜 tailwind.config.js

```
