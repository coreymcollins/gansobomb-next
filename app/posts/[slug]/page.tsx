import getPostsMetadata from '@/components/GetPostMetaData';
import Image from 'next/image';
import PostDate from '@/components/Date';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import type { Metadata } from 'next';
import Link from 'next/link';
import getPostContent from '@/components/GetPostContent';

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
    const metaImage = post.data.coverImage ? `/images/${post.data.coverImage}` : '/images/ganso-bomb-fallback.webp'

    return {
        metadataBase: new URL( 'https:/www.gansobomb.com' ),
        title: metaTitle,
        description: metaDescription,
        openGraph : {
            title: metaTitle,
            description: metaDescription,
            url: `https://www.gansobomb.com/${slug}`,
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
    let tags = post.data.tags;

    if ( tags ) {
        tags.sort( function( a: string, b: string ) {
            return a.toLowerCase().localeCompare( b.toLowerCase() )
        })
    }

    return (
        <>
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
                    
                    {
                    tags &&
                        <div className="tag-list-container">
                            <h3>Tags</h3>
                            <ul className="tag-list">
                                { tags.map( (tag: any) => (
                                    <li key={tag} className="tag-list-item">
                                        <Link href={`/tag/${tag}`} className="tag-link">
                                            {tag}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    }
                </div>

            </article>
        </>
    );
};

export default postSingle;