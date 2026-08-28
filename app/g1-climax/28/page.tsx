import { getAllPostsByTerm } from '@/components/GetAllPostsByTerm';
import PostPreview from '@/components/PostPreview';
import { getSearchParams } from '@/components/SearchParams';

export default async function TagPage( props: any ) {

	const jsonLd = {
        '@context': 'https://schema.org/',
        '@type': 'Blog',
        '@id': 'https://www.gansobomb.com/g1-climax/28',
        'mainEntityOfPage': 'https://www.gansobomb.com/g1-climax/28',
		'url': 'https://www.gansobomb.com/g1-climax/28',
        'name': 'Ganso Bomb: G1 Climax 28 Archives',
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

    const foundPosts = getAllPostsByTerm( 'tags', 'g1-climax-28' );
    const allSearchParams = await getSearchParams(props.searchParams, 99);
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
				<h2 className="section-heading">G1 Climax 28 Archives</h2>
				<div className="section-grid">
                    {rewindPreviews}
				</div>
			</div>
		</>
	)
}
