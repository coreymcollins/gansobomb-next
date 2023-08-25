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
                source: '/2018/11/04/newcomers-guide-stardom-world',
                destination: '/posts/2018-11-04-newcomers-guide-stardom-world',
                permanent: true,
            },
            {
                source: '/2019/03/05/random-review-tetsuya-naito-vs-masato-tanaka',
                destination: '/posts/2019-03-05-random-review-tetsuya-naito-vs-masato-tanaka',
                permanent: true,
            },
        ]
    }
}

module.exports = nextConfig