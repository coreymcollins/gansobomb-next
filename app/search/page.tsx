import React from 'react';
import getPostsMetadata from '@/components/GetPostMetaData';
import PostPreview from '@/components/PostPreview';
import getPostContent from '@/components/GetPostContent';
import type { Metadata } from 'next';
import { getSearchParams } from '@/components/SearchParams';
import PaginationControls from '@/components/PaginationControls';

const getPosts = () => {
    return getPostsMetadata();
};

export async function generateMetadata( props: any ): Promise<Metadata> {
    const searchQuery = props.searchParams.query
    const metaTitle = `Search results for "${searchQuery}" on Ganso Bomb`
    const metaDescription = `Search results for the query "${searchQuery}"`

    return {
        metadataBase: new URL( 'https:/www.gansobomb.com' ),
        title: metaTitle,
        description: metaDescription,
        openGraph : {
            title: metaTitle,
            description: metaDescription,
            url: `https://www.gansobomb.com/search/?query=${decodeURIComponent( searchQuery )}`,
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

const mySearchResults = ( searchValue: string ) => {

    const allPosts = getPosts();
    const theseSearchResults = allPosts.filter((post) => {
        const postContent = getPostContent( post.slug )
        const contentMatches = postContent.content.toLowerCase().includes( searchValue );
        const titleMatches = post.title.toLowerCase().includes(searchValue);
        const tagsMatch = post.tags.some((tag: string) => tag.toLowerCase().includes(searchValue));

        return titleMatches || tagsMatch || contentMatches;
    });
    
    return theseSearchResults
}

export default function SearchPage( props: any ) {

    const allSearchParams = getSearchParams( props.searchParams )
    const searchQuery = props.searchParams.query
    const foundPosts = mySearchResults( searchQuery )
    const pagedResults = foundPosts.slice( allSearchParams.start, allSearchParams.end )
	const postPreviews = pagedResults.map( ( post ) => (
        <PostPreview key={post.slug} {...post} />
        ))
    const searchQueryHeading = searchQuery ? `Search Results for "${searchQuery}"` : 'Please provide a search query'
    
    return (
        <>
            <div className="posts-section">
                <h2 className="section-heading">{searchQueryHeading}</h2>
                <div className="section-grid">
                    { postPreviews }
                </div>
            </div>
            <PaginationControls
				hasNextPage={allSearchParams.end < foundPosts.length}
				hasPrevPage={allSearchParams.start > 0}
				totalPosts={foundPosts.length}
				postsPerPage={allSearchParams.postsPerPage}
                query={searchQuery}
			/>
		</>            
    );
}