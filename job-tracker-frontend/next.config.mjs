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
};

export default nextConfig;
