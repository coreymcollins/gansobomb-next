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

    async redirects() {
        return [
            {
                source: '/tag/:slug/page/:number',
                destination: '/tag/:slug',
                permanent: true,
            },
            {
                source: '/category/:slug/page/:number',
                destination: '/category/:slug',
                permanent: true,
            },
            {
                source: '/tag/:slug/feed',
                destination: '/tag/:slug',
                permanent: true,
            },
            {
                source: '/category/:slug/feed',
                destination: '/category/:slug',
                permanent: true,
            },
            {
                source: '/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})/:slug*',
                destination: '/posts/:year-:month-:day-:slug*',
                permanent: true,
            },
            {
                source: '/author/:slug',
                destination: '/',
                permanent: true,
            },
            {
                source: '/go',
                destination: '/',
                permanent: true,
            },
            {
                source: '/page/:number',
                destination: '/',
                permanent: true,
            },
        ]
    }
}

module.exports = nextConfig