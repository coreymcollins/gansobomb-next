import './globals.css'
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import SearchForm from '@/components/SearchForm'

export async function generateMetadata(): Promise<Metadata> {

    const metaTitle = 'Ganso Bomb'
    const metaDescription = 'Pro wrestling is life.'

    return {
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
                <SearchForm />
                {children}
                <Analytics />
            </body>
        </html>
    )
}
    