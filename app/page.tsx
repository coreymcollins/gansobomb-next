import getPostsMetadata from '@/components/getPostMetaData';
import PostPreview from '@/components/PostPreview';

export default function Home() {
	
	const postMetaData = getPostsMetadata();
	const postPreviews = postMetaData.map( ( post ) => (
		<PostPreview key={post.slug} {...post} />
	));

	return (
		<main>
			<div className="home-full-height">
				<h1>Pro wrestling is life.</h1>
			</div>
			<div className="post-grid">
				{postPreviews}
			</div>
			<footer>
				<p>Ganso Bomb</p>
			</footer>
		</main>
	)
}
