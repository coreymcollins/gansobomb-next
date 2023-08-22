import { Metadata } from 'next'

interface GenerateMetadataProps {
    params: {
        slug: string
    }
}

export function GenerateMetadata( props: GenerateMetadataProps ): Metadata {
    const thisTermSlug = props.params.slug
    const thisTerm = thisTermSlug.replace( '-', ' ' )
    const metaTitle = `Posts from the term "${thisTerm}" on Ganso Bomb`
    const metaDescription = `A list of posts from the term "${thisTerm}"`
    
    return {
        metadataBase: new URL( 'https:/www.gansobomb.com' ),
        title: metaTitle,
        description: metaDescription,
        openGraph : {
            title: metaTitle,
            description: metaDescription,
            url: `https://www.gansobomb.com/${decodeURIComponent( thisTermSlug )}`,
            siteName: 'Ganso Bomb',
            type: 'website',
            locale: 'en_US'
        },
        twitter: {
            card: 'summary',
            title: metaTitle,
            description: metaDescription,
        },
    }
}