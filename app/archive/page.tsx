import { getAllPostsByTerm } from '@/components/GetAllPostsByTerm';
import getPostsMetadata from '@/components/GetPostMetaData';
import PaginationControls from '@/components/PaginationControls';
import PostPreview from '@/components/PostPreview';
import { getSearchParams } from '@/components/SearchParams';
import type { Metadata } from 'next';

export async function generateMetadata( props: any ): Promise<Metadata> {
    const slug = props.params.slug;
    const metaTitle = 'Archived posts on Ganso Bomb'
    const metaDescription = 'View archived posts on Ganso Bomb'
    const metaImage = '/images/ganso-bomb-fallback.webp'

    return {
        metadataBase: new URL( 'https:/www.gansobomb.com/' ),
        title: metaTitle,
        description: metaDescription,
        openGraph : {
            title: metaTitle,
            description: metaDescription,
            url: `https://www.gansobomb.com/archive`,
            siteName: 'Ganso Bomb',
            images: [
                {
                    url: metaImage,
                    width: 960,
                    height: 640,
                    alt: metaTitle,
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
            canonical: `https://www.gansobomb.com/archive`,
        }
    }    
}

export default function Home( props: any ) {
    const allSearchParams = getSearchParams( props.searchParams )
	const foundPosts = getPostsMetadata()
	const pagedPosts = foundPosts.slice( allSearchParams.start, allSearchParams.end )
    const startIndex = 1000
	const postPreviews = pagedPosts.map( ( post, index ) => (
		<PostPreview key={post.slug} {...post} index={(index + startIndex).toString()} />
	))

	const jsonLd = {
        '@context': 'https://schema.org/',
        '@type': 'CollectionPage',
        '@id': 'https://www.gansobomb.com/archive',
		'url': 'https://www.gansobomb.com/archive',
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

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
            <div className="posts-section">
                <div className="section-grid">
                    {postPreviews}
                </div>
            </div>
			<PaginationControls
				hasNextPage={allSearchParams.end < foundPosts.length}
				hasPrevPage={allSearchParams.start > 0}
				totalPosts={foundPosts.length}
				postsPerPage={allSearchParams.postsPerPage}
				query=''
			/>
		</>
	)
}
