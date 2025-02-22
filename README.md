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



## Common Folder Structure & Guidelines

```plaintext
📂 src
 ┣ 📂 assets           # Stores static assets (icons, images, etc.)
 ┃ ┣ 📂 icons         # SVGs and icons
 ┃ ┗ 📂 images        # Static images
 ┃
 ┣ 📂 components       # Reusable global UI components
 ┃ ┣ 📂 Buttons      # Button components (e.g., IconButton, PrimaryButton)
 ┃ ┣ 📂 Shared       # Common components (e.g., Navbar, Footer, Modal)
 ┃ ┗ 📂 Forms        # Form elements (e.g., InputField, Checkbox)
 ┃
 ┣ 📂 pages           # All page components
 ┃ ┣ 📜 HomePage.jsx  
 ┃ ┗ 📜 NotFound.jsx  
 ┃
 ┣ 📂 [feature-name]       # Feature-specific folder (e.g., shop, user)
 ┃ ┣ 📂 components   # UI components specific to this feature
 ┃ ┣ 📂 pages        # Pages related to this feature
 ┃ ┣ 📂 data         # Static or mock data (e.g., product lists)
 ┃ ┣ 📂 services     # API calls, Firebase, or business logic for this feature
 ┃ ┗ 📜 index.jsx    # Entry file for the feature
 ┃
 ┣ 📂 services         # API services and Firebase functions
 ┃ ┣ 📜 api.js        # General API calls
 ┃ ┗ 📜 auth.js       # Authentication services
 ┃
 ┣ 📂 utils            # Utility functions/helpers
 ┃ ┗ 📜 formatDate.js  # Example: date formatter
 ┃
 ┣ 📜 App.jsx          # Main application component
 ┣ 📜 main.jsx         # Entry point for rendering the app
 ┗ 📜 index.css        # Global styles
```

---

## What to Add in Each Folder?

### 📂 `assets/`  
- **icons/** → SVG icons  
- **images/** → Static images  

### 📂 `components/`  
- **Buttons/** → Buttons (PrimaryButton, IconButton)  
- **Shared/** → Common UI components (Navbar, Footer, Modal)  
- **Forms/** → Form inputs, text fields, dropdowns  

### 📂 `pages/`  
- Global pages (e.g., `HomePage.jsx`, `NotFound.jsx`)  

### 📂 `[feature-name]/` (e.g., `shop/`, `user/`)  
- **components/** → UI components for that feature  
- **pages/** → Pages related to the feature  
- **data/** → Mock/static data files  
- **services/** → API calls and business logic  
- **index.jsx** → Main entry file for the feature  

### 📂 `services/`  
- API handling and Firebase functions  

### 📂 `utils/`  
- Helper functions (e.g., date formatting, number conversions)  



