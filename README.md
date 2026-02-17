# VeeBran Website - "Beyond the Horizon" ($0 Budget Execution Strategy)

This project is a next-generation business consulting website designed to surpass industry standards with advanced interactivity, 3D particle systems, and a premium "Nature Meets Technology" aesthetic.

## 🚀 Live Features & Highlights

### 🎨 Visual Overhaul (Nature Meets Technology)
- **Global Particle System**: A high-performance, scroll-reactive 3D particle background (`ParticleBackground`) that morphs shapes (Circle -> Square -> Diamond -> DNA -> Spiral) as you navigate.
- **Glassmorphism Design**: Consistent, premium frosted-glass UI cards for Services, Projects, and Team profiles.
- **Neon Accents**: Strategic use of brand colors (Green, Blue, Neon, Yellow) to guide user attention.

### 🧩 Interactive Components
- **Service Cards**: Hover-responsive cards that expand into detailed modals revealing methodology and tools.
- **Project Cards**: Portfolio items that open into full-screen case study details with challenge/solution breakdowns.
- **Team Cards**: Leadership profiles with expandable bios and skill tags.
- **Stats Counter**: Scroll-triggered animated statistics on the Home page.
- **Before/After Slider**: Interactive comparison tool for case study transformations.

### 🤖 AI Strategy Assistant (Demo)
- **Live Demo**: A functional "AI Strategy Assistant" at `/demo`.
- **Real-time Generation**: Integrates with OpenRouter API (using `arcee-ai/trinity-large-preview`) to generate strategic insights based on user input.
- **Visualization**: Features a "processing" particle animation during AI generation.

---

## 📅 Project Roadmap & Status

### ✅ Phase 1: MVP Core (Completed)
- [x] **Home Page**: Hero section, Animated Stats, Value Proposition.
- [x] **Services Page**: Interactive Grid of `ServiceCards`.
- [x] **Company Page**: Leadership Team with `TeamCards`.
- [x] **Contact Page**: Functional Contact Form (Formspree) & Map.

### ✅ Phase 2: Enhancements (Completed)
- [x] **Visual Polish**: Global application of `ParticleBackground` and Glassmorphism.
- [x] **Work Page**: Filterable Project Grid with `ProjectCards`.
- [x] **Interactive Components**: `BeforeAfterSlider`, `StatsCounter`.
- [x] **SEO**: OpenGraph metadata and JSON-LD structured data.

### 🚧 Phase 3: Advanced Integrations (Ready / In Progress)
- [x] **Payload CMS Setup**: Configuration, Collections (Users, Projects, Team, Services) created.
- [x] **CMS Frontend Integration**: Data fetching logic ready (currently using simulated data).
- [ ] **CMS Deployment**: Enable `withPayload` in `next.config.mjs` (Currently disabled for static build stability).
- [x] **AI Integration**: Real-time AI generation implemented in Demo page.

---

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS, PostCSS
- **Animation**: Framer Motion, GSAP
- **3D Graphics**: React Three Fiber, Three.js, Drei
- **CMS**: Payload CMS 3.0 (Beta)
- **AI**: OpenRouter API, OpenAI SDK
- **Icons**: Lucide React, React Icons

---

## 🚀 Setup Instructions

1.  **Install Dependencies**:
    ```bash
    npm install --legacy-peer-deps
    # Note: --legacy-peer-deps is required due to React 19/18 peer dependency conflicts with some UI libraries
    ```

2.  **Environment Variables**:
    Create a `.env` file with the following (if using AI/CMS features):
    ```env
    OPENROUTER_API_KEY=your_key_here
    PAYLOAD_SECRET=your_secret_here
    DATABASE_URI=file:./payload.db
    # ... see .env.example
    ```

3.  **Run Development Server**:
    ```bash
    npm run dev
    ```

4.  **Build for Production**:
    ```bash
    npm run build
    ```
