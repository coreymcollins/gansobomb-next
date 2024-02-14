import { Metadata } from 'next'

interface GenerateMetadataProps {
    params: {
        slug: string,
        tax: string,
    }
}

export function GenerateMetadata( props: GenerateMetadataProps ): Metadata {
    const thisTermSlug = props.params.slug
    const thisTerm = thisTermSlug.replace( '-', ' ' )
    const metaTitle = `Posts from the term "${thisTerm}" on Ganso Bomb`
    const metaDescription = `A list of posts from the term "${thisTerm}"`
    const metaImage = '/images/ganso-bomb-fallback.webp'

    return {
        metadataBase: new URL( 'https:/www.gansobomb.com' ),
        title: metaTitle,
        description: metaDescription,
        openGraph : {
            title: metaTitle,
            description: metaDescription,
            url: `https://www.gansobomb.com/${props.params.tax}/${decodeURIComponent( thisTermSlug )}`,
            siteName: 'Ganso Bomb',
            type: 'website',
            locale: 'en_US',
            images: [
                {
                    url: metaImage,
                    width: 960,
                    height: 640,
                    alt: metaTitle,
                }
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: metaTitle,
            description: metaDescription,
            images: metaImage,
        },
        alternates: {
            canonical: `https://www.gansobomb.com/${props.params.tax}/${decodeURIComponent( thisTermSlug )}`,
        }
    }
}