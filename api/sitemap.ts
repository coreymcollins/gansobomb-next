import { NextApiRequest, NextApiResponse } from 'next';
import { SitemapStream, streamToPromise } from 'sitemap';
import { getPosts } from '@/lib/posts';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const smStream = new SitemapStream({
            hostname: process.env.SITE_URL,
        });
        
        const posts = await getPosts();
        
        smStream.write({ url: '/', changefreq: 'daily', priority: 0.9 });
        posts.forEach((post) => {
            smStream.write({ url: `/posts/${post.slug}`, changefreq: 'daily', priority: 0.7 });
        });
        
        smStream.end();
        
        const sitemapOutput = (await streamToPromise(smStream)).toString();
        
        res.writeHead(200, {
            'Content-Type': 'application/xml',
        });
        
        res.end(sitemapOutput);
    } catch (e) {
        console.error(e);
        res.status(500).end();
    }
}
