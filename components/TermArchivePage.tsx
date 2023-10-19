import { getSearchParams } from './SearchParams';
import { getAllPostsByTerm } from './GetAllPostsByTerm';
import PostPreview from './PostPreview';
import PaginationControls from './PaginationControls';
import { PostMetaData } from './PostMetaData';

export function TermArchivePage(props: { searchParams: any, params: { slug: string } }, tax: keyof PostMetaData) {
    const allSearchParams = getSearchParams(props.searchParams);
    const foundPosts = getAllPostsByTerm(tax, props.params.slug);
    const pagedPosts = foundPosts.slice(allSearchParams.start, allSearchParams.end);
    const postPreviews = pagedPosts.map((post) => (
        <PostPreview key={post.slug} {...post} />
    ));
    const titleVariation = 'tags' === tax ? 'tagged' : 'categorized';

    return (
        <>
            <div className="posts-section">
                <h2 className="section-heading">Posts {titleVariation} with <span className="term-archive-name">"{props.params.slug.replace('-', ' ')}"</span></h2>
                <div className="section-grid">
                    {postPreviews}
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
    );
}
