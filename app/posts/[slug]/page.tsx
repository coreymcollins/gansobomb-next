import getPostsMetadata from '@/components/getPostMetaData';
import Image from 'next/image';
import PostDate from '@/components/Date';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import PageFooter from '@/components/PageFooter';
import Link from 'next/link';
import getPostContent from '@/components/getPostContent';

export const generateStaticParams = async () => {
    const posts = getPostsMetadata();

    return posts.map( ( post ) => ({
        slug: post.slug,
    }));
};

export async function generateMetadata( props: any ): Promise<Metadata> {
    const slug = props.params.slug;
    const post = getPostContent( slug );
    const metaTitle = `${post.data.title} on Ganso Bomb`
    const metaDescription = post.data.excerpt
    const metaImage = `/images/${post.data.coverImage}`

    return {
        title: metaTitle,
        description: metaDescription,
        openGraph : {
            title: metaTitle,
            description: metaDescription,
            url: `https://gansobomb.vercel.app/${slug}`,
            siteName: 'Ganso Bomb',
            images: [
                {
                    url: metaImage,
                    width: 960,
                    height: 640,
                    alt: post.data.title,
                }
            ],
            type: 'website',
            locale: 'en_US'
        },
        twitter: {
            card: 'summary_large_image',
            title: metaTitle,
            description: metaDescription,
            images: metaImage,
        },
    }    
}

const postSingle = ( props: any ) => {

    const slug = props.params.slug;
    const post = getPostContent( slug );

    return (
        <main>
            <PageHeader />
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
                    
                    <div className="tag-list">
                        <h3>Tags</h3>
                        { post.data.tags.map( (tag: any) => (
                            <Link key={tag} href={`/tag/${tag}`}>
                                {tag}
                            </Link>
                        ))}
                    </div>
                </div>

            </article>
            <PageFooter />
        </main>
    );
};

export default postSingle;