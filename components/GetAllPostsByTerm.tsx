import getPostsMetadata from './GetPostMetaData';

export function getAllPostsByTerm(tax: string, term: string) {
  const posts = getPostsMetadata();

  return posts.filter((post) => post[tax] && post[tax].includes(term));
}
