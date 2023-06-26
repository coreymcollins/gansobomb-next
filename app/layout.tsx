import Link from 'next/link'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Ganso Bomb',
    description: 'Pro wrestling is life.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <html lang="en">
            <body className={inter.className}>
                {children}
            </body>
        </html>
    )
}
    