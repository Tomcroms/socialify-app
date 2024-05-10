/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { hostname: 'res.cloudinary.com' },
            { hostname: 'avatars.githubusercontent.com' },
            { hostname: 'lh3.googleusercontent.com' },
            { hostname: 'instagram.fcdg3-1.fna.fbcdn.net' },
            { hostname: 'scontent.cdninstagram.com' },
            { hostname: 'scontent.xx.fbcdn.net' },
            { hostname: 'scontent-den2-1.cdninstagram.com' }
        ]
    },
};

export default nextConfig;
