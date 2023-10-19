function getPostsWithOffset( posts: any[], options: {offset: number, numberOfPosts: number } ) {

    let { offset, numberOfPosts } = options;

    if ( offset < 0 ) {
        offset = 0
    } else if ( offset >= posts.length ) {
        return []
    }

    return posts.slice( offset, offset + numberOfPosts )
}

export default getPostsWithOffset