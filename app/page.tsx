import getPostsMetadata from '@/components/GetPostMetaData';
import PaginationControls from '@/components/PaginationControls';
import PostPreview from '@/components/PostPreview';
import { getSearchParams } from '@/components/SearchParams';

export default function Home( props: any ) {
	const allSearchParams = getSearchParams( props.searchParams )
	const foundPosts = getPostsMetadata()
	const pagedPosts = foundPosts.slice( allSearchParams.start, allSearchParams.end )
	const postPreviews = pagedPosts.map( ( post ) => (
		<PostPreview key={post.slug} {...post} />
	))

	const jsonLd = {
        '@context': 'https://schema.org/',
        '@type': 'Blog',
        '@id': 'https://www.gansobomb.com/',
        'mainEntityOfPage': 'https://www.gansobomb.com/',
        'name': 'Ganso Bomb',
        'description': 'Pro wrestling is life.',
        'publisher': {
            '@type': 'Organization',
            '@id': 'https://www.gansobomb.com/',
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
			<div className="post-grid">
				{postPreviews}
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
