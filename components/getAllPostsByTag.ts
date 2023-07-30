import getPostsMetadata from './getPostMetaData';

export function getAllPostsByTag(tag: string) {
  const posts = getPostsMetadata();

  return posts.filter((post) => post.tags && post.tags.includes(tag));
}
