import Link from "next/link";
import { PostMetaData } from './PostMetaData';
import Image from "next/image";
import PostDate from './Date';

const PostPreview = ( props: PostMetaData ) => {
    const { index, withFirstExcerpt } = props;
    let loadingType: 'lazy' | 'eager' | undefined = undefined;
    if ( '1000' === index || '1001' === index || '1002' === index ) {
        loadingType = 'eager'
    }

    return (
        <article>
            <Link href={`/posts/${props.slug}`}>
                {props.coverImage &&
                    <Image
                        src={`/images/${props.coverImage}`}
                        alt={props.title}
                        width={960}
                        height={640}
                        className="post-image"
                        sizes="(max-width: 1024px) 50vw, (max-width: 1200px) 100vw, 756px"
                        quality={100}
                        loading={loadingType}
                    />
                }
                <h2>{props.title}</h2>
                <PostDate dateString={props.date} />
                {
                    undefined !== withFirstExcerpt && true === withFirstExcerpt && '0' === index ?
                        <p className="post-excerpt">{ props.excerpt }</p>
                    :
                        undefined
                }
            </Link>
        </article>
    )
};

export default PostPreview;