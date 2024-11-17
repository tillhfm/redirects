This is my personal app for creating short urls.

## Getting Started

To deploy the app all you need is a PostgreSQL server and a Clerk.com account. Make sure you define the following environment variables: `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, `DATABASE_URL` (your PostgreSQL url), `APP_BASE_HOSTNAME` (your domain name or localhost:3000 for example) and `APP_BASE_URL` (the hostname with protocol, so https://re.tillhfm.com for example).

Then run the app.
