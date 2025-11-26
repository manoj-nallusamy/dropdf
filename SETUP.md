# DropDF Setup Guide

## Prerequisites

You'll need accounts for:
1. **Supabase** (Database) - https://supabase.com
2. **Cloudflare R2** (File Storage) - https://cloudflare.com

---

## Step 1: Supabase Setup

### Create Project
1. Go to https://app.supabase.com
2. Click "New Project"
3. Name it "dropdf" and set a secure database password
4. Wait for project to finish setting up (~2 minutes)

### Get API Credentials
1. Go to **Settings** → **API**
2. Copy these values to your `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL` → Project URL
   - `SUPABASE_SERVICE_ROLE_KEY` → service_role key (⚠️ Keep secret!)

### Create Database Tables
1. Go to **SQL Editor**
2. Click "New Query"
3. Copy and paste the SQL from `database-schema.sql`
4. Click "Run" or press Cmd/Ctrl + Enter

---

## Step 2: Cloudflare R2 Setup

### Create R2 Bucket
1. Go to https://dash.cloudflare.com
2. Click **R2** in the sidebar
3. Click "Create Bucket"
4. Name it `dropdf-pdfs`
5. Choose a location close to your users
6. Click "Create Bucket"

### Get R2 Credentials
1. Go to **R2** → **Overview**
2. Click "Manage R2 API Tokens"
3. Click "Create API Token"
4. Give it a name like "dropdf-api"
5. Set permissions to "Object Read & Write"
6. Click "Create API Token"
7. Copy these values to your `.env.local`:
   - `R2_ACCESS_KEY_ID` → Access Key ID
   - `R2_SECRET_ACCESS_KEY` → Secret Access Key

### Get Account ID and Public URL
1. In the R2 dashboard, copy your **Account ID** to `.env.local` as `R2_ACCOUNT_ID`
2. Go to your bucket settings
3. Under "Public Access", enable it if you want direct links (optional)
4. Copy the public URL to `.env.local` as `R2_PUBLIC_URL`

---

## Step 3: Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in all the values from Supabase and Cloudflare R2

3. Your `.env.local` should look like:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://abcdefgh.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...very-long-key

   R2_ACCOUNT_ID=abc123def456
   R2_ACCESS_KEY_ID=a1b2c3d4e5f6
   R2_SECRET_ACCESS_KEY=very-secret-key-here
   R2_BUCKET_NAME=dropdf-pdfs
   R2_PUBLIC_URL=https://pub-abc123.r2.dev

   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

---

## Step 4: Install Dependencies & Run

```bash
# Install dependencies (if not already done)
npm install

# Run development server
npm run dev
```

Open http://localhost:3000 in your browser!

---

## Troubleshooting

### "Missing NEXT_PUBLIC_SUPABASE_URL"
- Make sure `.env.local` exists in the project root
- Check that the variable names match exactly
- Restart the dev server after adding env vars

### Upload fails with "Failed to save file metadata"
- Check your Supabase credentials
- Verify the database tables were created correctly
- Check Supabase logs in the dashboard

### Upload fails with R2 error
- Verify R2 credentials are correct
- Check that the bucket name matches
- Ensure API token has read/write permissions

### PDF won't display
- Make sure `pdf.worker.min.js` is in the `public/` folder
- Check browser console for errors
- Try a different PDF file

---

## Production Deployment (Vercel)

1. Push code to GitHub
2. Import project in Vercel
3. Add all environment variables in Vercel dashboard
4. Update `NEXT_PUBLIC_APP_URL` to your production domain
5. Deploy!

---

## Security Notes

⚠️ **Never commit `.env.local` to git**
- It's already in `.gitignore`
- The `SUPABASE_SERVICE_ROLE_KEY` bypasses Row Level Security
- The `R2_SECRET_ACCESS_KEY` gives full access to your bucket

✅ **Production checklist:**
- [ ] Use strong, unique credentials
- [ ] Enable CORS on R2 bucket for your domain only
- [ ] Set up Supabase Row Level Security policies (for future user auth)
- [ ] Monitor usage and set up billing alerts
