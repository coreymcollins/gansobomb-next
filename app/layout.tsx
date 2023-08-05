import './globals.css'
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import SearchForm from '@/components/SearchForm'

export async function generateMetadata(): Promise<Metadata> {

    return {
        title: 'Ganso Bomb',
        description: 'Pro wrestling is life.',
        openGraph : {
            title: 'Ganso Bomb',
            description: 'Pro wrestling is life.',
            url: 'https://gansobomb.vercel.app/',
            siteName: 'Ganso Bomb',
            type: 'website',
            locale: 'en_US'
        },
        twitter: {
            card: 'summary',
            title: 'Ganso Bomb',
            description: 'Pro wrestling is life.',
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
    