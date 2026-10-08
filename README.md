# Nitesh Singh - Personal Portfolio & Engineering Hub

Modern, responsive, and accessible personal portfolio website built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **Lucide React**. 

Pre-configured with real personal and academic information (B.Tech in Computer Science & Engineering Core at **JECRC University, Jaipur**), full-stack development competencies, and Data Structures & Algorithms (DSA) problem-solving focus.

Dual-deployment ready for **Vercel** and **GitHub Pages** out of the box.

---

## 🚀 Tech Stack & Features

- **Framework:** Next.js 14 (App Router) + TypeScript
- **Styling:** Tailwind CSS with custom color palette and glassmorphism
- **Theme Support:** Dark / Light theme toggle with `next-themes` (system preference detection, no layout flash)
- **Animations:** Framer Motion for scroll-triggered reveals, micro-interactions, and animated tabs
- **Icons:** Lucide React
- **Static Export:** Configured with `output: 'export'` for GitHub Pages and high-speed Vercel static serving
- **Automated CI/CD:** GitHub Actions workflow included for automated GitHub Pages deployment

---

## 📁 Project Structure

```text
├── .github/
│   └── workflows/
│       └── deploy.yml          # Automated GitHub Pages CI/CD workflow
├── app/
│   ├── globals.css             # Tailwind directives & CSS custom properties
│   ├── layout.tsx              # Root layout with SEO metadata & theme provider
│   └── page.tsx                # Page composition (Hero, About, Skills, Projects, Contact, Footer)
├── components/
│   ├── About.tsx               # Narrative, academic context, and JECRC University timeline
│   ├── Contact.tsx             # Contact form with copy-email & mailto fallback
│   ├── Footer.tsx              # Modern footer with quick links & copyright
│   ├── Hero.tsx                # Introduction, university badge, CTA buttons, terminal card
│   ├── Navbar.tsx              # Sticky blur navbar with section spy & mobile drawer
│   ├── Projects.tsx            # Filterable project showcase cards with demo & GitHub links
│   ├── Skills.tsx              # Categorized skills grid with level indicators
│   ├── ThemeProvider.tsx       # next-themes client wrapper
│   └── ThemeToggle.tsx         # Dark/light theme switch button
├── data/
│   └── portfolio.ts            # Centralized portfolio data (Update all personal details here)
├── next.config.mjs             # Next.js configuration with static export
├── tailwind.config.ts          # Tailwind theme customization
└── tsconfig.json               # TypeScript configuration
```

---

## 🛠️ Local Development

### 1. Prerequisites
Ensure you have **Node.js (v18 or higher)** and **npm** installed.

### 2. Clone and Install Dependencies
```bash
git clone https://github.com/your-username/nitesh-singh-portfolio.git
cd "nitesh-singh-portfolio"
npm install
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view your live portfolio.

### 4. Build Static Site
To create an optimized production build (static HTML export in `/out`):
```bash
npm run build
```

---

## ✏️ Customizing Your Information

All personal details, institution info, links, skills, and projects are centralized in a single file:

👉 **[`data/portfolio.ts`](data/portfolio.ts)**

Open that file to update:
- **`personal.name`**: Your name
- **`personal.institution`**: College / University (`JECRC University, Jaipur`)
- **`personal.branch`**: Branch (`Computer Science & Engineering - Core`)
- **`personal.email`**: Your contact email
- **`personal.socials`**: Links to your GitHub, LinkedIn, and Twitter/X profiles
- **`skills`**: Add, reorder, or update your technical skills and proficiency badges
- **`projects`**: Add your custom project titles, descriptions, live demo links, and GitHub repository links

---

## 🌐 Deployment Instructions

### Option A: Deploying to Vercel (Recommended)

Deploying to Vercel is instantaneous and requires zero configuration:

1. Push your code to your GitHub repository:
   ```bash
   git add .
   git commit -m "feat: initial portfolio release"
   git push origin main
   ```
2. Go to [Vercel](https://vercel.com) and log in with GitHub.
3. Click **"Add New..."** -> **"Project"**.
4. Import your portfolio repository.
5. Vercel will automatically detect **Next.js**.
6. Click **Deploy**. Vercel will build and assign you a fast, production URL (with automatic SSL and custom domain support).

---

### Option B: Deploying to GitHub Pages (Automated via GitHub Actions)

The repository includes a ready-to-use GitHub Actions workflow at [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "feat: setup portfolio with github pages workflow"
   git push origin main
   ```
2. In your GitHub repository:
   - Go to **Settings** -> **Pages**.
   - Under **Build and deployment** -> **Source**, select **GitHub Actions**.
3. Push to `main` or go to the **Actions** tab to run the workflow manually via **"Run workflow"**.
4. The workflow will automatically:
   - Configure basePath for project repositories (e.g. `https://<username>.github.io/<repo-name>/`)
   - Run `npm run build` to generate static files in `/out`
   - Deploy the static artifact to GitHub Pages
5. Once complete, your site will be live at:
   - `https://<your-username>.github.io/<repository-name>/` (Project Page)
   - Or `https://<your-username>.github.io/` (User Page)

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
