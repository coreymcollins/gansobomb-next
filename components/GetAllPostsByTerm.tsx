import getPostsMetadata from './GetPostMetaData';
import { PostMetaData } from './PostMetaData';

export function getAllPostsByTerm(tax: keyof PostMetaData, term: string) {
  const posts = getPostsMetadata();

  return posts.filter(( post ) => {
    if( Array.isArray( post[tax] ) ) {
      return ( post[tax] as string[] ).includes( term )
    }

    return false
  })
}
