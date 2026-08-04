# GitHub Profile Setup for GYASH28

This file contains the final manual profile settings that cannot currently be changed through the connected GitHub integration.

## 1. Profile Repository

GitHub displays a special profile README when a public repository has exactly the same name as the username.

Create a public repository named:

```text
GYASH28
```

Initialize it with a README, then replace that README with the contents of:

```text
GITHUB_PROFILE_README.md
```

## 2. Recommended Profile Details

### Name

```text
Yash Ganesh
```

### Bio

```text
AI Product Builder | Full-Stack Developer | Computer Engineering & IoT Student | Building Lernio AI and B.R.A.C.E
```

### Location

```text
Pune, Maharashtra, India
```

## 3. Recommended Pinned Projects

Pin these repositories in this order:

1. `LERNIOAI`
2. `B.R.A.C.E`
3. `CAMPUSMATE`
4. `YASH_PORTFOLIO`
5. `sample-website`

Keep the sixth slot empty until another polished, original project is ready. Five strong projects look better than six projects with one weak entry.

Do not pin these right now:

- `my_assignment` — coursework belonging to or presenting another student
- `WD_practical_no_20` — useful coursework, but not a flagship product
- `brace_new` — do not showcase until exposed keys are revoked and the Git history is cleaned

## 4. Recommended Repository Descriptions

### LERNIOAI

```text
Adaptive AI learning platform for diploma engineering students with tutoring, curriculum content, quizzes, revision, analytics, and study planning.
```

Suggested topics:

```text
nextjs react typescript ai education edtech postgresql prisma groq tailwindcss student-platform
```

### B.R.A.C.E

```text
Local-first agentic AI companion for Windows with voice, memory, permissions, file tools, coding workflows, and an Electron desktop interface.
```

Suggested topics:

```text
react typescript electron ai-assistant local-first agentic-ai voice-assistant knowledge-management nodejs
```

### CAMPUSMATE

```text
Multi-role smart college platform for attendance, academics, timetables, analytics, notices, quizzes, and student productivity.
```

Suggested topics:

```text
react firebase vite college-management attendance-system student-dashboard pwa education-platform
```

### YASH_PORTFOLIO

```text
Cinematic developer portfolio showcasing AI products, full-stack projects, interactive UI, motion, and client work.
```

Suggested topics:

```text
portfolio developer-portfolio javascript animations responsive-design personal-website ui-ux
```

### sample-website

```text
Premium React catalogue and WhatsApp enquiry website for a yarn and craft-material business, with SEO, motion, and accessibility testing.
```

Suggested topics:

```text
react vite business-website product-catalog whatsapp accessibility playwright seo responsive-design
```

## 5. Security Cleanup Required for brace_new

Old public commits contain API credentials. Even if the current source no longer includes them, committed secrets must be considered compromised.

Required actions:

1. Revoke every exposed Gemini and NVIDIA key
2. Create replacement keys only after revocation
3. Store new keys in local environment variables or `.env`
4. Keep `.env` ignored by Git
5. Temporarily make the repository private if possible
6. Remove the secrets from Git history using `git filter-repo` or BFG Repo-Cleaner
7. Force-push the cleaned history
8. Re-run GitHub secret scanning before making it public or pinning it

Never reuse a key that has appeared in a public commit.

## 6. Final Quality Checklist

- Add a clear repository description to every flagship project
- Add the suggested topics
- Add a live demo URL wherever a stable production deployment exists
- Use consistent project names and capitalization
- Keep screenshots current
- Do not commit build artifacts, `node_modules`, `.env`, API keys, or personal vault data
- Archive or make private repositories that do not represent current work
- Keep the five recommended projects pinned until a stronger sixth project is ready
