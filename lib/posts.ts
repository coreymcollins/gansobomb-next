import fs from 'fs/promises';
import matter from 'gray-matter';
import path from 'path';

const POSTS_DIRECTORY = path.join(process.cwd(), 'posts');

export async function getPosts() {
    try {
        const fileNames = await fs.readdir(POSTS_DIRECTORY);
        const posts = await Promise.all(
            fileNames.map(async (fileName) => {
                const filePath = path.join(POSTS_DIRECTORY, fileName);
                const fileContents = await fs.readFile(filePath, 'utf-8');
                const matterResult = matter( fileContents );
                const title = matterResult.data.title;
                const slug = fileName.replace( '.md', '' );
                return { title, slug };
            })
        );
        return posts;
    } catch (error) {
        console.error('Error reading posts directory:', error);
        return [];
    }
}
    