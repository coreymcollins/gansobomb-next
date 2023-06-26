import Link from "next/link";
import { PostMetaData } from './PostMetaData';
import Image from "next/image";
import PostDate from './Date';

const PostPreview = ( props: PostMetaData ) => {
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
                    />
                }
                <h2>{props.title}</h2>
                <PostDate dateString={props.date} />
            </Link>
        </article>
    )
};

export default PostPreview;