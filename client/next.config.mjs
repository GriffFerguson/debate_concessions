/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
            allowedOrigins: ["localhost:3000", "stratfordtourney.griffsvoid.org"],
            allowedForwardedHosts: ["localhost:3000", "stratfordtourney.griffsvoid.org"],
            // ^ You might have to use this property depending on your exact version.
        }
    }
};

export default nextConfig;
