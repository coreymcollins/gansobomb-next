import { getAllPostsByTag } from '@/components/getAllPostsByTag';
import PageFooter from '@/components/PageFooter';
import PageHeader from '@/components/PageHeader';
import PostPreview from '@/components/PostPreview';

const TagArchive = ( props: any ) => {
    
    const thesePosts = getAllPostsByTag( props.params.slug );

    return (
        <main>
            <PageHeader />
            <div className="page-interior">
                <h2>Posts tagged with</h2>
            </div>
            <div className="post-grid">
            </div>
            <PageFooter />
        </main>
    );
};

export default TagArchive;