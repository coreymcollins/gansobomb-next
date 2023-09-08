import './globals.css'
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import PageHeader from '@/components/PageHeader'
import PageFooter from '@/components/PageFooter'

export async function generateMetadata(): Promise<Metadata> {

    const metaTitle = 'Ganso Bomb'
    const metaDescription = 'Pro wrestling is life.'

    return {
        metadataBase: new URL( 'https:/www.gansobomb.com' ),
        title: metaTitle,
        description: metaDescription,
        openGraph : {
            title: metaTitle,
            description: metaDescription,
            url: 'https://www.gansobomb.com/',
            siteName: metaTitle,
            type: 'website',
            locale: 'en_US'
        },
        twitter: {
            card: 'summary',
            title: metaTitle,
            description: metaDescription,
        },
        alternates: {
            canonical: '/'
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
                <Analytics />
            </body>
        </html>
    )
}
    