import { TermArchivePage } from '@/components/TermArchivePage';
import generateMetadata from '@/components/TermMetadata';
import type { Metadata } from 'next';

export async function generateTermMetadata( props: any ): Promise<Metadata> {
    return generateMetadata({ params: {slug: props.params?.slug, tax: 'tag'}})  
}

export default function TermArchive( props: any ) {
    return TermArchivePage( props, 'tags' )
};
