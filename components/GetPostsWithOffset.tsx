function getPostsWithOffset( posts: any[], numberOfPosts: number, offset: number ) {
    if ( offset < 0 ) {
        offset = 0
    } else if ( offset >= posts.length ) {
        return []
    }

    return posts.slice( offset, offset + numberOfPosts )
}

export default getPostsWithOffset