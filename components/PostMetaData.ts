export interface PostMetaData {
    index: string,
    title: string,
    date: string,
    slug: string,
    coverImage: string,
    excerpt: string,
    tags: string[],
    category: string,
    [key:string]: string | string[],
}