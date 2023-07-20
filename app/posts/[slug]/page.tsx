import fs from 'fs';
import Markdown from 'markdown-to-jsx';
import matter from 'gray-matter';
import getPostsMetadata from '@/components/getPostMetaData';
import Link from 'next/link';
import Image from 'next/image';
import PostDate from '@/components/Date';
import MarkdownRenderer from '@/components/MarkdownRenderer';

const getPostContent = ( slug: string ) => {
    const folder = 'posts/';
    const file = `${folder}${slug}.md`;
    const content = fs.readFileSync( file, 'utf8' );
    const matterResult = matter( content );

    return matterResult;
}

export const generateStaticParams = async () => {
    const posts = getPostsMetadata();

    return posts.map( ( post ) => ({
        slug: post.slug,
    }));
};

const postSingle = ( props: any ) => {

    const slug = props.params.slug;
    const post = getPostContent( slug );

    return (
        <main>
            <header>
                <Link href="/">
                    <h1>Ganso Bomb</h1>
                </Link>
            </header>
            <article className="post-single">
                <div className="post-single-header">
                    {post.data.coverImage &&
                        <Image
                            src={`/images/${post.data.coverImage}`}
                            alt={post.data.title}
                            width={960}
                            height={640}
                            className="post-image"
                        />
                    }
                    <div className="post-title-container">
                        <h2>{post.data.title}</h2>
                        <PostDate dateString={post.data.date} />
                    </div>
                </div>
                <div className="post-single-content">
                    <MarkdownRenderer content={post.content} />
                </div>
            </article>
            <footer>
                <p>Pro wrestling is life.</p>
            </footer>
        </main>
    );
};

export default postSingle;