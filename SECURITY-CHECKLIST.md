# Security checklist for TAAS

This site is static and public-by-nature, so the main risk is account takeover and domain hijack.

## Required actions before production
- Enable 2FA with an authenticator app for GitHub, Vercel, the domain registrar, Meta Business, and Google.
- Use a registrar lock, auto-renew, DNSSEC, and CAA records when supported.
- Protect the `main` branch in GitHub with pull request reviews and required CI checks.
- Remove unused collaborators, old tokens and stale deploy keys.
- Review Vercel environment variables and deployment protection.
- Keep a separate recovery email and phone number for the accounts above.
- Review DNS, domain ownership, and privacy settings for `taasinteriorstyling.in`.
