import getPostsMetadata from '@/components/getPostMetaData';
import PostPreview from '@/components/PostPreview';

export default function Home() {
	
	const postMetaData = getPostsMetadata();
	const postPreviews = postMetaData.map( ( post ) => (
		<PostPreview key={post.slug} {...post} />
	));

	return (
		<>
			<div className="post-grid">
				{postPreviews}
			</div>
		</>
	)
}
