export interface PostMetaData {
    title: string,
    date: string,
    slug: string,
    coverImage: string,
    excerpt: string,
    tags: string[],
    category: string,
    [key:string]: string | string[],
}