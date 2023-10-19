import { getAllPostsByTerm } from '@/components/GetAllPostsByTerm';
import getPostsMetadata from '@/components/GetPostMetaData';
import getPostsWithOffset from '@/components/GetPostsWithOffset';
import PostPreview from '@/components/PostPreview';
import Link from 'next/link';

export default function Home( props: any ) {
	const foundPosts = getPostsMetadata().slice( 0, 3 )
	const postPreviews = foundPosts.map( ( post, index ) => (
		<PostPreview key={post.slug} {...post} index={index.toString()} withFirstExcerpt={true} />
	))

	// Set our offset and posts-getting counts.
	const options = {
		offset: 0,
		numberOfPosts: 6
	}

	// Get posts by category.
	const writeForeverPosts = getAllPostsByTerm( 'category', 'write-forever' ),
		rewindPosts = getAllPostsByTerm( 'category', 'REWIND' );

	// Create a way to remove duplicates.
	const isDuplicate = ( post: any ) => {
		return foundPosts.some(( foundPost ) =>
			foundPost.title === post.title
		)
	}

	// Filter our category results to remove anything from the latest posts section.
	const filteredWriteForeverPosts = writeForeverPosts.filter(( post ) => !isDuplicate( post )),
		filteredRewindPosts = rewindPosts.filter(( post ) => !isDuplicate( post )),
		writeForeverOffset = getPostsWithOffset( filteredWriteForeverPosts, options ),
		rewindOffset = getPostsWithOffset( filteredRewindPosts, options );
	
	// Retrieve a filtered set of category posts.
	const writeForeverPreviews = writeForeverOffset.map( ( post, index ) => (
		<PostPreview key={post.slug} {...post} index={index.toString()} withFirstExcerpt={false} />
	))

	// Retrieve a filtered set of category posts.
	const rewindPreviews = rewindOffset.map( ( post, index ) => (
		<PostPreview key={post.slug} {...post} index={index.toString()} withFirstExcerpt={false} />
	))

	const jsonLd = {
        '@context': 'https://schema.org/',
        '@type': 'Blog',
        '@id': 'https://www.gansobomb.com/',
        'mainEntityOfPage': 'https://www.gansobomb.com/',
		'url': 'https://www.gansobomb.com/',
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
			<div className="posts-section">
				<h2 className="section-heading">Latest Posts</h2>
				<div className="section-grid latest-grid">
					{postPreviews}
				</div>

				<h2 className="section-heading">Write Forever</h2>
				<div className="section-grid">
					{writeForeverPreviews}
				</div>

				<h2 className="section-heading">REWIND</h2>
				<div className="section-grid">
					{rewindPreviews}
				</div>

			</div>
			<Link href="/archive/" className="view-all">
				View All Posts
			</Link>
		</>
	)
}
