import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

// Set up the file paths for dynamic imports (ESLint config)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Extend your ESLint config with Next.js core-vitals and TypeScript
const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

// Your Next.js config
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,  // Skip ESLint checks during build
  },
};

export default nextConfig;
