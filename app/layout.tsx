import './globals.css'
import type { Metadata } from 'next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import PageHeader from '@/components/PageHeader'
import PageFooter from '@/components/PageFooter'
import { Analytics } from '@vercel/analytics/react';

export async function generateMetadata(): Promise<Metadata> {

    const metaTitle = 'Ganso Bomb'
    const metaDescription = 'Pro wrestling is life.'
    const metaImage = 'https://www.gansobomb.com/images/ganso-bomb-fallback.webp'

    return {
        metadataBase: new URL( 'https://www.gansobomb.com' ),
        title: metaTitle,
        description: metaDescription,
        openGraph : {
            title: metaTitle,
            description: metaDescription,
            url: 'https://www.gansobomb.com',
            siteName: metaTitle,
            images: [
                {
                    url: metaImage,
                    width: 960,
                    height: 640,
                    alt: `${ metaTitle }: ${ metaDescription }`,
                }
            ],
            type: 'website',
            locale: 'en_US',
        },
        twitter: {
            card: 'summary_large_image',
            title: metaTitle,
            description: metaDescription,
            images: metaImage,
        },
        alternates: {
            canonical: '/',
        }
    }    
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <html lang="en">
            <body>
                <PageHeader />
                <main>
                    {children}
                </main>
                <PageFooter />
                <SpeedInsights />
                <Analytics />
            </body>
        </html>
    )
}
    