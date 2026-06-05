# Security Best Practices

## Environment Variables

### ⚠️ NEVER commit these files:
- `.env`
- `.env.local`
- `.env.production`
- Any file containing secrets, keys, or credentials

### Required Security Measures:

1. **API Keys & Tokens**
   - Rotate keys regularly (every 90 days minimum)
   - Use different keys for development and production
   - Never hardcode keys in source code
   - Use environment variables for all sensitive data

2. **Database Security**
   - Use strong passwords (minimum 16 characters)
   - Enable SSL/TLS for database connections
   - Restrict database access by IP whitelist
   - Regular backups with encryption

3. **Authentication**
   - Use Supabase Row Level Security (RLS)
   - Implement proper token validation
   - Set appropriate token expiration times
   - Use HTTPS only in production

4. **CORS Configuration**
   - Whitelist specific origins in production
   - Never use `*` wildcard in production
   - Include credentials only when necessary

5. **Rate Limiting**
   - Current: 100 requests per minute per IP
   - Adjust based on your traffic patterns
   - Consider Redis for distributed rate limiting

## Server Security Checklist

- [x] Environment variable validation on startup
- [x] Security headers (X-Frame-Options, CSP, etc.)
- [x] Input sanitization and validation
- [x] Error messages don't expose sensitive info
- [x] Rate limiting on API endpoints
- [x] CORS properly configured
- [x] HTTPS enforcement in production
- [x] Graceful shutdown handling
- [x] Structured logging (no sensitive data)
- [x] Database connection pooling

## Client Security Checklist

- [ ] No secrets in client-side code
- [ ] API calls only to whitelisted domains
- [ ] Tokens stored securely (httpOnly cookies preferred)
- [ ] XSS protection via Content Security Policy
- [ ] Input validation on forms
- [ ] HTTPS only in production

## Dependency Security

Run regular security audits:

```bash
# Audit dependencies
bun audit

# Update dependencies
bun update

# Check for outdated packages
bun outdated
```

## Monitoring & Alerts

### What to Monitor:
1. Failed authentication attempts
2. Rate limit violations
3. Database connection errors
4. Unusual traffic patterns
5. Error rates and response times

### Recommended Tools:
- **Logging**: Structured JSON logs (already implemented)
- **APM**: Consider Sentry, DataDog, or New Relic
- **Uptime**: UptimeRobot, Pingdom, or StatusCake
- **Database**: Prisma Pulse for real-time monitoring

## Incident Response

### If Credentials are Compromised:

1. **Immediate Actions:**
   - Rotate all affected keys immediately
   - Revoke compromised tokens
   - Review access logs
   - Update environment variables in all environments

2. **Investigation:**
   - Check git history for exposed secrets
   - Review recent commits and deployments
   - Audit user access and permissions

3. **Prevention:**
   - Use git-secrets or similar tools
   - Enable GitHub secret scanning
   - Implement pre-commit hooks

## Common Vulnerabilities Addressed

| Vulnerability | Mitigation |
|--------------|------------|
| SQL Injection | Prisma ORM with parameterized queries |
| XSS | Content Security Policy + input sanitization |
| CSRF | SameSite cookies + CORS configuration |
| Clickjacking | X-Frame-Options: DENY |
| MIME Sniffing | X-Content-Type-Options: nosniff |
| Rate Limit Bypass | IP-based rate limiting |
| Sensitive Data Exposure | Environment variables + .gitignore |
| Insecure Dependencies | Regular audits + updates |

## Production Deployment Security

### Before Going Live:

1. Run full security scan
2. Verify all environment variables
3. Test rate limiting
4. Verify CORS configuration
5. Check SSL/TLS certificates
6. Enable monitoring and alerts
7. Prepare incident response plan
8. Document rollback procedures

### Environment Variables Verification:

```bash
# Run this to verify all required env vars are set
bun run start

# Should fail fast if any required variable is missing
# with clear error message listing what's missing
```

## Contact & Support

For security issues, please:
1. Do NOT open public issues
2. Contact maintainers directly
3. Provide detailed reproduction steps
4. Allow time for fix before disclosure

## Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [Prisma Security Guide](https://www.prisma.io/docs/guides/performance-and-optimization/connection-management)
- [Hono Security](https://hono.dev/docs/guides/security)
