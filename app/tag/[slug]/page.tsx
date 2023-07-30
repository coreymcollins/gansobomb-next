import { getAllPostsByTag } from '@/components/getAllPostsByTag';
import PageFooter from '@/components/PageFooter';
import PageHeader from '@/components/PageHeader';
import PostPreview from '@/components/PostPreview';

const TagArchive = ( props: any ) => {
    
    const thesePosts = getAllPostsByTag( 'aew' );
    
    const postPreviews = thesePosts.map( ( post ) => (
        <PostPreview key={post.slug} {...post} />
    ));

    return (
        <main>
            <PageHeader />
            <div className="page-interior">
                <h2>Posts tagged with {props.params.slug}</h2>
            </div>
            <div className="post-grid">
                {postPreviews}
            </div>
            <PageFooter />
        </main>
    );
};

export default TagArchive;