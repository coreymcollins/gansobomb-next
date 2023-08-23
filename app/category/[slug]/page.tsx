import { TermArchivePage } from '@/components/TermArchivePage';
import { GenerateMetadata } from '@/components/TermMetadata';
import type { Metadata } from 'next';

export async function generateMetadata( props: any ): Promise<Metadata> {
    return GenerateMetadata({ params: {slug: props.params.slug}})  
}

export default function TermArchive( props: any ) {
    return TermArchivePage( props, 'category' )
};
