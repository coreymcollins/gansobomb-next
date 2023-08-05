import React from 'react';
import path from 'path';
import getPostsMetadata from '@/components/getPostMetaData';
import PostPreview from '@/components/PostPreview';
import PageHeader from '@/components/PageHeader';
import PageFooter from '@/components/PageFooter';
import getPostContent from '@/components/getPostContent';

const getPosts = () => {
    return getPostsMetadata();
};

const SearchQuery = ( props: any ) => {

    // Add a search form here at some point.
    if ( ! props.searchParams.query ) {
        return
    }

    return props.searchParams.query.toLowerCase()
}

const mySearchResults = ( props: any ) => {

    const searchQuery = SearchQuery( props )

    const allPosts = getPosts();
    const theseSearchResults = allPosts.filter((post) => {
        const postContent = getPostContent( post.slug )
        const contentMatches = postContent.content.toLowerCase().includes( searchQuery );
        const titleMatches = post.title.toLowerCase().includes(searchQuery);
        const tagsMatch = post.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery));

        return titleMatches || tagsMatch || contentMatches;
    });
    
    return theseSearchResults
}

const SearchPage = ( props: any ) => {

    const searchQuery = SearchQuery( props )
    const theseResults = mySearchResults( props )
    const searchQueryHeading = searchQuery ? `Search Results for: ${searchQuery}` : 'Please provide a search query'
    
    return (
        <main>
            <PageHeader />
            <div className="page-interior">
                <h2>{searchQueryHeading}</h2>
            </div>
            <div className="post-grid">
                {theseResults.map((post) => (
                    <PostPreview key={post.slug} {...post} />
                ))}
            </div>
			<PageFooter />
		</main>            
    );
};
        
export default SearchPage;