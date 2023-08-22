import { getSearchParams } from './SearchParams';
import { getAllPostsByTerm } from './GetAllPostsByTerm';
import PostPreview from './PostPreview';
import PaginationControls from './PaginationControls';

export function TermArchivePage( props: any, tax: string ) {
    const allSearchParams = getSearchParams( props.searchParams )
    const foundPosts = getAllPostsByTerm( tax, props.params.slug );
    const pagedPosts = foundPosts.slice( allSearchParams.start, allSearchParams.end )
	const postPreviews = pagedPosts.map( ( post ) => (
		<PostPreview key={post.slug} {...post} />
	))
    const titleVariation = 'tags' === tax ? 'tagged' : 'categorized'

    return (
        <>
            <div className="page-interior">
                <h2>Posts {titleVariation} with <span className="term-archive-name">"{props.params.slug.replace( '-', ' ' )}"</span></h2>
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
}