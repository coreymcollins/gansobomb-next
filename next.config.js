/** @type {import('next').NextConfig} */
const nextConfig = {

    async rewrites() {
        return [
            {
                source: '/sitemap.xml',
                destination: '/api/sitemap',
            },
        ];
    },
    env: {
        SITE_URL: 'https://www.gansobomb.com'
    },
    basePath: '',
}

module.exports = nextConfig