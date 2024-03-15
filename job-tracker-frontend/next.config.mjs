/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: "/jobs/:path*",
                destination: "http://localhost:3001/jobs/:path*",
            },
        ];
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "logo.clearbit.com",
                port: "",
                pathname: "/*",
            },
        ],
    },
};

export default nextConfig;
