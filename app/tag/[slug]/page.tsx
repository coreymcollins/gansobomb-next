import { getAllPostsByTag } from '@/components/getAllPostsByTag';
import PageFooter from '@/components/PageFooter';
import PageHeader from '@/components/PageHeader';
import PostPreview from '@/components/PostPreview';
import type { Metadata } from 'next';

export async function generateMetadata( props: any ): Promise<Metadata> {
    const thisTag = props.params.slug
    const metaTitle = `Posts tagged with "${thisTag}" on Ganso Bomb`
    const metaDescription = `A list of posts tagged with the term "${thisTag}"`

    return {
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

const TagArchive = ( props: any ) => {
    
    const thesePosts = getAllPostsByTag( props.params.slug );
    
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