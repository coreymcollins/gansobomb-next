import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';
import { PostMetaData } from './PostMetaData';

const getPostsMetadata = (): PostMetaData[] => {
    
	const folder = path.join(process.cwd(), 'posts');
	const files = fs.readdirSync( folder );
	const markdownPosts = files.filter( ( file ) => file.endsWith( '.md' ) );
	
	const posts = markdownPosts.map( ( filename ) => {
		const fileContents = fs.readFileSync( `${folder}/${filename}`, 'utf8' );
		const matterResult = matter( fileContents );

		return {
			title: matterResult.data.title,
			date: matterResult.data.date,
			slug: filename.replace( '.md', '' ),
			coverImage: matterResult.data.coverImage,
			excerpt: matterResult.data.excerpt,
			tags: matterResult.data.tags,
			category: matterResult.data.category,
		}
	});

    posts.sort( ( a, b ) => {
        if ( a.date < b.date ) {
            return 1;
        } else {
            return -1;
        }
    });

    return posts;
}

export default getPostsMetadata;