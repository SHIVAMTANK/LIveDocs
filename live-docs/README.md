This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Docker

This project includes Docker configuration for both development and production environments.

### Development with Docker

To run the application in development mode with Docker:

```bash
# Build and run development container
docker-compose -f docker-compose.dev.yml up --build

# Or run in detached mode
docker-compose -f docker-compose.dev.yml up -d --build
```

### Production with Docker

To run the application in production mode with Docker:

```bash
# Build and run production container
docker-compose up --build

# Or run in detached mode
docker-compose up -d --build
```

### Manual Docker Commands

You can also use Docker commands directly:

```bash
# Build the production image
docker build -t live-docs .

# Run the production container
docker run -p 3000:3000 live-docs

# Build the development image
docker build -f Dockerfile.dev -t live-docs-dev .

# Run the development container
docker run -p 3000:3000 -v $(pwd):/app live-docs-dev
```

### Environment Variables

Make sure to set up your environment variables in the docker-compose files or pass them as environment variables when running the containers:

- `NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY` - Your Liveblocks public key
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Your Clerk publishable key
- `CLERK_SECRET_KEY` - Your Clerk secret key
- `CONVEX_DEPLOY_KEY` - Your Convex deploy key

### Docker Image Features

- **Multi-stage build** for optimized production images
- **Alpine Linux** base for smaller image size
- **Non-root user** for security
- **Health checks** for production deployments
- **Volume mounting** for development hot reloading
- **Standalone output** for better performance
