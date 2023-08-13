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

	return (
		<>
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
