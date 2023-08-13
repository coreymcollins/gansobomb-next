import { getAllPostsByTag } from '@/components/GetAllPostsByTag';
import PaginationControls from '@/components/PaginationControls';
import PostPreview from '@/components/PostPreview';
import { getSearchParams } from '@/components/SearchParams';
import type { Metadata } from 'next';

export async function generateMetadata( props: any ): Promise<Metadata> {
    const thisTag = props.params.slug
    const metaTitle = `Posts tagged with "${thisTag}" on Ganso Bomb`
    const metaDescription = `A list of posts tagged with the term "${thisTag}"`

    return {
        metadataBase: new URL( 'https:/www.gansobomb.com' ),
        title: metaTitle,
        description: metaDescription,
        openGraph : {
            title: metaTitle,
            description: metaDescription,
            url: `https://www.gansobomb.com/${decodeURIComponent( thisTag )}`,
            siteName: 'Ganso Bomb',
            type: 'website',
            locale: 'en_US'
        },
        twitter: {
            card: 'summary',
            title: metaTitle,
            description: metaDescription,
        },
    }    
}

export default function TagArchive( props: any ) {
    
    const allSearchParams = getSearchParams( props.searchParams )
    const foundPosts = getAllPostsByTag( props.params.slug );
    const pagedPosts = foundPosts.slice( allSearchParams.start, allSearchParams.end )
	const postPreviews = pagedPosts.map( ( post ) => (
		<PostPreview key={post.slug} {...post} />
	))

    return (
        <>
            <div className="page-interior">
                <h2>Posts tagged with "{props.params.slug}"</h2>
            </div>
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
    );
};
