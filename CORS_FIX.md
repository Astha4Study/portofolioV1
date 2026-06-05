# Quick Fix: CORS Issue

## Masalah
Localhost tidak bisa akses API production karena CORS policy.

## Solusi yang Sudah Diterapkan

File `server/src/index.ts` sudah diupdate dengan konfigurasi CORS yang lebih fleksibel:
- ✅ Development: Allow all origins
- ✅ Production: Allow configured domains + localhost untuk testing
- ✅ Localhost ports yang diizinkan: 3000, 5173

## Langkah Deploy Perubahan

### Option 1: Vercel (Recommended)
```bash
cd server
vercel --prod
```

### Option 2: Manual Push & Auto Deploy
```bash
git add .
git commit -m "fix: update CORS configuration to allow localhost"
git push origin main
```

Jika Vercel sudah connected ke repo, akan auto-deploy.

### Option 3: Docker
```bash
docker-compose down
docker-compose up -d --build
```

## Verifikasi

Setelah deploy, test dari browser:
```javascript
// Buka console di http://localhost:5173
fetch('https://portofolio-priyanto-server.vercel.app/health')
  .then(r => r.json())
  .then(d => console.log(d))
```

Jika berhasil, seharusnya tidak ada CORS error lagi.

## Environment Variables yang Dibutuhkan

Pastikan di Vercel environment variables sudah ada:
```
NODE_ENV=production
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

Note: Localhost (port 3000, 5173) akan otomatis diizinkan bahkan di production untuk kemudahan development.

## Jika Masih Ada Error

1. Clear browser cache
2. Hard refresh (Ctrl+F5)
3. Check Vercel logs: `vercel logs`
4. Verify environment variables di Vercel dashboard
