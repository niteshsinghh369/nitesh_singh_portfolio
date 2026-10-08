/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // If deploying to a project page (e.g., https://username.github.io/repo-name/),
  // set NEXT_PUBLIC_BASE_PATH=/repo-name in GitHub Actions or environment
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
};

export default nextConfig;
