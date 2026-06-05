# Vercel Deployment Guide

## Masalah yang Diperbaiki
- ❌ Error: `Cannot find module 'shared'` di Vercel
- ✅ Solusi: Inline type definitions, tidak bergantung pada monorepo shared package

## Perubahan yang Dilakukan

### 1. `server/src/index.ts`
- Mengganti `import type { ApiResponse } from "shared"` 
- Menjadi inline type definition:
```typescript
type ApiResponse = {
  message: string;
  success: true;
};
```

### 2. `server/vercel.json`
Updated dengan konfigurasi yang benar:
```json
{
  "version": 2,
  "installCommand": "cd .. && bun install && cd server",
  "buildCommand": "bunx prisma generate && bun run build",
  "framework": null,
  "outputDirectory": "public",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/api"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

## Deployment Steps

### 1. Push ke GitHub
```bash
git add .
git commit -m "fix: vercel deployment configuration"
git push origin main
```

### 2. Deploy via Vercel CLI
```bash
cd server
vercel --prod
```

### 3. Atau via Vercel Dashboard
1. Login ke Vercel dashboard
2. Import project dari GitHub
3. Set Root Directory ke: `server`
4. Framework Preset: `Other`
5. Build Command: `bunx prisma generate && bun run build`
6. Output Directory: `public`
7. Install Command: `cd .. && bun install && cd server`

## Environment Variables di Vercel

Tambahkan di Vercel Dashboard → Settings → Environment Variables:

```bash
DATABASE_URL=postgresql://...
DIRECT_URL=postgresql://...
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
GITHUB_APP_ID=your-app-id
GITHUB_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\n...\n-----END RSA PRIVATE KEY-----"
GITHUB_CLIENT_ID=your-client-id
GITHUB_CLIENT_SECRET=your-client-secret
GITHUB_USER_TOKEN=your-token
WAKATIME_API_KEY=your-api-key
NODE_ENV=production
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
PORT=3000
```

**Important**: Untuk `GITHUB_PRIVATE_KEY`, pastikan newlines (`\n`) tetap ada dalam string.

## Verifikasi Deployment

### 1. Check Health Endpoint
```bash
curl https://your-project.vercel.app/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2026-06-05T...",
  "uptime": 123.45,
  "environment": "production",
  "services": {
    "database": "connected",
    "api": "running"
  }
}
```

### 2. Check CORS
```bash
curl -H "Origin: http://localhost:5173" \
     -H "Access-Control-Request-Method: GET" \
     -X OPTIONS \
     https://your-project.vercel.app/github/profile
```

Harus ada header: `access-control-allow-origin: http://localhost:5173`

### 3. Test dari Browser
```javascript
// Buka console di http://localhost:5173
fetch('https://your-project.vercel.app/github/profile')
  .then(r => r.json())
  .then(d => console.log(d))
```

## Troubleshooting

### Build Failed
1. Check Vercel logs: `vercel logs --follow`
2. Verify all environment variables are set
3. Check if DATABASE_URL is accessible from Vercel

### CORS Issues
1. Verify `ALLOWED_ORIGINS` di environment variables
2. Localhost (port 3000, 5173) sudah otomatis diizinkan
3. Clear browser cache dan hard refresh

### Database Connection Failed
1. Pastikan database allows connections dari Vercel IPs
2. Check DATABASE_URL format
3. Verify Prisma migrations sudah dijalankan:
   ```bash
   bunx prisma migrate deploy
   ```

### Module Not Found
Jika masih ada error "Cannot find module":
1. Pastikan `installCommand` benar di vercel.json
2. Check bahwa dependencies ada di package.json
3. Rebuild: `vercel --force`

## Post-Deployment

### 1. Update Client Environment
Update `.env` di client:
```bash
VITE_API_URL=https://your-project.vercel.app
```

### 2. Redeploy Client
```bash
cd client
vercel --prod
```

### 3. Monitor
- Check Vercel dashboard untuk errors
- Monitor logs: `vercel logs`
- Setup alerts untuk downtime

## Rollback

Jika ada masalah:
```bash
vercel rollback
```

Atau via dashboard: Deployments → Previous deployment → Promote to Production

---

**Status**: ✅ Ready to Deploy to Vercel
**Last Updated**: 2026-06-05
