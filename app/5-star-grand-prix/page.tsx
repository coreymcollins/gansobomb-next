import { getAllPostsByTerm } from '@/components/GetAllPostsByTerm';
import PaginationControls from '@/components/PaginationControls';
import PostPreview from '@/components/PostPreview';
import { getSearchParams } from '@/components/SearchParams';

export default async function TagPage( props: any ) {

	const jsonLd = {
        '@context': 'https://schema.org/',
        '@type': 'Blog',
        '@id': 'https://www.gansobomb.com/5-star-grand-prix',
        'mainEntityOfPage': 'https://www.gansobomb.com/5-star-grand-prix',
		'url': 'https://www.gansobomb.com/5-star-grand-prix',
        'name': 'Ganso Bomb: 5-Star Grand Prix Archives',
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

    const foundPosts = getAllPostsByTerm( 'tags', '5-star-grand-prix' );
    const allSearchParams = await getSearchParams(props.searchParams);
    const pagedPosts = foundPosts.slice(allSearchParams.start, allSearchParams.end);
    const startIndex = 1000;
    const rewindPreviews = pagedPosts.map(( post, index ) => (
        <PostPreview key={post.slug} {...post} index={(index + startIndex).toString()} />
    ));

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<div className="posts-section">
				<h2 className="section-heading">5-Star Grand Prix Archives</h2>
				<div className="section-grid">
                    {rewindPreviews}
				</div>
			</div>
            <PaginationControls
                hasNextPage={allSearchParams.end < foundPosts.length}
                hasPrevPage={allSearchParams.start > 0}
                totalPosts={foundPosts.length}
                postsPerPage={allSearchParams.postsPerPage}
                query=""
            />
		</>
	)
}
