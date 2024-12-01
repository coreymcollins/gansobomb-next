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
        metadataBase: new URL( 'https:/www.gansobomb.com/' ),
        title: metaTitle,
        description: metaDescription,
        openGraph : {
            title: metaTitle,
            description: metaDescription,
            url: `https://www.gansobomb.com/posts/${slug}`,
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
            locale: 'en_US',
        },
        twitter: {
            card: 'summary_large_image',
            title: metaTitle,
            description: metaDescription,
            images: metaImage,
        },
        alternates: {
            canonical: `https://www.gansobomb.com/posts/${slug}`,
        }
    }    
}

const postSingle = ( props: any ) => {

    const slug = props.params.slug;
    const post = getPostContent( slug );
    let tags = post.data.tags;
    let category = post.data.category;

    if ( tags ) {
        tags.sort( function( a: string, b: string ) {
            return a.toLowerCase().localeCompare( b.toLowerCase() )
        })
    }

    const jsonLd = {
        '@context': 'https://schema.org/',
        '@type': 'BlogPosting',
        '@id': `https://www.gansobomb.com/posts/${ slug }/`,
        'mainEntityOfPage': `https://www.gansobomb.com/posts/${ slug }/`,
        'headline': post.data.title,
        'name': post.data.title,
        'description': post.data.excerpt,
        'datePublished': post.data.date,
        'dateModified': post.data.date,
        'author': {
            '@type': 'Person',
            '@id': 'https://www.gansobomb.com',
            'name': 'Corey Collins'
        },
        'image': {
            '@type': 'ImageObject',
            '@id': `https://www.gansobomb.com/images/${ post.data.coverImage }`,
            'url': `https://www.gansobomb.com/images/${ post.data.coverImage }`,
            'height': '960',
            'width': '640'
        },
        "url": `https://www.gansobomb.com/posts/${ slug }/`,
        "keywords": tags,
        'isPartOf': {
            '@type': 'Blog',
            '@id': 'https://www.gansobomb.com',
            'mainEntityOfPage': 'https://www.gansobomb.com',
            'name': 'Ganso Bomb',
            'description': 'Pro wrestling is life.',
            'publisher': {
                '@type': 'Organization',
                '@id': 'https://www.gansobomb.com',
                'name': 'Ganso Bomb',
                'logo': {
                    '@type': 'ImageObject',
                    '@id': 'https://www.gansobomb.com/images/ganso-bomb-fallback.webp',
                    'url': 'https://www.gansobomb.com/images/ganso-bomb-fallback.webp',
                    'width': '960',
                    'height': '640'
                }
            },
        }
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <article className="post-single">
                <div className="post-single-header">
                    <div className="post-title-container">
                        <h1>{post.data.title}</h1>
                        <PostDate dateString={post.data.date} />
                    </div>
                    {post.data.coverImage &&
                        <Image
                            src={`/images/${post.data.coverImage}`}
                            alt={post.data.title}
                            width={960}
                            height={640}
                            className="post-image"
                            quality={100}
                        />
                    }
                </div>
                <div className="post-single-content">
                    <MarkdownRenderer content={post.content} />
                    
                    {
                        category &&
                        <div className="term-list-container">
                            <h3>Category</h3>
                            <Link href={`/category/${category}`} className="term-link">
                                {/* {category.replace( '-', ' ' )} */}
                                {category}
                            </Link>
                        </div>
                    }

                    {
                    tags &&
                        <div className="term-list-container">
                            <h3>Tags</h3>
                            <ul className="term-list">
                                { tags.map( (tag: any) => (
                                    <li key={tag} className="term-list-item">
                                        <Link href={`/tag/${tag}`} className="term-link">
                                            {tag.replaceAll( '-', ' ' )}
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