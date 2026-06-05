# Production Deployment Guide

## Prerequisites

### Environment Variables

Pastikan semua environment variables berikut sudah dikonfigurasi:

#### Server (.env)
```bash
# Database
DATABASE_URL=postgresql://user:password@host:5432/database
DIRECT_URL=postgresql://user:password@host:5432/database

# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key

# GitHub
GITHUB_APP_ID=your-app-id
GITHUB_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\n...\n-----END RSA PRIVATE KEY-----"
GITHUB_CLIENT_ID=your-client-id
GITHUB_CLIENT_SECRET=your-client-secret
GITHUB_USER_TOKEN=your-personal-token

# WakaTime
WAKATIME_API_KEY=your-api-key

# Server Config
NODE_ENV=production
PORT=3000
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

#### Client (.env)
```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_API_URL=https://api.yourdomain.com
```

## Deployment Steps

### 1. Database Migration

```bash
cd server
bunx prisma migrate deploy
bunx prisma generate
```

### 2. Build Applications

```bash
# Build semua packages
bun run build

# Atau build individual
bun run build:server
bun run build:client
```

### 3. Docker Deployment

```bash
# Build dan run dengan Docker Compose
docker-compose up -d

# Atau build manual
docker build -t portfolio-server -f server/Dockerfile .
docker run -p 3000:3000 --env-file .env portfolio-server
```

### 4. Vercel Deployment

#### Server (API)
```bash
cd server
vercel --prod
```

#### Client (Frontend)
```bash
cd client
vercel --prod
```

## Security Checklist

- [ ] Semua environment variables sudah diset dengan nilai production
- [ ] ALLOWED_ORIGINS sudah dikonfigurasi dengan domain yang benar
- [ ] Database credentials aman dan tidak di-commit ke git
- [ ] HTTPS sudah aktif untuk production domain
- [ ] Rate limiting sudah dikonfigurasi sesuai kebutuhan
- [ ] Prisma migrations sudah dijalankan
- [ ] API keys (GitHub, WakaTime) valid dan memiliki permission yang tepat
- [ ] CORS origins sudah dibatasi untuk production
- [ ] Security headers sudah aktif
- [ ] Error messages tidak expose sensitive information

## Health Check

Setelah deployment, pastikan endpoint berikut berfungsi:

```bash
# Health check
curl https://api.yourdomain.com/health

# Expected response:
# {
#   "status": "healthy",
#   "timestamp": "2026-06-05T...",
#   "uptime": 123.45
# }
```

## Monitoring

### Logs
- Development: Formatted console logs
- Production: JSON structured logs

### Performance
- Monitor response times di endpoint `/health`
- Check rate limiting dengan header response
- Monitor database connection pool

## Troubleshooting

### Environment Variables Missing
Error akan muncul saat startup dengan list variable yang hilang.
Check dengan: `bun run start` dan lihat error message.

### Database Connection Failed
- Pastikan DATABASE_URL benar
- Check firewall rules
- Verify database credentials

### CORS Errors
- Update ALLOWED_ORIGINS di environment variables
- Server secara otomatis mengizinkan localhost (port 3000, 5173) untuk development
- Production domains harus ditambahkan di ALLOWED_ORIGINS
- Format: `ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com`
- Restart server setelah update

### Rate Limiting
Jika client terkena rate limit (429), tunggu 1 menit atau adjust rate limit config.

## Rollback

Jika ada masalah di production:

```bash
# Docker
docker-compose down
docker-compose up -d --force-recreate

# Vercel
vercel rollback
```

## Performance Optimization

1. **Database Indexing**: Pastikan indexes ada di fields yang sering di-query
2. **Caching**: Consider Redis untuk rate limiting di production
3. **CDN**: Gunakan Vercel Edge Network untuk client assets
4. **Compression**: Hono otomatis handle gzip/brotli compression

## Updates

Untuk update production:

```bash
# Pull latest changes
git pull origin main

# Install dependencies
bun install

# Run migrations
cd server && bunx prisma migrate deploy

# Build
bun run build

# Restart services
docker-compose restart  # or vercel --prod
```
