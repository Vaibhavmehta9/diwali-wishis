# 🚀 Deployment Guide: Vercel & Render

This guide outlines step-by-step instructions to deploy your **Mehta Family Diwali Greeting Website** on **Vercel** and **Render** for free with automatic SSL (HTTPS).

GitHub Repository: [https://github.com/Vaibhavmehta9/diwali-wishis](https://github.com/Vaibhavmehta9/diwali-wishis)

---

## ⚡ Option 1: Deploy to Vercel (Recommended — Fastest & Easiest)

Vercel provides instant global CDN caching, automatic builds on every push to GitHub, and a free `.vercel.app` domain.

### Method A: Via Vercel Web Dashboard (1 Minute)

1. **Sign in / Sign up:**
   - Go to [vercel.com](https://vercel.com) and click **Sign Up** or **Log In**.
   - Select **Continue with GitHub** (sign in using your GitHub account `Vaibhavmehta9`).

2. **Import Repository:**
   - On the Vercel Dashboard, click the **"Add New..."** button (top right) ➔ **"Project"**.
   - Under **Import Git Repository**, locate `diwali-wishis` (or search for `diwali-wishis`).
   - Click **"Import"**.

3. **Configure & Deploy:**
   - **Project Name:** `mehta-family-diwali` (or leave as `diwali-wishis`).
   - **Framework Preset:** `Vite` (Vercel automatically detects this).
   - **Root Directory:** `./` (default).
   - **Build Command:** `npm run build` (automatic).
   - **Output Directory:** `dist` (automatic).
   - Click the blue **"Deploy"** button.

4. **Done! 🎉**
   - In ~30–45 seconds, your site will be live at `https://diwali-wishis.vercel.app` (or similar URL).
   - Every time you push a change to GitHub, Vercel will automatically re-deploy your site.

### Method B: Via Vercel CLI (From Terminal)

If you prefer using the command line:

```bash
# 1. Install Vercel CLI globally
npm install -g vercel

# 2. Login to your Vercel account
vercel login

# 3. Deploy to production
vercel --prod
```

---

## 🌐 Option 2: Deploy to Render (Static Site)

Render is another popular free cloud host that supports automatic deployment from GitHub.

### Method A: Via Render Web Dashboard

1. **Sign in / Sign up:**
   - Visit [render.com](https://render.com) and click **Get Started** or **Sign In**.
   - Select **GitHub** to connect your account.

2. **Create New Static Site:**
   - On the Render Dashboard, click the blue **"New +"** button (top right).
   - Select **"Static Site"**.

3. **Connect Repository:**
   - Select `Vaibhavmehta9/diwali-wishis` from your GitHub repositories.
   - Click **"Connect"**.

4. **Build & Deploy Settings:**
   - **Name:** `mehta-family-diwali`
   - **Branch:** `main`
   - **Root Directory:** *(leave blank)*
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist`

5. **SPA Redirect Rule (Important for single-page apps):**
   - Click **"Create Static Site"**.
   - Go to the **"Redirects/Rewrites"** tab on the left menu.
   - Add a rule:
     - **Source:** `/*`
     - **Destination:** `/index.html`
     - **Action:** `Rewrite`
   - Save changes. *(Note: Our repository already includes `render.yaml` which sets this up automatically).*

6. **Done! 🎉**
   - Render will build and deploy your site to `https://mehta-family-diwali.onrender.com`.

---

## 📋 Quick Comparison Table

| Feature | Vercel | Render |
| :--- | :--- | :--- |
| **Type** | Edge Static / Serverless | Static Site |
| **Free SSL** | Yes (automatic) | Yes (automatic) |
| **Free Subdomain** | `*.vercel.app` | `*.onrender.com` |
| **Custom Domains** | Supported (Free) | Supported (Free) |
| **Build Time** | ~25–35 seconds | ~45–60 seconds |
| **Auto Deploy on `git push`** | Yes | Yes |

---

## 🔗 Adding Your Live URL to WhatsApp Sharing

Once deployed, if you want your custom production domain (e.g. `https://mehta-family-diwali.vercel.app`) to be copied instead of relying on `window.location.href`:

In [`src/components/ShareSection.jsx`](file:///c:/Users/yashm/OneDrive/Desktop/Documents/diwali%20wishis/src/components/ShareSection.jsx):
The `getShareUrl()` function already automatically picks up `window.location.href`, meaning **it will automatically share your live Vercel or Render URL** when someone clicks the WhatsApp share button on the live site!

